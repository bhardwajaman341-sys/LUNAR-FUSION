import { useState } from 'react';
import { correspondenceMetrics, generateFeaturePoints } from '../data/mockData';
import { MetricCard } from '../components/MetricCard';

export function Correspondence() {
  const [showPoints, setShowPoints] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showConfidence, setShowConfidence] = useState(false);

  const sourcePoints = generateFeaturePoints(35);
  const referencePoints = generateFeaturePoints(32);

  const drawCanvas = (canvasRef, points, isSource) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e0e0e0');
    gradient.addColorStop(1, '#c0c0c0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw feature points
    if (showPoints) {
      points.forEach((point) => {
        const x = (point.x / 100) * canvas.width;
        const y = (point.y / 100) * canvas.height;

        if (showConfidence) {
          const radius = 4 + point.confidence * 2;
          ctx.fillStyle = `rgba(0, 200, 200, ${point.confidence})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#0080ff';
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.strokeStyle = '#0040ff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Feature Correspondence
          </h1>
          <p className="text-lunar-600 dark:text-lunar-400">
            Feature point matching between source and reference images
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Candidate Matches"
            value={correspondenceMetrics.candidateMatches}
          />
          <MetricCard
            label="Verified Matches"
            value={correspondenceMetrics.verifiedMatches}
          />
          <MetricCard
            label="Inlier Ratio"
            value={correspondenceMetrics.inlierRatio}
            unit="%"
          />
          <MetricCard
            label="Avg. Confidence"
            value={correspondenceMetrics.averageConfidence}
          />
        </div>

        {/* Controls */}
        <div className="mb-8 p-4 bg-lunar-50 dark:bg-lunar-900/50 rounded border border-lunar-200 dark:border-lunar-800 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPoints}
              onChange={(e) => setShowPoints(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-lunar-900 dark:text-lunar-100 text-sm font-medium">
              Feature Points
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLines}
              onChange={(e) => setShowLines(e.target.checked)}
              className="w-4 h-4"
              disabled
            />
            <span className="text-lunar-900 dark:text-lunar-100 text-sm font-medium">
              Match Lines
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showConfidence}
              onChange={(e) => setShowConfidence(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-lunar-900 dark:text-lunar-100 text-sm font-medium">
              Confidence
            </span>
          </label>
        </div>

        {/* Image Viewers */}
        <div className="grid md:grid-cols-2 gap-8">
          <CorrespondenceViewer
            label="SOURCE IMAGE"
            points={sourcePoints}
            drawCanvas={drawCanvas}
          />
          <CorrespondenceViewer
            label="REFERENCE IMAGE"
            points={referencePoints}
            drawCanvas={drawCanvas}
          />
        </div>

        {/* Demo Data Note */}
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
          <p className="text-amber-900 dark:text-amber-300 text-sm">
            <strong>Demo Data:</strong> Feature points and correspondence visualizations are simulated. Actual correspondence would use real feature detectors and matchers.
          </p>
        </div>
      </div>
    </div>
  );
}

function CorrespondenceViewer({ label, points, drawCanvas }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-lunar-900 dark:text-lunar-100 mb-4">
        {label}
      </h3>
      <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
        <canvas
          ref={(canvas) => {
            if (canvas) drawCanvas(canvas, points, label === 'SOURCE IMAGE');
          }}
          width={500}
          height={500}
          className="w-full border border-lunar-200 dark:border-lunar-700 rounded"
        />
      </div>
    </div>
  );
}
