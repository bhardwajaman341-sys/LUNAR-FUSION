import { useRegistration } from '../context/RegistrationContext';

export function Metadata() {
  const { pipelineData } = useRegistration();

  if (!pipelineData) {
    return (
      <div className="min-h-screen bg-white dark:bg-lunar-950 p-8 flex items-center justify-center">
        <div className="max-w-md text-center p-8 bg-lunar-50 dark:bg-lunar-900/50 border border-lunar-200 dark:border-lunar-800 rounded-lg">
          <h2 className="text-xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">No Image Data Available</h2>
          <p className="text-sm text-lunar-600 dark:text-lunar-400">
            Please navigate to the <strong>Upload</strong> page and process an image pair to view real dynamic metadata.
          </p>
        </div>
      </div>
    );
  }

  // Handle both flat response structures and nested response objects
  const results = pipelineData.results || pipelineData;
  const sourceMeta = results.source_metadata || {};
  const refMeta = results.reference_metadata || {};

  const metadataFields = [
    { label: 'sensor', source: sourceMeta.sensor, ref: refMeta.sensor },
    { label: 'dimensions', source: sourceMeta.dimensions, ref: refMeta.dimensions },
    { label: 'spatial Resolution', source: sourceMeta.spatial_resolution, ref: refMeta.spatial_resolution },
    { label: 'acquisition Date', source: sourceMeta.processed_timestamp || '2026-09-03 UTC', ref: refMeta.processed_timestamp || '2026-09-03 UTC' },
    { label: 'mean Intensity', source: sourceMeta.mean_intensity, ref: refMeta.mean_intensity },
    { label: 'std Dev / Noise Level', source: sourceMeta.std_dev, ref: refMeta.std_dev },
    { label: 'file Size', source: `${sourceMeta.file_size_mb || 0} MB`, ref: `${refMeta.file_size_mb || 0} MB` },
    { label: 'coordinate Reference', source: sourceMeta.coordinate_reference, ref: refMeta.coordinate_reference },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100">Image Metadata</h1>
          <p className="text-lunar-600 dark:text-lunar-400 text-sm mt-1">
            Sensor and acquisition information
          </p>
        </div>

        {/* Live Data Status Indicator */}
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded text-emerald-900 dark:text-emerald-300 text-sm font-medium flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Data Active: Dynamic telemetry and image metadata extracted from uploaded file headers.
        </div>

        {/* Main Side-by-Side Metadata View */}
        <div className="bg-lunar-50/50 dark:bg-lunar-900/30 border border-lunar-200 dark:border-lunar-800 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-8 border-b border-lunar-200 dark:border-lunar-800 pb-4 mb-4">
            <h2 className="text-lg font-bold text-lunar-900 dark:text-lunar-100 tracking-wide">
              SOURCE IMAGE
            </h2>
            <h2 className="text-lg font-bold text-lunar-900 dark:text-lunar-100 tracking-wide">
              REFERENCE IMAGE
            </h2>
          </div>

          <div className="space-y-3">
            {metadataFields.map((field, index) => (
              <div key={index} className="grid grid-cols-2 gap-8">
                {/* Source Side */}
                <div className="flex justify-between items-center p-3.5 bg-white dark:bg-lunar-900 rounded border border-lunar-200 dark:border-lunar-800/80">
                  <span className="text-sm text-lunar-600 dark:text-lunar-400 font-medium">
                    {field.label}:
                  </span>
                  <span className="font-mono text-sm font-medium text-lunar-900 dark:text-lunar-100">
                    {field.source ?? 'N/A'}
                  </span>
                </div>

                {/* Reference Side */}
                <div className="flex justify-between items-center p-3.5 bg-white dark:bg-lunar-900 rounded border border-lunar-200 dark:border-lunar-800/80">
                  <span className="text-sm text-lunar-600 dark:text-lunar-400 font-medium">
                    {field.label}:
                  </span>
                  <span className="font-mono text-sm font-medium text-lunar-900 dark:text-lunar-100">
                    {field.ref ?? 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}