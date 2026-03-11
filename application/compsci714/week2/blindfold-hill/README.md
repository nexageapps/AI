# Blindfold Hill Game

An interactive educational game that visualizes gradient descent optimization concepts from COMPSCI714.

## Overview

Players navigate a blindfolded character down a mathematical hill surface using only gradient (slope) information. The game demonstrates how gradient descent algorithms find optimal solutions by iteratively following the steepest descent direction.

## Key Concepts Demonstrated

- **Gradient**: Direction and magnitude of steepest descent
- **Learning Rate**: Step size parameter affecting convergence speed
- **Iterations**: Number of steps taken toward the goal
- **Convergence**: Successfully reaching the minimum point

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Builds to `./docs` directory for GitHub Pages deployment.

### Run Tests

```bash
npm test
```

## Deployment

This project is configured for GitHub Pages deployment:
- Build output: `./docs`
- Base URL: `/compsci714/week2/blindfold-hill`

## Features

- Three hill surface types (bowl, valley, multi-modal)
- Adjustable learning rate (0.01 - 2.0)
- Manual step-by-step or automatic continuous mode
- Real-time gradient visualization
- Path history with color-coded trajectory
- Convergence/divergence detection
- Performance comparison across multiple runs
- Educational tooltips and tutorial mode

## Technology Stack

- React 18.2.0
- HTML5 Canvas for visualization
- Context API for state management
- fast-check for property-based testing
