import { useState, useEffect } from 'react';
import { Trash2, Eye, Copy } from 'lucide-react';
import { experimentHistory } from '../data/mockData';

export function Experiments() {
  const [experiments, setExperiments] = useState(experimentHistory);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);

  useEffect(() => {
    // Load experiments from localStorage
    const saved = localStorage.getItem('sentinel_experiments');
    if (saved) {
      try {
        setExperiments(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load experiments', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save experiments to localStorage
    localStorage.setItem('sentinel_experiments', JSON.stringify(experiments));
  }, [experiments]);

  const handleDelete = (id) => {
    if (confirm('Delete this experiment?')) {
      setExperiments(experiments.filter((e) => e.id !== id));
      setSelectedForComparison(selectedForComparison.filter((x) => x !== id));
    }
  };

  const toggleCompareSelection = (id) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(selectedForComparison.filter((x) => x !== id));
    } else if (selectedForComparison.length < 2) {
      setSelectedForComparison([...selectedForComparison, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Experiments
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            View and manage experiment history
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => {
              setCompareMode(!compareMode);
              setSelectedForComparison([]);
            }}
            className={`px-6 py-2 rounded font-medium transition-colors ${
              compareMode
                ? 'bg-cyan-500 text-lunar-900'
                : 'bg-lunar-100 dark:bg-lunar-800 text-lunar-900 dark:text-lunar-100 hover:bg-lunar-200 dark:hover:bg-lunar-700'
            }`}
          >
            {compareMode ? 'Exit Compare Mode' : 'Compare Experiments'}
          </button>
          {compareMode && selectedForComparison.length === 2 && (
            <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-lunar-900 rounded font-medium transition-colors">
              View Comparison
            </button>
          )}
        </div>

        {/* Experiments Table/Cards */}
        <div className="space-y-4">
          {experiments.length === 0 ? (
            <div className="p-8 bg-lunar-50 dark:bg-lunar-900/50 border border-lunar-200 dark:border-lunar-800 rounded-lg text-center">
              <p className="text-lunar-600 dark:text-lunar-400">
                No experiments found. Upload images to start a new experiment.
              </p>
            </div>
          ) : (
            experiments.map((exp) => (
              <div
                key={exp.id}
                className={`p-6 rounded border transition-all ${
                  compareMode && selectedForComparison.includes(exp.id)
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-300 dark:border-cyan-700'
                    : 'bg-white dark:bg-lunar-900 border-lunar-200 dark:border-lunar-800'
                } hover:shadow-md`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Experiment Info */}
                  <div className="flex-1">
                    {compareMode && (
                      <input
                        type="checkbox"
                        checked={selectedForComparison.includes(exp.id)}
                        onChange={() => toggleCompareSelection(exp.id)}
                        className="mr-4 w-4 h-4 cursor-pointer"
                      />
                    )}
                    <div className="inline-block">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lunar-900 dark:text-lunar-100 text-lg">
                          {exp.id}
                        </span>
                        <span className="text-xs font-mono bg-lunar-100 dark:bg-lunar-800 text-lunar-700 dark:text-lunar-300 px-2 py-1 rounded">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-lunar-600 dark:text-lunar-400 mb-3">
                        {exp.pair} • Method: <strong>{exp.method}</strong>
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-lunar-600 dark:text-lunar-400">RMSE</p>
                          <p className="font-bold text-lunar-900 dark:text-lunar-100">
                            {exp.rmse}
                          </p>
                        </div>
                        <div>
                          <p className="text-lunar-600 dark:text-lunar-400">Confidence</p>
                          <p className="font-bold text-lunar-900 dark:text-lunar-100">
                            {exp.confidence}
                          </p>
                        </div>
                        <div>
                          <p className="text-lunar-600 dark:text-lunar-400">Status</p>
                          <p className="font-bold text-emerald-600 dark:text-emerald-400">
                            {exp.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap justify-end">
                    <button className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-900 dark:text-blue-300 rounded text-sm font-medium flex items-center gap-1 transition-colors">
                      <Eye size={16} />
                      View
                    </button>
                    <button className="px-3 py-2 bg-lunar-100 dark:bg-lunar-800 hover:bg-lunar-200 dark:hover:bg-lunar-700 text-lunar-900 dark:text-lunar-100 rounded text-sm font-medium flex items-center gap-1 transition-colors">
                      <Copy size={16} />
                      Clone
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-900 dark:text-red-300 rounded text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-lunar-50 dark:bg-lunar-900/50 border border-lunar-200 dark:border-lunar-800 rounded">
          <p className="text-lunar-600 dark:text-lunar-400 text-sm">
            <strong>Note:</strong> Experiments are stored locally in your browser's localStorage. They persist across sessions but will be lost if you clear your browser data.
          </p>
        </div>
      </div>
    </div>
  );
}
