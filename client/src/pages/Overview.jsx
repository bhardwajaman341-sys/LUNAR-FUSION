import React from 'react';
import { ChevronDown } from 'lucide-react';

import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { systemStatus } from '../data/mockData';

export function Overview() {
  return (
    <div className="min-h-screen bg-white dark:bg-lunar-950 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-lunar-900 dark:text-lunar-100 mb-2">
            Lunar Registration Laboratory
          </h1>
          <p className="text-lg text-lunar-600 dark:text-lunar-400">
            Chandrayaan-2 Multi-modal Image Correspondence & Registration
          </p>
        </div>

        {/* Problem Statement */}
        <div className="mb-12 p-6 bg-lunar-50 dark:bg-lunar-900/50 rounded border border-lunar-200 dark:border-lunar-800">
          <h2 className="text-xl font-semibold text-lunar-900 dark:text-lunar-100 mb-3">
            The Challenge
          </h2>
          <p className="text-lunar-700 dark:text-lunar-300 leading-relaxed">
            Lunar image registration is the process of aligning multiple images of the same lunar region acquired by different sensors at different times and viewing angles. This is critical for creating high-resolution mosaic images, tracking surface changes, and supporting scientific analysis. The challenge involves handling multi-modal data, varying illumination angles, scale differences, and low-textured regions.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
            Processing Workflow
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              'UPLOAD',
              'ANALYZE',
              'MATCH',
              'VERIFY',
              'REGISTER',
              'EVALUATE',
              'COMPARE',
              'REPORT',
            ].map((stage, index) => (
              <div key={stage} className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex-1 md:flex-none px-6 py-3 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded text-center font-semibold text-lunar-900 dark:text-lunar-100 whitespace-nowrap">
                  {stage}
                </div>
                {index < 7 && (
                  <ChevronDown className="hidden md:block md:rotate-[-90deg] text-lunar-400 dark:text-lunar-600 flex-shrink-0" />
                )}
                {index < 7 && (
                  <div className="md:hidden text-lunar-400 dark:text-lunar-600">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
            System Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(systemStatus).map(([key, value]) => (
              <div
                key={key}
                className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded text-center"
              >
                <p className="text-lunar-600 dark:text-lunar-400 text-sm font-medium mb-3">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <StatusBadge status={value} />
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-lunar-900 dark:text-lunar-100 mb-6">
            Key Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
              <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-2">
                Multi-modal Correspondence
              </h3>
              <p className="text-lunar-600 dark:text-lunar-400 text-sm">
                Handles images from different sensors (OHRC, TMC, IIRS) with varying resolutions and characteristics.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
              <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-2">
                Sun-angle Invariant
              </h3>
              <p className="text-lunar-600 dark:text-lunar-400 text-sm">
                Robust to illumination variations caused by different solar elevation angles.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
              <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-2">
                Scale-invariant Matching
              </h3>
              <p className="text-lunar-600 dark:text-lunar-400 text-sm">
                Effective across images with different spatial resolutions and scales.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-lunar-900 border border-lunar-200 dark:border-lunar-800 rounded">
              <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-2">
                Comprehensive Analysis
              </h3>
              <p className="text-lunar-600 dark:text-lunar-400 text-sm">
                Full pipeline from preprocessing to evaluation with detailed metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded">
          <h3 className="font-semibold text-lunar-900 dark:text-lunar-100 mb-2">
            Getting Started
          </h3>
          <ol className="text-lunar-700 dark:text-lunar-300 text-sm space-y-1 list-decimal list-inside">
            <li>Navigate to <strong>Upload</strong> to load source and reference images</li>
            <li>View image <strong>Metadata</strong> including sensor information</li>
            <li>Apply <strong>Preprocessing</strong> to enhance image quality</li>
            <li>Inspect feature <strong>Correspondence</strong> and verification results</li>
            <li>Review registration output and evaluation metrics</li>
          </ol>
        </div>
      </div>
    </div>
  );
}