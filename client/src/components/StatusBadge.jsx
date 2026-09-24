export function StatusBadge({ status = 'READY' }) {
  const statusStyles = {
    READY: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    COMPLETED: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    PROCESSING: 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    PENDING: 'bg-gray-100 dark:bg-gray-900/30 text-gray-900 dark:text-gray-300 border-gray-300 dark:border-gray-700',
    PASS: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    FAIL: 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-300 border-red-300 dark:border-red-700',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
        statusStyles[status] || statusStyles.READY
      }`}
    >
      <span className="w-2 h-2 rounded-full mr-2 animate-pulse bg-current opacity-75" />
      {status}
    </span>
  );
}
