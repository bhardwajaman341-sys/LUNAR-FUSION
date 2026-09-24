export const mockMetadata = {
  source: {
    sensor: 'OHRC (Orbiter High Resolution Camera)',
    dimensions: '4096 x 4096 pixels',
    spatialResolution: '0.3 m/pixel',
    acquisitionDate: '2024-03-15 08:32:15 UTC',
    sunAzimuth: '125.4°',
    sunElevation: '42.8°',
    spacecraftAltitude: '100 km',
    coordinateReference: 'Lunar Lat/Lon (WGS84 Lunar)',
  },
  reference: {
    sensor: 'TMC (Terrain Mapping Camera)',
    dimensions: '4096 x 4096 pixels',
    spatialResolution: '5.0 m/pixel',
    acquisitionDate: '2024-02-28 14:18:42 UTC',
    sunAzimuth: '118.7°',
    sunElevation: '38.2°',
    spacecraftAltitude: '100 km',
    coordinateReference: 'Lunar Lat/Lon (WGS84 Lunar)',
  },
};

export const correspondenceMetrics = {
  candidateMatches: 2481,
  verifiedMatches: 1736,
  inlierRatio: 70.0,
  averageConfidence: 0.91,
};

export const verificationMetrics = {
  candidateMatches: 2481,
  inliers: 1736,
  outliers: 745,
  inlierRatio: 70.0,
  rmse: '0.82 px',
  transformation: 'Projective',
};

export const registrationMetrics = {
  rmse: '0.82 px',
  meanError: '0.61 px',
  medianError: '0.47 px',
  transformation: 'Projective',
};

export const evaluationMetrics = {
  rmse: 0.82,
  inlierCount: 1736,
  inlierRatio: 70.0,
  meanReprojectionError: 0.61,
  spatialCoverage: 92.4,
  registrationConfidence: 91,
  processingTime: 2.34,
};

export const distributionMetrics = {
  spatialCoverage: 92.4,
  gridCellsCovered: '37 / 40',
  distributionScore: 0.92,
};

export const intelligenceMetrics = {
  overallConfidence: 91,
  highConfidenceRegion: 78,
  lowConfidenceRegion: 9,
  status: 'PASS',
  warnings: [
    'Low correspondence detected in the north-east region.',
    'Minor illumination variation detected.',
  ],
  possibleCauses: [
    'Illumination variation',
    'Scale difference',
    'Low texture',
    'Viewpoint variation',
  ],
};

export const comparisonMethods = [
  {
    name: 'SIFT',
    matches: 2156,
    inliers: 1512,
    inlierRatio: 70.1,
    rmse: '0.91 px',
    coverage: 89.2,
    time: 3.12,
  },
  {
    name: 'ORB',
    matches: 1834,
    inliers: 1243,
    inlierRatio: 67.8,
    rmse: '1.15 px',
    coverage: 85.6,
    time: 1.45,
  },
  {
    name: 'LoFTR',
    matches: 2612,
    inliers: 1821,
    inlierRatio: 69.7,
    rmse: '0.78 px',
    coverage: 91.8,
    time: 4.23,
  },
  {
    name: 'Proposed Method',
    matches: 2481,
    inliers: 1736,
    inlierRatio: 70.0,
    rmse: '0.82 px',
    coverage: 92.4,
    time: 2.34,
  },
];

export const experimentHistory = [
  {
    id: 'EXP-001',
    pair: 'OHRC → TMC',
    method: 'Proposed Method',
    rmse: '0.82 px',
    confidence: '91%',
    status: 'COMPLETED',
    date: '2024-08-30 10:15',
  },
  {
    id: 'EXP-002',
    pair: 'OHRC → IIRS',
    method: 'LoFTR',
    rmse: '1.12 px',
    confidence: '86%',
    status: 'COMPLETED',
    date: '2024-08-29 14:42',
  },
  {
    id: 'EXP-003',
    pair: 'TMC → IIRS',
    method: 'SIFT',
    rmse: '1.45 px',
    confidence: '82%',
    status: 'COMPLETED',
    date: '2024-08-28 09:30',
  },
];

export const systemStatus = {
  system: 'READY',
  correspondence: 'READY',
  registration: 'READY',
  evaluation: 'READY',
};

// Helper function to generate feature points for visualization
export function generateFeaturePoints(count = 30) {
  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      confidence: 0.7 + Math.random() * 0.3,
    });
  }
  return points;
}

// Generate heatmap data
export function generateHeatmapData(rows = 8, cols = 8) {
  const data = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const value = 40 + Math.random() * 60;
      data.push({
        row: i,
        col: j,
        value,
      });
    }
  }
  return data;
}
