import { AlertTriangle, CheckCircle } from 'lucide-react';
import { intelligenceMetrics, generateHeatmapData } from '../data/mockData';
import { MetricCard } from '../components/MetricCard';

export function Intelligence() {
  const heatmapData = generateHeatmapData(8, 8);

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Intelligence & Confidence Analysis
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Quality assessment and failure detection
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Overall Confidence"
            value={intelligenceMetrics.overallConfidence}
            unit="%"
          />
          <MetricCard
            label="High Confidence"
            value={intelligenceMetrics.highConfidenceRegion}
            unit="%"
          />
          <MetricCard
            label="Low Confidence"
            value={intelligenceMetrics.lowConfidenceRegion}
            unit="%"
          />
          <MetricCard
            label="Status"
            value={intelligenceMetrics.status}
          />
        </div>

        {/* Failure Detection */}
        <div className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded flex items-center gap-4">
          <CheckCircle size={32} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
              Automatic Failure Detection: PASS
            </h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-400">
              No critical issues detected. Registration quality is acceptable for scientific use.
            </p>
          </div>
        </div>

        {/* Heatmap Visualization */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
              Confidence Heatmap
            </h3>

            {/* Canvas for heatmap */}
            <canvas
              ref={(canvas) => {
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                const cellSize = canvas.width / 8;

                heatmapData.forEach((cell) => {
                  const x = cell.col * cellSize;
                  const y = cell.row * cellSize;
                  const value = cell.value;

                  // Color gradient from red (cold) to yellow (hot)
                  const normalized = value / 100;
                  const hue = (1 - normalized) * 0; // Red
                  const sat = 100;
                  const light = 50 + normalized * 30;

                  ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
                  ctx.fillRect(x, y, cellSize, cellSize);

                  // Draw text
                  ctx.fillStyle = normalized > 0.5 ? '#000' : '#fff';
                  ctx.font = 'bold 12px Arial';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText(Math.round(value), x + cellSize / 2, y + cellSize / 2);

                  // Grid lines
                  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                  ctx.lineWidth = 1;
                  ctx.strokeRect(x, y, cellSize, cellSize);
                });
              }}
              width={400}
              height={400}
              className="w-full max-w-sm border border-lunar-200 dark:border-lunar-700 rounded"
            />

            {/* Legend */}
            <div className="mt-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400" />
                <span className="text-lunar-600 dark:text-lunar-400">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400" />
                <span className="text-lunar-600 dark:text-lunar-400">High</span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
              <h4 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
                Confidence Breakdown
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-lunar-600 dark:text-lunar-400">
                      Overall Confidence
                    </span>
                    <span className="text-sm font-bold text-lunar-900 dark:text-lunar-100">
                      {intelligenceMetrics.overallConfidence}%
                    </span>
                  </div>
                  <div className="h-2 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${intelligenceMetrics.overallConfidence}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-lunar-600 dark:text-lunar-400">
                      High Confidence Region
                    </span>
                    <span className="text-sm font-bold text-lunar-900 dark:text-lunar-100">
                      {intelligenceMetrics.highConfidenceRegion}%
                    </span>
                  </div>
                  <div className="h-2 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${intelligenceMetrics.highConfidenceRegion}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-lunar-600 dark:text-lunar-400">
                      Low Confidence Region
                    </span>
                    <span className="text-sm font-bold text-lunar-900 dark:text-lunar-100">
                      {intelligenceMetrics.lowConfidenceRegion}%
                    </span>
                  </div>
                  <div className="h-2 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{ width: `${intelligenceMetrics.lowConfidenceRegion}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Warnings */}
            {intelligenceMetrics.warnings.length > 0 && (
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
                <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Warnings
                </h4>
                <ul className="space-y-2">
                  {intelligenceMetrics.warnings.map((warning, i) => (
                    <li key={i} className="text-sm text-amber-800 dark:text-amber-400">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Possible Causes */}
            <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
              <h4 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
                Possible Causes of Low Confidence
              </h4>
              <ul className="space-y-1 text-sm text-lunar-600 dark:text-lunar-400">
                {intelligenceMetrics.possibleCauses.map((cause, i) => (
                  <li key={i}>• {cause}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Data Note */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
          <p className="text-amber-900 dark:text-amber-300 text-sm">
            <strong>Note:</strong> The confidence analysis and heatmap are simulated for demonstration. Actual analysis would involve deep learning models for failure detection.
          </p>
        </div>
      </div>
    </div>
  );
}
