import { comparisonMethods } from '../data/mockData';

export function Comparison() {
  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Method Comparison
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Compare different registration methods
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-lunar-100 dark:bg-lunar-800 border-b border-lunar-200 dark:border-lunar-700">
                <th className="px-4 py-3 text-left font-semibold text-lunar-900 dark:text-lunar-100">
                  Method
                </th>
                <th className="px-4 py-3 text-right font-semibold text-lunar-900 dark:text-lunar-100">
                  Matches
                </th>
                <th className="px-4 py-3 text-right font-semibold text-lunar-900 dark:text-lunar-100">
                  Inliers
                </th>
                <th className="px-4 py-3 text-right font-semibold text-lunar-900 dark:text-lunar-100">
                  Inlier Ratio
                </th>
                <th className="px-4 py-3 text-right font-semibold text-lunar-900 dark:text-lunar-100">
                  RMSE
                </th>
                <th className="px-4 py-3 text-right font-semibold text-lunar-900 dark:text-lunar-100">
                  Coverage
                </th>
                <th className="px-4 py-3 text-right font-semibold text-lunar-900 dark:text-lunar-100">
                  Time (s)
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonMethods.map((method, index) => (
                <tr
                  key={index}
                  className={`border-b border-lunar-200 dark:border-lunar-800 ${
                    method.name === 'Proposed Method'
                      ? 'bg-cyan-50 dark:bg-cyan-900/20'
                      : 'bg-white dark:bg-lunar-900'
                  } hover:bg-lunar-50 dark:hover:bg-lunar-800/50 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        method.name === 'Proposed Method'
                          ? 'text-cyan-900 dark:text-cyan-300'
                          : 'text-lunar-900 dark:text-lunar-100'
                      }`}
                    >
                      {method.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-lunar-700 dark:text-lunar-300">
                    {method.matches}
                  </td>
                  <td className="px-4 py-3 text-right text-lunar-700 dark:text-lunar-300">
                    {method.inliers}
                  </td>
                  <td className="px-4 py-3 text-right text-lunar-700 dark:text-lunar-300">
                    {method.inlierRatio}%
                  </td>
                  <td className="px-4 py-3 text-right text-lunar-700 dark:text-lunar-300">
                    {method.rmse}
                  </td>
                  <td className="px-4 py-3 text-right text-lunar-700 dark:text-lunar-300">
                    {method.coverage}%
                  </td>
                  <td className="px-4 py-3 text-right text-lunar-700 dark:text-lunar-300">
                    {method.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Metrics Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              Match Count Comparison
            </h3>
            <div className="space-y-3">
              {comparisonMethods.map((method, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        method.name === 'Proposed Method'
                          ? 'text-cyan-900 dark:text-cyan-300'
                          : 'text-lunar-700 dark:text-lunar-300'
                      }`}
                    >
                      {method.name}
                    </span>
                    <span className="text-sm font-bold text-lunar-900 dark:text-lunar-100">
                      {method.matches}
                    </span>
                  </div>
                  <div className="h-3 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                    <div
                      className={`h-full ${
                        method.name === 'Proposed Method'
                          ? 'bg-cyan-500'
                          : 'bg-lunar-400'
                      }`}
                      style={{ width: `${(method.matches / 2612) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              Accuracy (RMSE) Comparison
            </h3>
            <div className="space-y-3">
              {comparisonMethods.map((method, i) => {
                const rmseNum = parseFloat(method.rmse);
                return (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${
                          method.name === 'Proposed Method'
                            ? 'text-cyan-900 dark:text-cyan-300'
                            : 'text-lunar-700 dark:text-lunar-300'
                        }`}
                      >
                        {method.name}
                      </span>
                      <span className="text-sm font-bold text-lunar-900 dark:text-lunar-100">
                        {method.rmse}
                      </span>
                    </div>
                    <div className="h-3 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                      <div
                        className={`h-full ${
                          method.name === 'Proposed Method'
                            ? 'bg-emerald-500'
                            : 'bg-lunar-400'
                        }`}
                        style={{ width: `${((1.5 - rmseNum) / 1.5) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time & Coverage */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              Processing Time
            </h3>
            <div className="space-y-3">
              {comparisonMethods.map((method, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        method.name === 'Proposed Method'
                          ? 'text-cyan-900 dark:text-cyan-300'
                          : 'text-lunar-700 dark:text-lunar-300'
                      }`}
                    >
                      {method.name}
                    </span>
                    <span className="text-sm font-bold text-lunar-900 dark:text-lunar-100">
                      {method.time}s
                    </span>
                  </div>
                  <div className="h-3 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                    <div
                      className={`h-full ${
                        method.name === 'Proposed Method'
                          ? 'bg-cyan-500'
                          : 'bg-lunar-400'
                      }`}
                      style={{ width: `${(method.time / 4.23) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
              Spatial Coverage
            </h3>
            <div className="space-y-3">
              {comparisonMethods.map((method, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        method.name === 'Proposed Method'
                          ? 'text-cyan-900 dark:text-cyan-300'
                          : 'text-lunar-700 dark:text-lunar-300'
                      }`}
                    >
                      {method.name}
                    </span>
                    <span className="text-sm font-bold text-lunar-900 dark:text-lunar-100">
                      {method.coverage}%
                    </span>
                  </div>
                  <div className="h-3 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                    <div
                      className={`h-full ${
                        method.name === 'Proposed Method'
                          ? 'bg-emerald-500'
                          : 'bg-lunar-400'
                      }`}
                      style={{ width: `${(method.coverage / 100) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded">
          <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">
            Comparison Summary
          </h3>
          <p className="text-emerald-800 dark:text-emerald-400 text-sm">
            The proposed method achieves the best overall balance between accuracy (lowest RMSE),
            robustness (high inlier ratio and coverage), and efficiency. While LoFTR produces
            slightly more matches, the proposed method delivers superior registration quality at
            a lower computational cost.
          </p>
        </div>
      </div>
    </div>
  );
}
