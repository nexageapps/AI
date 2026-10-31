# Wumpus World - Interactive AI Demo

Interactive visualization of the Wumpus World problem: a classic AI problem demonstrating symbolic logic, knowledge representation, and reasoning under uncertainty.

**Related Resources:**
- [Symbolic Logic Explorer](https://nexageapps.github.io/AI/symbolic-logic/) — Learn the propositional and first-order logic that powers the Wumpus agent
- [B01 - Symbolic Logic Fundamentals](../../../Electives/Classical-AI/B01-symbolic-logic-fundamentals.ipynb) — Notebook covering logic theory

## Overview

This React application visualizes a 4x4 grid representing the Wumpus World environment with:
- Agent starting position
- Wumpus (monster)
- Pits (hazards)
- Gold (treasure)
- Perceptions (stench, breeze)

## Setup

```bash
cd application/demos/wumpus-world
npm install
npm start
```

The application will open at `http://localhost:3000`

## Grid Layout

```
Row 4: [stench]    [empty]     [breeze]    [pit]
Row 3: [wumpus]    [stench+    [pit]       [breeze]
                    breeze+
                    gold]
Row 2: [stench]    [empty]     [breeze]    [empty]
Row 1: [agent]     [breeze]    [pit]       [breeze]
       Col 1       Col 2       Col 3       Col 4
```

## Features

- Interactive agent movement (forward, turn left, turn right)
- Fog of war - agent only sees visited cells
- Directional agent indicator (arrows)
- Grab gold action
- Game over detection (pits, Wumpus)
- Victory condition (return to start with gold)
- Score tracking
- Reset functionality
- Responsive design for mobile and desktop
- Keyboard controls support

## Controls

- **Forward**: Move agent in current direction
- **Turn Left**: Rotate agent 90° counter-clockwise
- **Turn Right**: Rotate agent 90° clockwise
- **Grab**: Pick up gold at current position
- **Reset**: Restart the game

## Game Rules

1. Agent starts at (1,1) facing right
2. Only visited cells are visible
3. Breeze indicates adjacent pit
4. Stench indicates adjacent Wumpus
5. Find the gold and return to (1,1) to win
6. Avoid pits and the Wumpus

## References

- https://github.com/nexageapps/AI/
