import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { registrationMetrics } from '../data/mockData';
import { MetricCard } from '../components/MetricCard';

export function Registration() {
  const [viewMode, setViewMode] = useState('registered');
  const [opacity, setOpacity] = useState(50);
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Image Registration Result
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Aligned and registered output
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="RMSE" value={registrationMetrics.rmse} />
          <MetricCard label="Mean Error" value={registrationMetrics.meanError} />
          <MetricCard label="Median Error" value={registrationMetrics.medianError} />
          <MetricCard
            label="Transformation"
            value={registrationMetrics.transformation}
          />
        </div>

        {/* View Mode Selection */}
        <div className="mb-6 flex flex-wrap gap-4">
          {[
            { mode: 'source', label: 'SOURCE' },
            { mode: 'registered', label: 'REGISTERED' },
            { mode: 'overlay', label: 'OVERLAY' },
          ].map((option) => (
            <button
              key={option.mode}
              onClick={() => setViewMode(option.mode)}
              className={`px-6 py-2 rounded font-medium transition-colors ${
                viewMode === option.mode
                  ? 'bg-cyan-500 text-lunar-900'
                  : 'bg-lunar-100 dark:bg-lunar-800 text-lunar-900 dark:text-lunar-100 hover:bg-lunar-200 dark:hover:bg-lunar-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Image Viewer */}
        <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded mb-8">
          <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
            Registration Viewer
          </h3>

          {/* Viewer */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded border border-lunar-200 dark:border-lunar-700 p-8 mb-6">
            <div className="w-full aspect-square flex items-center justify-center relative">
              {viewMode === 'source' && (
                <div className="w-full h-full bg-gradient-to-br from-red-200 to-orange-200 rounded flex items-center justify-center text-red-900 font-semibold">
                  Source Image
                </div>
              )}
              {viewMode === 'registered' && (
                <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-cyan-200 rounded flex items-center justify-center text-emerald-900 font-semibold">
                  Registered Output
                </div>
              )}
              {viewMode === 'overlay' && (
                <div className="w-full h-full relative rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 flex items-center justify-center text-red-900 font-semibold">
                    Base Layer
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-cyan-200 flex items-center justify-center text-emerald-900 font-semibold"
                    style={{ opacity: opacity / 100 }}
                  >
                    Overlay
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {viewMode === 'overlay' && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-lunar-900 dark:text-lunar-100">
                    Opacity
                  </label>
                  <span className="text-sm text-lunar-600 dark:text-lunar-400">
                    {opacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Before/After Slider */}
            <div>
              <label className="text-sm font-medium text-lunar-900 dark:text-lunar-100 mb-2 block">
                Before/After Comparison
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-lunar-600 dark:text-lunar-400 mt-2">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2 bg-lunar-100 dark:bg-lunar-800 hover:bg-lunar-200 dark:hover:bg-lunar-700 text-lunar-900 dark:text-lunar-100 rounded font-medium text-sm flex items-center gap-2 transition-colors">
                <ZoomIn size={18} />
                Zoom +
              </button>
              <button className="px-4 py-2 bg-lunar-100 dark:bg-lunar-800 hover:bg-lunar-200 dark:hover:bg-lunar-700 text-lunar-900 dark:text-lunar-100 rounded font-medium text-sm flex items-center gap-2 transition-colors">
                <ZoomOut size={18} />
                Zoom -
              </button>
              <button className="px-4 py-2 bg-lunar-100 dark:bg-lunar-800 hover:bg-lunar-200 dark:hover:bg-lunar-700 text-lunar-900 dark:text-lunar-100 rounded font-medium text-sm flex items-center gap-2 transition-colors">
                <RotateCcw size={18} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
            <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
              Registration Quality
            </h3>
            <ul className="space-y-2 text-sm text-lunar-700 dark:text-lunar-300">
              <li className="flex justify-between">
                <span>RMSE:</span>
                <span className="font-mono">{registrationMetrics.rmse}</span>
              </li>
              <li className="flex justify-between">
                <span>Mean Error:</span>
                <span className="font-mono">{registrationMetrics.meanError}</span>
              </li>
              <li className="flex justify-between">
                <span>Median Error:</span>
                <span className="font-mono">{registrationMetrics.medianError}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-3">
              Status
            </h3>
            <p className="text-emerald-800 dark:text-emerald-400 text-sm">
              Registration completed successfully with sub-pixel accuracy. The registered image is aligned and ready for scientific analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
