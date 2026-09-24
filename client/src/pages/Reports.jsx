import { useState } from 'react';
import { Download, FileText } from 'lucide-react';

export function Reports() {
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    setReportGenerated(true);
  };

  const handleDownloadReport = () => {
    // Create a simple text-based report
    const reportContent = `SENTINEL - Lunar Registration Laboratory
Experiment Report

=====================================
EXPERIMENT INFORMATION
=====================================
Experiment ID: EXP-001
Date: 2024-08-30
Source Image: OHRC (Orbiter High Resolution Camera)
Reference Image: TMC (Terrain Mapping Camera)
Method: Proposed Multi-modal Correspondence Method

=====================================
IMAGE METADATA
=====================================
SOURCE IMAGE:
- Sensor: OHRC
- Dimensions: 4096 x 4096 pixels
- Spatial Resolution: 0.3 m/pixel
- Acquisition Date: 2024-03-15 08:32:15 UTC
- Sun Azimuth: 125.4°
- Sun Elevation: 42.8°

REFERENCE IMAGE:
- Sensor: TMC
- Dimensions: 4096 x 4096 pixels
- Spatial Resolution: 5.0 m/pixel
- Acquisition Date: 2024-02-28 14:18:42 UTC
- Sun Azimuth: 118.7°
- Sun Elevation: 38.2°

=====================================
PREPROCESSING RESULTS
=====================================
Input: Raw multi-modal images
Processing Steps:
1. Intensity Normalization - COMPLETED
2. Noise Reduction - COMPLETED
3. Contrast Enhancement - COMPLETED
4. Geometric Preparation - COMPLETED
5. Multi-scale Representation - COMPLETED
Status: READY

=====================================
CORRESPONDENCE RESULTS
=====================================
Candidate Matches: 2,481
Verified Matches: 1,736
Inlier Ratio: 70.0%
Average Confidence: 0.91

=====================================
RANSAC VERIFICATION
=====================================
Inliers: 1,736
Outliers: 745
RMSE: 0.82 px
Transformation: Projective
Status: PASS

=====================================
REGISTRATION RESULTS
=====================================
Mean Error: 0.61 px
Median Error: 0.47 px
RMSE: 0.82 px
Transformation Type: Projective
Status: COMPLETED

=====================================
EVALUATION METRICS
=====================================
RMSE: 0.82 px
Inlier Count: 1,736
Inlier Ratio: 70.0%
Mean Reprojection Error: 0.61 px
Spatial Coverage: 92.4%
Registration Confidence: 91%
Processing Time: 2.34 seconds

=====================================
CONFIDENCE ANALYSIS
=====================================
Overall Confidence: 91%
High Confidence Region: 78%
Low Confidence Region: 9%
Automatic Failure Detection: PASS

Warnings: Minor illumination variation detected in north-east region.
Possible Causes:
- Illumination variation
- Scale difference
- Low texture
- Viewpoint variation

=====================================
SPATIAL DISTRIBUTION
=====================================
Spatial Coverage: 92.4%
Grid Cells Covered: 37 / 40
Distribution Score: 0.92

=====================================
COMPARISON WITH OTHER METHODS
=====================================
Method Comparison:
- SIFT: RMSE 0.91 px, Coverage 89.2%
- ORB: RMSE 1.15 px, Coverage 85.6%
- LoFTR: RMSE 0.78 px, Coverage 91.8%
- Proposed Method: RMSE 0.82 px, Coverage 92.4% ✓ (BEST OVERALL)

=====================================
CONCLUSIONS
=====================================
The proposed multi-modal, sun-angle and scale-invariant method successfully
registered the Chandrayaan-2 images with excellent quality. The results
demonstrate:

1. Robust correspondence detection across multi-modal sensors
2. Effective handling of illumination variations
3. Sub-pixel registration accuracy
4. Excellent spatial coverage
5. Efficient processing time

The registration is suitable for scientific analysis, lunar mapping, and
surface change detection applications.

=====================================
RECOMMENDATIONS
=====================================
1. Use registered output for scientific analysis
2. Monitor low-confidence regions for anomalies
3. Consider enhanced preprocessing for future experiments
4. Further validation with ground truth data recommended

Generated: 2024-08-30 12:39:52 UTC
SENTINEL Frontend Prototype v1.0
`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', 'SENTINEL-Report-EXP-001.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Reports
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Generate and download experiment reports
          </p>
        </div>

        {/* Report Preview */}
        <div className="mb-8 p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
          <h2 className="text-2xl font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
            Experiment Report - EXP-001
          </h2>

          {!reportGenerated && (
            <div className="p-6 bg-lunar-50 dark:bg-lunar-900/50 border-2 border-dashed border-lunar-300 dark:border-lunar-700 rounded text-center">
              <FileText className="w-12 h-12 text-lunar-400 dark:text-lunar-600 mx-auto mb-4" />
              <p className="text-lunar-700 dark:text-lunar-300 mb-4">
                Report not generated yet. Click the button below to generate.
              </p>
              <button
                onClick={handleGenerateReport}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-lunar-900 font-bold rounded transition-colors"
              >
                GENERATE REPORT
              </button>
            </div>
          )}

          {reportGenerated && (
            <div className="space-y-6">
              {/* Report Content Preview */}
              <div className="p-6 bg-lunar-50 dark:bg-lunar-800 rounded border border-lunar-200 dark:border-lunar-700 font-mono text-sm text-lunar-700 dark:text-lunar-300 max-h-96 overflow-y-auto">
                <div>SENTINEL - Lunar Registration Laboratory Report</div>
                <div className="mt-4">=====================================</div>
                <div>EXPERIMENT INFORMATION</div>
                <div>=====================================</div>
                <div>Experiment ID: EXP-001</div>
                <div>Date: 2024-08-30</div>
                <div>Method: Proposed Multi-modal Correspondence Method</div>
                <div className="mt-4">=====================================</div>
                <div>KEY RESULTS</div>
                <div>=====================================</div>
                <div>Candidate Matches: 2,481</div>
                <div>Inliers: 1,736 (70.0%)</div>
                <div>RMSE: 0.82 px</div>
                <div>Registration Confidence: 91%</div>
                <div>Spatial Coverage: 92.4%</div>
                <div>Processing Time: 2.34 seconds</div>
                <div className="mt-4">...</div>
              </div>

              {/* Download Section */}
              <div className="flex gap-4">
                <button
                  onClick={handleDownloadReport}
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-lunar-900 font-bold rounded transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Download Report (TXT)
                </button>
                <button className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-lunar-900 font-bold rounded transition-colors flex items-center gap-2">
                  <Download size={20} />
                  Download Report (PDF)
                </button>
              </div>

              {/* Report Sections */}
              <div className="space-y-6">
                <ReportSection title="Experiment Information" content={{
                  'Experiment ID': 'EXP-001',
                  'Date': '2024-08-30',
                  'Source Image': 'OHRC (Orbiter High Resolution Camera)',
                  'Reference Image': 'TMC (Terrain Mapping Camera)',
                }} />

                <ReportSection title="Preprocessing" content={{
                  'Intensity Normalization': 'COMPLETED',
                  'Noise Reduction': 'COMPLETED',
                  'Contrast Enhancement': 'COMPLETED',
                  'Geometric Preparation': 'COMPLETED',
                  'Multi-scale Representation': 'COMPLETED',
                }} />

                <ReportSection title="Correspondence" content={{
                  'Candidate Matches': '2,481',
                  'Verified Matches': '1,736',
                  'Inlier Ratio': '70.0%',
                  'Average Confidence': '0.91',
                }} />

                <ReportSection title="Registration" content={{
                  'RMSE': '0.82 px',
                  'Mean Error': '0.61 px',
                  'Median Error': '0.47 px',
                  'Transformation': 'Projective',
                }} />

                <ReportSection title="Evaluation" content={{
                  'Spatial Coverage': '92.4%',
                  'Registration Confidence': '91%',
                  'Processing Time': '2.34 seconds',
                  'Automatic Failure Detection': 'PASS',
                }} />

                <ReportSection title="Comparison" content={{
                  'SIFT RMSE': '0.91 px',
                  'ORB RMSE': '1.15 px',
                  'LoFTR RMSE': '0.78 px',
                  'Proposed Method RMSE': '0.82 px (Best Overall)',
                }} />
              </div>

              {/* Conclusion */}
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded">
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">
                  Report Summary
                </h3>
                <p className="text-emerald-800 dark:text-emerald-400 text-sm">
                  The proposed multi-modal, sun-angle and scale-invariant method successfully
                  registered the Chandrayaan-2 images with excellent quality. The registration is
                  suitable for scientific analysis, lunar mapping, and surface change detection
                  applications.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 bg-lunar-50 dark:bg-lunar-900/50 border border-lunar-200 dark:border-lunar-800 rounded">
          <p className="text-lunar-600 dark:text-lunar-400 text-sm">
            <strong>Note:</strong> This is a frontend-only demo. Reports are generated locally and include all analysis results from the application.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReportSection({ title, content }) {
  return (
    <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
      <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-4">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {Object.entries(content).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-lunar-600 dark:text-lunar-400">{key}:</span>
            <span className="font-mono text-lunar-900 dark:text-lunar-100">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
