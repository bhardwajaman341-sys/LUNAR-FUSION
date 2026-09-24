import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export function Preprocessing() {
  const [completedStages, setCompletedStages] = useState(1);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const stages = [
    'Input Image',
    'Intensity Normalization',
    'Noise Reduction',
    'Contrast Enhancement',
    'Geometric Preparation',
    'Multi-scale Representation',
  ];

  const handleProcessStage = (index) => {
    if (index === completedStages) {
      setCompletedStages(index + 1);
    }
  };

  const getStageStatus = (index) => {
    if (index < completedStages) return 'COMPLETED';
    if (index === completedStages) return 'PROCESSING';
    return 'PENDING';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Preprocessing Pipeline
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Image enhancement and preparation stages
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="mb-12 p-8 bg-lunar-50 dark:bg-lunar-900/50 rounded border border-lunar-200 dark:border-lunar-800">
          <h2 className="text-xl font-semibold text-lunar-900 dark:text-lunar-100 mb-8">
            Processing Stages
          </h2>

          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div key={index}>
                <div
                  onClick={() => handleProcessStage(index)}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-lunar-800 rounded border border-lunar-200 dark:border-lunar-700 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-lunar-900 dark:text-lunar-100">
                      {stage}
                    </p>
                  </div>
                  <StatusBadge status={getStageStatus(index)} />
                  {index < stages.length - 1 && (
                    <ChevronRight className="text-lunar-400 flex-shrink-0" />
                  )}
                </div>

                {/* Animated progress bar */}
                {getStageStatus(index) === 'PROCESSING' && (
                  <div className="mt-2 h-1 bg-lunar-200 dark:bg-lunar-700 rounded overflow-hidden">
                    <div className="h-full bg-cyan-500 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-lunar-600 dark:text-lunar-400 mt-8">
            Click on any stage to simulate processing
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-lunar-900 dark:text-lunar-100">
              Image Comparison
            </h2>
            <button
              onClick={() => setShowBeforeAfter(!showBeforeAfter)}
              className="px-4 py-2 bg-lunar-100 dark:bg-lunar-800 hover:bg-lunar-200 dark:hover:bg-lunar-700 text-lunar-900 dark:text-lunar-100 rounded font-medium text-sm transition-colors"
            >
              {showBeforeAfter ? 'Hide' : 'Show'} Comparison
            </button>
          </div>

          {showBeforeAfter && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
                <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
                  Before Processing
                </h3>
                <div className="w-full aspect-square bg-gradient-to-br from-gray-400 to-gray-300 rounded border border-lunar-200 dark:border-lunar-700 flex items-center justify-center">
                  <span className="text-gray-600">Input Image (Raw)</span>
                </div>
              </div>

              {/* After */}
              <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
                <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
                  After Processing
                </h3>
                <div className="w-full aspect-square bg-gradient-to-br from-cyan-300 to-blue-400 rounded border border-lunar-200 dark:border-lunar-700 flex items-center justify-center">
                  <span className="text-blue-900">Enhanced & Prepared</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Processing Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Normalization
            </h3>
            <p className="text-lunar-600 dark:text-lunar-400 text-sm mb-3">
              Standardizes pixel intensity values to ensure consistent comparison across different sensors.
            </p>
            <div className="p-3 bg-lunar-50 dark:bg-lunar-800 rounded text-xs font-mono text-lunar-700 dark:text-lunar-300">
              Range: [0, 255] → [-1, 1]
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Noise Reduction
            </h3>
            <p className="text-lunar-600 dark:text-lunar-400 text-sm mb-3">
              Applies bilateral filtering to remove sensor noise while preserving edge information.
            </p>
            <div className="p-3 bg-lunar-50 dark:bg-lunar-800 rounded text-xs font-mono text-lunar-700 dark:text-lunar-300">
              Filter: Bilateral (σs=5, σr=0.1)
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Contrast Enhancement
            </h3>
            <p className="text-lunar-600 dark:text-lunar-400 text-sm mb-3">
              Enhances local contrast to improve feature visibility in low-texture regions.
            </p>
            <div className="p-3 bg-lunar-50 dark:bg-lunar-800 rounded text-xs font-mono text-lunar-700 dark:text-lunar-300">
              CLAHE: clip=2.0, tileSize=8
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Multi-scale Representation
            </h3>
            <p className="text-lunar-600 dark:text-lunar-400 text-sm mb-3">
              Creates image pyramid for scale-invariant feature detection and matching.
            </p>
            <div className="p-3 bg-lunar-50 dark:bg-lunar-800 rounded text-xs font-mono text-lunar-700 dark:text-lunar-300">
              Scales: 1.0, 0.75, 0.5, 0.25
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
