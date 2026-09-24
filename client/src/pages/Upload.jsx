import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { registerImages } from '../services/api';
import { useRegistration } from '../context/RegistrationContext';

export function UploadPage() {
  const { updatePipelineData } = useRegistration();

  const [sourceImage, setSourceImage] = useState(null);
  const [referenceImage, setReferenceImage] = useState(null);

  // Sensor and Algorithm Selection State
  const [sourceSensor, setSourceSensor] = useState('OHRC');
  const [referenceSensor, setReferenceSensor] = useState('LRO NAC');
  const [method, setMethod] = useState('SIFT');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [backendResult, setBackendResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const sourceInputRef = useRef(null);
  const referenceInputRef = useRef(null);

  const acceptedFormats = '.png,.jpg,.jpeg,.tiff';

  const handleImageSelect = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage({
            file,
            preview: event.target.result,
            name: file.name,
            size: file.size,
            dimensions: `${img.width} x ${img.height}`,
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e, setImage) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageSelect({ target: { files } }, setImage);
    }
  };

  const handleAnalyze = async () => {
    if (!sourceImage || !referenceImage) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setErrorMessage(null);
    setBackendResult(null);

   const formData = new FormData();
formData.append('referenceImage', referenceImage.file);
formData.append('sourceImage', sourceImage.file);
formData.append('referenceSensor', referenceSensor);
formData.append('sourceSensor', sourceSensor);
formData.append('method', method); // Verify 'method' variable holds "Deep Learning (LoFTR / LightGlue)"

    try {
      const responseData = await registerImages(formData);
      setBackendResult(responseData);
      
      // Save output to global Context state for Metadata and downstream views
      updatePipelineData(responseData);
      
      setAnalysisComplete(true);
    } catch (err) {
      console.error('Upload Error:', err);
      setErrorMessage(typeof err === 'string' ? err : 'Failed to process images on server.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const UploadZone = ({ image, setImage, label, inputRef }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100">
        {label}
      </h3>

      {!image ? (
        <div
          onDrop={(e) => handleDrop(e, setImage)}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="border-2 border-dashed border-lunar-300 dark:border-lunar-700 rounded-lg p-12 text-center cursor-pointer hover:bg-lunar-50 dark:hover:bg-lunar-900/50 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-lunar-400 dark:text-lunar-600 mx-auto mb-4" />
          <p className="text-lunar-900 dark:text-lunar-100 font-medium">
            Drag & drop your image here
          </p>
          <p className="text-lunar-600 dark:text-lunar-400 text-sm mt-2">
            or click to browse
          </p>
          <p className="text-lunar-500 dark:text-lunar-500 text-xs mt-3">
            Supported: PNG, JPG, JPEG, TIFF
          </p>
        </div>
      ) : (
        <div className="border border-lunar-200 dark:border-lunar-800 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <img
              src={image.preview}
              alt={image.name}
              className="w-32 h-32 object-cover rounded border border-lunar-200 dark:border-lunar-700"
            />
            <div className="flex-1">
              <p className="font-medium text-lunar-900 dark:text-lunar-100 break-all">
                {image.name}
              </p>
              <p className="text-sm text-lunar-600 dark:text-lunar-400 mt-2">
                Dimensions: {image.dimensions}
              </p>
              <p className="text-sm text-lunar-600 dark:text-lunar-400">
                Size: {(image.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 bg-lunar-100 dark:bg-lunar-800 hover:bg-lunar-200 dark:hover:bg-lunar-700 text-lunar-900 dark:text-lunar-100 rounded text-sm font-medium transition-colors"
                >
                  Replace
                </button>
                <button
                  onClick={() => setImage(null)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-900 dark:text-red-300 rounded text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats}
        onChange={(e) => handleImageSelect(e, setImage)}
        className="hidden"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Upload Images
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Select source and reference images for registration
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <UploadZone
            image={sourceImage}
            setImage={setSourceImage}
            label="SOURCE / MOVING IMAGE"
            inputRef={sourceInputRef}
          />
          <UploadZone
            image={referenceImage}
            setImage={setReferenceImage}
            label="REFERENCE / FIXED IMAGE"
            inputRef={referenceInputRef}
          />
        </div>

        {sourceImage && referenceImage && (
          <div className="mb-8 p-6 bg-lunar-50 dark:bg-lunar-900/50 border border-lunar-200 dark:border-lunar-800 rounded-lg grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-lunar-900 dark:text-lunar-100 mb-2">
                Source Sensor
              </label>
              <select
                value={sourceSensor}
                onChange={(e) => setSourceSensor(e.target.value)}
                className="w-full bg-white dark:bg-lunar-800 border border-lunar-300 dark:border-lunar-700 text-lunar-900 dark:text-lunar-100 rounded px-3 py-2 text-sm focus:outline-none"
              >
                <option value="OHRC">OHRC (Orbiter High Res Camera)</option>
                <option value="TMC-2">TMC-2 (Terrain Mapping Camera-2)</option>
                <option value="IIRS">IIRS (Imaging Infrared Spectrometer)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-lunar-900 dark:text-lunar-100 mb-2">
                Reference Sensor
              </label>
              <select
                value={referenceSensor}
                onChange={(e) => setReferenceSensor(e.target.value)}
                className="w-full bg-white dark:bg-lunar-800 border border-lunar-300 dark:border-lunar-700 text-lunar-900 dark:text-lunar-100 rounded px-3 py-2 text-sm focus:outline-none"
              >
                <option value="LRO NAC">LRO NAC (Lunar Reconnaissance Orbiter)</option>
                <option value="TMC-2">TMC-2 (Terrain Mapping Camera-2)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-lunar-900 dark:text-lunar-100 mb-2">
                Matching Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-white dark:bg-lunar-800 border border-lunar-300 dark:border-lunar-700 text-lunar-900 dark:text-lunar-100 rounded px-3 py-2 text-sm focus:outline-none"
              >
                <option value="SIFT">SIFT Baseline (Classical CV)</option>
                <option value="DeepLearning">Deep Learning (LoFTR / LightGlue)</option>
              </select>
            </div>
          </div>
        )}

        {sourceImage && referenceImage && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-400 text-lunar-900 font-bold rounded transition-colors disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'UPLOADING TO SERVER...' : 'ANALYZE IMAGES'}
              </button>
            </div>

            {isAnalyzing && (
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
                <p className="text-blue-900 dark:text-blue-300 font-medium mt-4">
                  Uploading lunar imagery to Express Backend...
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                <h3 className="font-semibold text-red-900 dark:text-red-300 mb-1">
                  ✕ Upload Failed
                </h3>
                <p className="text-red-800 dark:text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            {analysisComplete && backendResult && (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded space-y-4">
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 text-lg">
                  ✓ {backendResult.message || 'Image Registration Complete'}
                </h3>

                {(backendResult.results?.metrics || backendResult.metrics) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/80 dark:bg-lunar-900/80 rounded border border-emerald-300 dark:border-emerald-700">
                    <div>
                      <p className="text-xs text-lunar-500 dark:text-lunar-400">Ref Keypoints</p>
                      <p className="text-lg font-bold text-lunar-900 dark:text-lunar-100">
                        {backendResult.results?.metrics?.ref_keypoints || backendResult.metrics?.ref_keypoints || backendResult.results?.metrics?.total_keypoints_ref}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-lunar-500 dark:text-lunar-400">Source Keypoints</p>
                      <p className="text-lg font-bold text-lunar-900 dark:text-lunar-100">
                        {backendResult.results?.metrics?.src_keypoints || backendResult.metrics?.src_keypoints || backendResult.results?.metrics?.total_keypoints_src}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-lunar-500 dark:text-lunar-400">Good Matches</p>
                      <p className="text-lg font-bold text-lunar-900 dark:text-lunar-100">
                        {backendResult.results?.metrics?.good_matches || backendResult.metrics?.good_matches}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-lunar-500 dark:text-lunar-400">Inlier Ratio</p>
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {((backendResult.results?.metrics?.inlier_ratio ?? backendResult.metrics?.inlier_ratio ?? 0)).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!sourceImage && !referenceImage && (
          <div className="p-8 bg-lunar-50 dark:bg-lunar-900/50 border border-lunar-200 dark:border-lunar-800 rounded-lg text-center">
            <p className="text-lunar-600 dark:text-lunar-400">
              Upload both source and reference images to begin the analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}