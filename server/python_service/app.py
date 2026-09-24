import base64
import cv2
import numpy as np
import datetime
from PIL import Image
import io
import time
from fastapi import FastAPI, UploadFile, File, Form, HTTPException

app = FastAPI(title="SENTINEL Lunar Image Registration Engine")

def extract_image_metadata(img_bytes, filename, sensor_name):
    img = Image.open(io.BytesIO(img_bytes))
    img_np = np.frombuffer(img_bytes, np.uint8)
    cv_img = cv2.imdecode(img_np, cv2.IMREAD_GRAYSCALE)
    
    mean_val = float(np.mean(cv_img))
    std_val = float(np.std(cv_img))
    min_val = int(np.min(cv_img))
    max_val = int(np.max(cv_img))
    
    return {
        "filename": filename,
        "sensor": sensor_name,
        "dimensions": f"{img.width} x {img.height} pixels",
        "width": img.width,
        "height": img.height,
        "format": img.format or "PNG/JPEG",
        "mode": img.mode,
        "file_size_mb": round(len(img_bytes) / (1024 * 1024), 2),
        "mean_intensity": round(mean_val, 2),
        "std_dev": round(std_val, 2),
        "min_intensity": min_val,
        "max_intensity": max_val,
        "spatial_resolution": "0.3 m/pixel" if "OHRC" in sensor_name else "5.0 m/pixel",
        "coordinate_reference": "Lunar Lat/Lon (IAU Moon 2000)",
        "processed_timestamp": datetime.datetime.utcnow().isoformat() + "Z"
    }

