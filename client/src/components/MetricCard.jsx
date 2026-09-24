export function MetricCard({ label, value, unit = '', subLabel = '' }) {
  return (
    <div className="p-4 rounded border border-lunar-200 dark:border-lunar-700 bg-white dark:bg-lunar-800">
      <p className="text-sm text-lunar-600 dark:text-lunar-400">{label}</p>
      <p className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mt-2">
        {value}
        {unit && <span className="text-lg text-lunar-600 dark:text-lunar-400"> {unit}</span>}
      </p>
      {subLabel && (
        <p className="text-xs text-lunar-500 dark:text-lunar-500 mt-1">{subLabel}</p>
      )}
    </div>
  );
}
