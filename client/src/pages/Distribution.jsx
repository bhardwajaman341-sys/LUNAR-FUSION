import { distributionMetrics, generateFeaturePoints } from '../data/mockData';
import { MetricCard } from '../components/MetricCard';

export function Distribution() {
  const points = generateFeaturePoints(40);

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Spatial Distribution
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Feature point distribution across the image
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <MetricCard
            label="Spatial Coverage"
            value={distributionMetrics.spatialCoverage}
            unit="%"
          />
          <MetricCard
            label="Grid Cells Covered"
            value={distributionMetrics.gridCellsCovered}
          />
          <MetricCard
            label="Distribution Score"
            value={distributionMetrics.distributionScore}
          />
        </div>

        {/* Distribution Visualization */}
        <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded mb-8">
          <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
            Distribution Heatmap
          </h3>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Canvas Visualization */}
            <div className="flex-1">
              <canvas
                ref={(canvas) => {
                  if (!canvas) return;
                  const ctx = canvas.getContext('2d');

                  // Clear with gradient
                  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                  gradient.addColorStop(0, '#e0e0e0');
                  gradient.addColorStop(1, '#b0b0b0');
                  ctx.fillStyle = gradient;
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  // Draw grid
                  const cellSize = canvas.width / 5;
                  ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
                  ctx.lineWidth = 2;

                  for (let i = 0; i <= 5; i++) {
                    ctx.beginPath();
                    ctx.moveTo(i * cellSize, 0);
                    ctx.lineTo(i * cellSize, canvas.height);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, i * cellSize);
                    ctx.lineTo(canvas.width, i * cellSize);
                    ctx.stroke();
                  }

                  // Draw distribution points
                  points.forEach((point) => {
                    const x = (point.x / 100) * canvas.width;
                    const y = (point.y / 100) * canvas.height;

                    const confidence = Math.random();
                    ctx.fillStyle = `rgba(77, 208, 225, ${0.6 + confidence * 0.4})`;
                    ctx.beginPath();
                    ctx.arc(x, y, 5 + confidence * 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.strokeStyle = '#0080ff';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                  });
                }}
                width={500}
                height={500}
                className="w-full max-w-md border border-lunar-200 dark:border-lunar-700 rounded"
              />
            </div>

            {/* Statistics */}
            <div className="flex-1 space-y-4">
              <div className="p-4 bg-lunar-50 dark:bg-lunar-800 rounded border border-lunar-200 dark:border-lunar-700">
                <h4 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-2">
                  Coverage Analysis
                </h4>
                <p className="text-sm text-lunar-600 dark:text-lunar-400 mb-3">
                  Feature points are well-distributed across the lunar image, ensuring robust correspondence matching in diverse regions.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">
                  Status: OPTIMAL
                </h4>
                <p className="text-sm text-emerald-800 dark:text-emerald-400">
                  {distributionMetrics.spatialCoverage}% coverage achieved with uniform distribution across grid cells.
                </p>
              </div>

              <div className="p-4 bg-lunar-50 dark:bg-lunar-800 rounded border border-lunar-200 dark:border-lunar-700">
                <h4 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-2">
                  Grid Information
                </h4>
                <ul className="text-sm text-lunar-600 dark:text-lunar-400 space-y-1">
                  <li>• Grid Size: 5×8 (40 cells)</li>
                  <li>• Cells Covered: 37</li>
                  <li>• Empty Cells: 3</li>
                  <li>• Avg. Points per Cell: 1.08</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Implication
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  Excellent spatial distribution ensures stable transformation estimation and reduces false correspondence risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Indicators */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h4 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Center Coverage
            </h4>
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">95.2%</div>
            <p className="text-xs text-lunar-600 dark:text-lunar-400 mt-2">
              High concentration in central region
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h4 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Edge Coverage
            </h4>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">78.5%</div>
            <p className="text-xs text-lunar-600 dark:text-lunar-400 mt-2">
              Adequate coverage in edge regions
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h4 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Uniformity Score
            </h4>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">0.89</div>
            <p className="text-xs text-lunar-600 dark:text-lunar-400 mt-2">
              Near-uniform distribution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
