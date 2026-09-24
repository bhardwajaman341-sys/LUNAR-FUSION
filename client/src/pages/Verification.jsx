import { verificationMetrics } from '../data/mockData';
import { MetricCard } from '../components/MetricCard';

export function Verification() {
  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            RANSAC Verification
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Outlier rejection and geometric verification
          </p>
        </div>

        {/* Demo Data Warning */}
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
          <p className="text-amber-900 dark:text-amber-300 text-sm">
            <strong>Demo Results:</strong> The following verification results are simulated for demonstration purposes.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Candidate Matches"
            value={verificationMetrics.candidateMatches}
          />
          <MetricCard
            label="Inliers"
            value={verificationMetrics.inliers}
          />
          <MetricCard
            label="Outliers"
            value={verificationMetrics.outliers}
          />
          <MetricCard
            label="Inlier Ratio"
            value={verificationMetrics.inlierRatio}
            unit="%"
          />
        </div>

        {/* Verification Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              Registration Error
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-lunar-600 dark:text-lunar-400">RMSE</p>
                <p className="text-2xl font-bold text-lunar-900 dark:text-lunar-100">
                  {verificationMetrics.rmse}
                </p>
              </div>
              <div>
                <p className="text-sm text-lunar-600 dark:text-lunar-400">Transformation Type</p>
                <p className="text-lg font-semibold text-lunar-900 dark:text-lunar-100">
                  {verificationMetrics.transformation}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              Verification Summary
            </h3>
            <p className="text-lunar-600 dark:text-lunar-400 text-sm mb-4">
              RANSAC algorithm successfully identified {verificationMetrics.inliers} inlier correspondences from {verificationMetrics.candidateMatches} candidates, achieving {verificationMetrics.inlierRatio}% inlier ratio.
            </p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded">
              <p className="text-emerald-900 dark:text-emerald-300 font-medium text-sm">
                ✓ Verification Passed
              </p>
            </div>
          </div>
        </div>

        {/* Inlier/Outlier Visualization */}
        <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
          <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
            Match Distribution
          </h3>

          {/* Bar chart visualization */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-emerald-900 dark:text-emerald-300">
                  Inliers
                </span>
                <span className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                  {verificationMetrics.inliers} ({verificationMetrics.inlierRatio}%)
                </span>
              </div>
              <div className="h-8 bg-lunar-100 dark:bg-lunar-800 rounded overflow-hidden">
                <div
                  className="h-full bg-emerald-500 flex items-center justify-end pr-3"
                  style={{
                    width: `${verificationMetrics.inlierRatio}%`,
                  }}
                >
                  <span className="text-xs font-bold text-white"></span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-red-900 dark:text-red-300">
                  Outliers
                </span>
                <span className="text-sm font-bold text-red-900 dark:text-red-300">
                  {verificationMetrics.outliers} ({100 - verificationMetrics.inlierRatio}%)
                </span>
              </div>
              <div className="h-8 bg-lunar-100 dark:bg-lunar-800 rounded overflow-hidden">
                <div
                  className="h-full bg-red-500 flex items-center justify-end pr-3"
                  style={{
                    width: `${100 - verificationMetrics.inlierRatio}%`,
                  }}
                >
                  <span className="text-xs font-bold text-white"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              Before RANSAC
            </h3>
            <div className="w-full aspect-square bg-gradient-to-br from-red-300 to-orange-300 rounded border border-lunar-200 dark:border-lunar-700 flex items-center justify-center">
              <div className="text-center">
                <p className="font-semibold text-red-900">{verificationMetrics.candidateMatches}</p>
                <p className="text-sm text-red-800">Raw Matches</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              After RANSAC
            </h3>
            <div className="w-full aspect-square bg-gradient-to-br from-emerald-300 to-cyan-300 rounded border border-lunar-200 dark:border-lunar-700 flex items-center justify-center">
              <div className="text-center">
                <p className="font-semibold text-emerald-900">{verificationMetrics.inliers}</p>
                <p className="text-sm text-emerald-800">Verified Inliers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
