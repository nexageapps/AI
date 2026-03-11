# Blindfold Hill Game - Quick Start

## What is this?

An interactive game that teaches gradient descent concepts from COMPSCI714 through gameplay. Navigate a blindfolded character down a hill using only gradient information!

## Run Locally

```bash
cd application/compsci714/week2/blindfold-hill
npm install
npm start
```

Opens at http://localhost:3000

## How to Play

1. **Choose a surface type**: Bowl (simple), Valley, or Multi-modal
2. **Adjust learning rate**: Controls step size (0.01 - 2.0)
3. **Take steps**: Click "Take Step" or use Space bar
4. **Auto mode**: Click "Start Auto" or press P for continuous movement
5. **Watch the visualization**: 
   - Yellow arrow = gradient direction (where to go)
   - Blue/Red contours = elevation (blue=low, red=high)
   - Green target = goal (minimum point)
   - Path trail shows your journey

## Key Concepts

- **Gradient**: The yellow arrow shows the direction of steepest descent
- **Learning Rate**: Step size - larger = faster but less stable
- **Iterations**: Number of steps taken
- **Convergence**: Successfully reaching the goal (green)
- **Divergence**: Getting stuck or oscillating (red)

## Keyboard Shortcuts

- `Space` - Take a single step
- `P` - Play/Pause auto mode
- `R` - Reset game

## Deploy to GitHub Pages

```bash
npm run build
git add docs/
git commit -m "Deploy to GitHub Pages"
git push
```

Then configure GitHub Pages to use the `/docs` folder from main branch.

## Features Implemented

✅ Three hill surface types (bowl, valley, multi-modal)
✅ Real-time gradient visualization
✅ Adjustable learning rate with presets
✅ Manual and automatic stepping modes
✅ Path history visualization
✅ Convergence/divergence detection
✅ Educational metrics display
✅ Keyboard controls
✅ Responsive design
✅ GitHub Pages deployment ready

## What You'll Learn

- How gradient descent finds optimal solutions
- Impact of learning rate on convergence
- Why some starting positions are harder than others
- How different surfaces affect optimization
- The relationship between gradient magnitude and proximity to goal
