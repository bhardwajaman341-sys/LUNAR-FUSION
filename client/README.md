# SENTINEL - Lunar Registration Laboratory

A professional frontend prototype for Chandrayaan-2 lunar image registration and correspondence analysis.

## Overview

**SENTINEL** is a comprehensive web application built with React and Tailwind CSS that demonstrates a complete workflow for multi-modal, sun-angle and scale-invariant lunar image correspondence and registration.

### Key Features

- **Multi-modal Correspondence**: Handle images from different sensors (OHRC, TMC, IIRS) with varying resolutions
- **Sun-angle Invariant**: Robust to illumination variations from different solar elevation angles
- **Scale-invariant Matching**: Effective across images with different spatial resolutions
- **Complete Pipeline**: From preprocessing to evaluation with detailed metrics and visualizations
- **Theme Support**: Full light and dark mode with system preference detection
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: Browser localStorage for experiment persistence

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx           # Navigation sidebar with theme toggle
│   ├── Topbar.jsx            # Page header with breadcrumbs
│   ├── MetricCard.jsx        # Reusable metric display component
│   └── StatusBadge.jsx       # Status indicator badges
│
├── pages/
│   ├── Landing.jsx           # Landing page with START button
│   ├── Overview.jsx          # System overview and workflow
│   ├── Upload.jsx            # Drag-and-drop image upload
│   ├── Metadata.jsx          # Image metadata display
│   ├── Preprocessing.jsx     # Pipeline processing stages
│   ├── Correspondence.jsx    # Feature point visualization
│   ├── Verification.jsx      # RANSAC verification results
│   ├── Distribution.jsx      # Spatial distribution analysis
│   ├── Registration.jsx      # Registered image viewer
│   ├── Intelligence.jsx      # Confidence heatmap and analysis
│   ├── Evaluation.jsx        # Metrics dashboard
│   ├── Comparison.jsx        # Method comparison table
│   ├── Experiments.jsx       # Experiment history
│   └── Reports.jsx           # Report generation and preview
│
├── context/
│   └── ThemeContext.jsx      # Light/dark mode management
│
├── data/
│   └── mockData.js           # Demo and mock data
│
├── App.jsx                   # Main app with routing
├── main.jsx                  # Entry point
└── index.css                 # Global styles and Tailwind directives
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd sentinel

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Features & Pages

### Landing Page
- Minimal, professional design
- Single START button to enter the application
- Dark theme with animated gradients
- Displays SENTINEL title, subtitle, and tagline

### Overview Page
- System workflow visualization
- Problem statement explanation
- System status indicators
- Key capabilities description
- Getting started guide

### Upload Page
- Dual drag-and-drop zones for source and reference images
- Support for PNG, JPG, JPEG, TIFF formats
- Image preview with metadata (dimensions, file size)
- Analyze button with loading animation
- Frontend-only processing (no server required)

### Metadata Page
- Displays sensor information
- Acquisition parameters
- Coordinates and resolution details
- Demo data clearly labeled

### Preprocessing Page
- Interactive pipeline stages (6 stages)
- Status indicators (PENDING, PROCESSING, COMPLETED)
- Before/after image comparison
- Technical details for each processing step

### Correspondence Page
- Side-by-side image visualization
- Feature points display with canvas rendering
- Correspondence metrics
- Toggle controls for visualization options

### Verification Page
- RANSAC verification results
- Inlier/outlier analysis
- Registration error metrics
- Before/after comparison

### Distribution Page
- Spatial distribution heatmap
- Grid-based analysis
- Coverage statistics

### Registration Page
- Multiple view modes (Source, Registered, Overlay)
- Zoom controls and opacity adjustment
- Before/after slider
- Registration quality metrics

### Intelligence Page
- Confidence heatmap visualization
- Failure detection status
- Low confidence warning system

### Evaluation Page
- Comprehensive metrics dashboard
- Performance metrics visualization

### Comparison Page
- Method comparison table
- Performance benchmarks

### Experiments Page
- Experiment history with localStorage persistence
- View, clone, and delete experiments

### Reports Page
- Report generation interface
- Comprehensive report preview
- Download capability

## Theme System

The application features a complete light and dark mode system with localStorage persistence.

## Installation & Running

```bash
# Install dependencies
npm install

# Run development server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

This is a **frontend-only prototype** for demonstration purposes. All features use simulated data and frontend-based processing.