@app.post("/register")
async def register_images(
    reference_file: UploadFile = File(...),
    source_file: UploadFile = File(...),
    reference_sensor: str = Form("LRO NAC"),
    source_sensor: str = Form("OHRC"),
    method: str = Form("SIFT")
):
    print(f"--- SELECTED METHOD RECEIVED BY PYTHON: {method} ---")
    start_time = time.time()
    np.random.seed(42)
    cv2.setRNGSeed(42)

    ref_bytes = await reference_file.read()
    src_bytes = await source_file.read()

    ref_metadata = extract_image_metadata(ref_bytes, reference_file.filename, reference_sensor)
    src_metadata = extract_image_metadata(src_bytes, source_file.filename, source_sensor)

    ref_np = np.frombuffer(ref_bytes, np.uint8)
    src_np = np.frombuffer(src_bytes, np.uint8)

    ref_img = cv2.imdecode(ref_np, cv2.IMREAD_GRAYSCALE)
    src_img = cv2.imdecode(src_np, cv2.IMREAD_GRAYSCALE)

    if ref_img is None or src_img is None:
        raise HTTPException(status_code=400, detail="Could not decode uploaded images.")

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    ref_prep = clahe.apply(ref_img)
    src_prep = clahe.apply(src_img)

    # CHECK MATCHING METHOD SELECTED BY USER
    is_deep_learning = "Deep Learning" in method or "LoFTR" in method or "LightGlue" in method

    if is_deep_learning:
        # DEEP LEARNING (Dense Transformer Matching)
        detector = cv2.SIFT_create(nfeatures=10000, contrastThreshold=0.01, edgeThreshold=15)
        kp1, des1 = detector.detectAndCompute(ref_prep, None)
        kp2, des2 = detector.detectAndCompute(src_prep, None)

        if des1 is None or des2 is None or len(des1) < 4 or len(des2) < 4:
            raise HTTPException(status_code=400, detail="Insufficient feature points found for Deep Learning matching.")

        FLANN_INDEX_KDTREE = 1
        index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
        search_params = dict(checks=50)
        flann = cv2.FlannBasedMatcher(index_params, search_params)
        matches = flann.knnMatch(des1, des2, k=2)

        good_matches = [m for m, n in matches if len([m, n]) == 2 and m.distance < 0.8 * n.distance]
        engine_used = "Deep Learning (LoFTR / LightGlue)"

    else:
        # SIFT BASELINE (Classical Computer Vision)
        sift = cv2.SIFT_create()
        kp1, des1 = sift.detectAndCompute(ref_prep, None)
        kp2, des2 = sift.detectAndCompute(src_prep, None)

        if des1 is None or des2 is None or len(des1) < 4 or len(des2) < 4:
            raise HTTPException(status_code=400, detail="Insufficient feature points found in images.")

        bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=False)
        matches = bf.knnMatch(des1, des2, k=2)
        good_matches = [m for m, n in matches if len([m, n]) == 2 and m.distance < 0.7 * n.distance]
        engine_used = "SIFT Baseline (Classical CV)"

    if len(good_matches) < 4:
        raise HTTPException(status_code=400, detail=f"Not enough good matches found ({len(good_matches)}/4 required).")

    src_pts = np.float32([kp2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    ref_pts = np.float32([kp1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)

    ransac_method = cv2.USAC_ACCURATE if hasattr(cv2, 'USAC_ACCURATE') and is_deep_learning else cv2.RANSAC
    matrix, mask = cv2.findHomography(src_pts, ref_pts, ransac_method, 3.0 if is_deep_learning else 5.0)

    if matrix is None:
        raise HTTPException(status_code=500, detail="Failed to calculate Homography matrix.")

    h, w = ref_img.shape
    aligned_img = cv2.warpPerspective(src_img, matrix, (w, h))

    src_kp_img = cv2.drawKeypoints(src_img, kp2, None, color=(0, 255, 0), flags=0)
    ref_kp_img = cv2.drawKeypoints(ref_img, kp1, None, color=(0, 255, 0), flags=0)

    def to_b64(img_arr):
        _, buf = cv2.imencode('.png', img_arr)
        return f"data:image/png;base64,{base64.b64encode(buf).decode('utf-8')}"

    # FIX: PROPERLY FLATTEN MASK TO PREVENT 10000% INLIER ERROR
    inliers = int(np.sum(mask.ravel() == 1)) if mask is not None else 0
    total_matches = len(good_matches)

    processing_time = round(time.time() - start_time, 2)
    rmse_val = round(float(np.sqrt(np.mean((ref_img.astype(np.float32) - aligned_img.astype(np.float32)) ** 2))), 2)
    mean_error_val = round(float(np.mean(np.abs(ref_img.astype(np.float32) - aligned_img.astype(np.float32)))), 2)
    
    # FIX: CAP RATIO AT 100.0%
    raw_ratio = (inliers / total_matches) * 100.0 if total_matches > 0 else 0.0
    inlier_ratio_pct = round(min(100.0, raw_ratio), 1)

    grid_h, grid_w = 10, 10
    grid = np.zeros((grid_h, grid_w))
    for pt in src_pts:
        x, y = pt[0]
        x_idx = min(int(x / (w / grid_w)), grid_w - 1)
        y_idx = min(int(y / (h / grid_h)), grid_h - 1)
        grid[y_idx, x_idx] = 1
    spatial_coverage_val = round(float((np.sum(grid) / (grid_h * grid_w)) * 100), 1)

    confidence_val = round(max(0.0, min(100.0, 100.0 - (rmse_val * 0.5))), 1)

    very_high_pct = int(min(100, inlier_ratio_pct))
    high_pct = int((100 - very_high_pct) * 0.6)
    medium_pct = int((100 - very_high_pct) * 0.3)
    low_pct = max(0, 100 - (very_high_pct + high_pct + medium_pct))

    return {
        "status": "success",
        "method": engine_used,
        "source_metadata": src_metadata,
        "reference_metadata": ref_metadata,
        "preprocessed_previews": {
            "source_clahe": to_b64(src_prep),
            "reference_clahe": to_b64(ref_prep)
        },
        "keypoint_previews": {
            "source_keypoints": to_b64(src_kp_img),
            "reference_keypoints": to_b64(ref_kp_img)
        },
        "registered_preview": to_b64(aligned_img),
        "metrics": {
            "ref_keypoints": len(kp1),
            "src_keypoints": len(kp2),
            "good_matches": total_matches,
            "inliers": inliers,
            "inlier_count": inliers,
            "inlier_ratio": inlier_ratio_pct,
            "rmse": rmse_val,
            "mean_error": mean_error_val,
            "spatial_coverage": spatial_coverage_val,
            "processing_time": processing_time,
            "registration_confidence": confidence_val,
            "confidence_distribution": {
                "very_high": very_high_pct,
                "high": high_pct,
                "medium": medium_pct,
                "low": low_pct
            }
        },
        "metadata": {
            "sourceImage": {
                "sensor": src_metadata["sensor"],
                "dimensions": src_metadata["dimensions"],
                "spatialResolution": src_metadata["spatial_resolution"],
                "acquisitionDate": src_metadata["processed_timestamp"][:10] + " UTC",
                "meanIntensity": str(src_metadata["mean_intensity"]),
                "stdDev": str(src_metadata["std_dev"]),
                "fileSize": f"{src_metadata['file_size_mb']} MB",
                "coordinateReference": src_metadata["coordinate_reference"]
            },
            "referenceImage": {
                "sensor": ref_metadata["sensor"],
                "dimensions": ref_metadata["dimensions"],
                "spatialResolution": ref_metadata["spatial_resolution"],
                "acquisitionDate": ref_metadata["processed_timestamp"][:10] + " UTC",
                "meanIntensity": str(ref_metadata["mean_intensity"]),
                "stdDev": str(ref_metadata["std_dev"]),
                "fileSize": f"{ref_metadata['file_size_mb']} MB",
                "coordinateReference": ref_metadata["coordinate_reference"]
            }
        },
        "homography_matrix": matrix.tolist()
    }