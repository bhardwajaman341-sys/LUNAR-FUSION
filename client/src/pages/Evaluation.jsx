import React from 'react';
import { useRegistration } from '../context/RegistrationContext';

export function Evaluation() {
  const { pipelineData } = useRegistration();

  if (!pipelineData) {
    return (
      <div className="min-h-screen bg-lunar-950 p-8 flex items-center justify-center">
        <div className="max-w-md text-center p-8 bg-lunar-900/50 border border-lunar-800 rounded-lg text-lunar-100">
          <h2 className="text-xl font-bold mb-2">No Evaluation Data Available</h2>
          <p className="text-sm text-lunar-400">
            Please perform registration on the Upload page first to view live evaluation analytics.
          </p>
        </div>
      </div>
    );
  }

  // Multi-tier fallback extractors for flexible API response structures
  const metrics = pipelineData.metrics || pipelineData.results?.metrics || pipelineData.evaluation || {};
  const metadata = pipelineData.metadata || pipelineData.results?.metadata || {};

  const sourceMeta = metadata.sourceImage || {};
  const refMeta = metadata.referenceImage || {};

  // Metrics parameters
  const rmse = metrics.rmse ?? 0.0;
  const inlierCount = metrics.inlier_count ?? metrics.good_matches ?? 0;
  const inlierRatio = metrics.inlier_ratio ?? 0;
  const meanError = metrics.mean_error ?? 0.0;
  const spatialCoverage = metrics.spatial_coverage ?? 0.0;
  const processingTime = metrics.processing_time ?? 0.0;
  const confidence = metrics.registration_confidence ?? 0;

  const confDist = metrics.confidence_distribution || {
    very_high: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  return (
    <div className="min-h-screen bg-lunar-950 p-8 text-lunar-100 space-y-6">
      
      {/* Top Banner Status */}
      <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-center gap-2 text-emerald-400 text-sm">
        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
        Live Data Active: Dynamic telemetry and image metadata extracted from uploaded file headers.
      </div>

      {/* Top Metric Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-lunar-900/60 border border-lunar-800 p-5 rounded-lg">
          <span className="text-xs text-lunar-400">RMSE</span>
          <div className="text-2xl font-bold mt-1">{rmse} <span className="text-sm font-normal">px</span></div>
        </div>
        <div className="bg-lunar-900/60 border border-lunar-800 p-5 rounded-lg">
          <span className="text-xs text-lunar-400">Inlier Count</span>
          <div className="text-2xl font-bold mt-1">{inlierCount}</div>
        </div>
        <div className="bg-lunar-900/60 border border-lunar-800 p-5 rounded-lg">
          <span className="text-xs text-lunar-400">Inlier Ratio</span>
          <div className="text-2xl font-bold mt-1">{inlierRatio} <span className="text-sm font-normal">%</span></div>
        </div>
        <div className="bg-lunar-900/60 border border-lunar-800 p-5 rounded-lg">
          <span className="text-xs text-lunar-400">Mean Error</span>
          <div className="text-2xl font-bold mt-1">{meanError} <span className="text-sm font-normal">px</span></div>
        </div>
        <div className="bg-lunar-900/60 border border-lunar-800 p-5 rounded-lg">
          <span className="text-xs text-lunar-400">Spatial Coverage</span>
          <div className="text-2xl font-bold mt-1">{spatialCoverage} <span className="text-sm font-normal">%</span></div>
        </div>
        <div className="bg-lunar-900/60 border border-lunar-800 p-5 rounded-lg">
          <span className="text-xs text-lunar-400">Processing Time</span>
          <div className="text-2xl font-bold mt-1">{processingTime} <span className="text-sm font-normal">s</span></div>
        </div>
      </div>

      {/* Progress Metric Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-lunar-900/60 border border-lunar-800 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg border-b border-lunar-800 pb-2">Registration Quality Metrics</h3>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">RMSE (px)</span>
              <span>{rmse}</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${Math.min(100, (rmse / 2) * 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">Inlier Ratio (%)</span>
              <span>{inlierRatio}%</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${inlierRatio}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">Mean Error (px)</span>
              <span>{meanError}</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${Math.min(100, (meanError / 2) * 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">Spatial Coverage (%)</span>
              <span>{spatialCoverage}%</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${spatialCoverage}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">Registration Confidence (%)</span>
              <span>{confidence}%</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${confidence}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-lunar-900/60 border border-lunar-800 p-6 rounded-lg space-y-4">
          <h3 className="font-semibold text-lg border-b border-lunar-800 pb-2">Confidence Distribution</h3>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">Very High</span>
              <span>{confDist.very_high}%</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: `${confDist.very_high}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">High</span>
              <span>{confDist.high}%</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-cyan-400 h-full" style={{ width: `${confDist.high}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">Medium</span>
              <span>{confDist.medium}%</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-amber-400 h-full" style={{ width: `${confDist.medium}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-lunar-400">Low</span>
              <span>{confDist.low}%</span>
            </div>
            <div className="w-full bg-lunar-800 h-2 rounded overflow-hidden">
              <div className="bg-rose-500 h-full" style={{ width: `${confDist.low}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Telemetry Section */}
      <div className="bg-lunar-900/60 border border-lunar-800 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Source Image Metadata */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-lunar-100 uppercase tracking-wider">Source Image</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">sensor:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.sensor || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">dimensions:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.dimensions || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">spatial Resolution:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.spatialResolution || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">acquisition Date:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.acquisitionDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">mean Intensity:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.meanIntensity || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">std Dev / Noise Level:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.stdDev || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">file Size:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.fileSize || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">coordinate Reference:</span>
                <span className="text-xs font-semibold text-lunar-100">{sourceMeta.coordinateReference || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Reference Image Metadata */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-lunar-100 uppercase tracking-wider">Reference Image</h3>
            <div className="space-y-2">
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">sensor:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.sensor || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">dimensions:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.dimensions || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">spatial Resolution:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.spatialResolution || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">acquisition Date:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.acquisitionDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">mean Intensity:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.meanIntensity || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">std Dev / Noise Level:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.stdDev || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">file Size:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.fileSize || 'N/A'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-lunar-950/80 rounded border border-lunar-800/50">
                <span className="text-xs text-lunar-400">coordinate Reference:</span>
                <span className="text-xs font-semibold text-lunar-100">{refMeta.coordinateReference || 'N/A'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}