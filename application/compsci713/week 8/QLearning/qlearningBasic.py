"""
Q-Learning for Beginners — A Simple Grid World Example
========================================================

Imagine you're a robot in a small room (a grid).
You start in one corner and want to reach the opposite corner.
You don't have a map — you have to LEARN the best path by trial and error.

That's Q-Learning in a nutshell!

HOW IT WORKS (plain English):
1. You have a "cheat sheet" (Q-table) that starts empty.
2. You try random moves, and when something works, you write it down.
3. Over time, your cheat sheet tells you the best move from any position.

The magic formula:
   Q(state, action) = Q(state, action) + learning_rate * (reward + discount * best_future - Q(state, action))

   Translation: "Update my notes based on what just happened and what I expect next."
"""

import numpy as np
import random

# ============================================================
# STEP 1: Create a tiny world for our agent to explore
# ============================================================
#
#  Our grid looks like this (3x3 to keep it simple):
#
#     [S][ ][ ]       S = Start (top-left)
#     [ ][ ][ ]       G = Goal  (bottom-right)
#     [ ][ ][G]
#
#  The agent can move: Up(0), Right(1), Down(2), Left(3)

GRID_SIZE = 3
START = (0, 0)
GOAL = (2, 2)

def move(state, action):
    """Move the agent. If it hits a wall, it stays put."""
    row, col = state

    if action == 0:  row -= 1  # Up
    if action == 1:  col += 1  # Right
    if action == 2:  row += 1  # Down
    if action == 3:  col -= 1  # Left

    # Keep inside the grid (can't walk through walls)
    row = max(0, min(GRID_SIZE - 1, row))
    col = max(0, min(GRID_SIZE - 1, col))

    return (row, col)

def get_reward(state):
    """Reached the goal? Big reward! Otherwise, small penalty to encourage speed."""
    if state == GOAL:
        return 10   # Yay! Found the goal!
    else:
        return -1   # Small nudge: "keep moving, don't dawdle"


# ============================================================
# STEP 2: Set up the Q-table (the agent's "cheat sheet")
# ============================================================
#
#  The Q-table has one entry for every (position, action) combo.
#  It starts at all zeros because the agent knows NOTHING yet.
#
#  Shape: 3 rows × 3 cols × 4 actions = 36 entries

q_table = np.zeros((GRID_SIZE, GRID_SIZE, 4))

# ============================================================
# STEP 3: Set the learning settings (hyperparameters)
# ============================================================

learning_rate = 0.1   # How much to trust new experience (0 = ignore, 1 = fully trust)
discount = 0.9        # How much to care about future rewards (0 = short-sighted, 1 = far-sighted)
epsilon = 0.5         # How often to explore randomly (starts high, decreases over time)
episodes = 500        # How many times the agent practices (start → goal = 1 episode)


# ============================================================
# STEP 4: Train the agent! (This is where the learning happens)
# ============================================================

print("Training the agent...\n")

for episode in range(episodes):
    state = START  # Always start at the beginning
    done = False
    total_reward = 0
    steps = 0

    while not done and steps < 50:  # Safety limit so it doesn't loop forever
        steps += 1

        # --- DECIDE: Explore or Exploit? ---
        if random.random() < epsilon:
            # EXPLORE: pick a random action (try something new!)
            action = random.randint(0, 3)
        else:
            # EXPLOIT: pick the best action we know so far
            row, col = state
            action = np.argmax(q_table[row, col])

        # --- ACT: Take the action, see what happens ---
        next_state = move(state, action)
        reward = get_reward(next_state)
        total_reward += reward

        # --- LEARN: Update the Q-table ---
        # "How good was this move, considering what comes next?"
        row, col = state
        next_row, next_col = next_state

        old_value = q_table[row, col, action]
        best_future = np.max(q_table[next_row, next_col])

        # The Q-Learning update formula:
        new_value = old_value + learning_rate * (reward + discount * best_future - old_value)
        q_table[row, col, action] = new_value

        # --- MOVE: Go to the next state ---
        state = next_state

        # --- CHECK: Did we reach the goal? ---
        if state == GOAL:
            done = True

    # Reduce exploration over time (explore less as we learn more)
    epsilon = max(0.01, epsilon * 0.99)

    # Print progress every 100 episodes
    if episode % 100 == 0:
        print(f"  Episode {episode:3d} | Steps: {steps:2d} | Reward: {total_reward:.0f} | Explore rate: {epsilon:.2f}")

print(f"  Episode {episodes:3d} | Training complete!\n")


# ============================================================
# STEP 5: Show what the agent learned
# ============================================================

arrows = ['↑', '→', '↓', '←']

print("=" * 35)
print("  LEARNED POLICY (best move at each cell)")
print("=" * 35)
print()

for i in range(GRID_SIZE):
    row_display = []
    for j in range(GRID_SIZE):
        if (i, j) == START:
            row_display.append(" S ")
        elif (i, j) == GOAL:
            row_display.append(" G ")
        else:
            best_action = np.argmax(q_table[i, j])
            row_display.append(f" {arrows[best_action]} ")
    print("    " + " | ".join(row_display))
    if i < GRID_SIZE - 1:
        print("    " + "----" * GRID_SIZE)

print()
print("  S = Start, G = Goal")
print("  Arrows show the best direction to move from each cell")
print()


# ============================================================
# STEP 6: Watch the agent solve the maze!
# ============================================================

print("=" * 35)
print("  AGENT SOLVING THE GRID (no exploration)")
print("=" * 35)
print()

state = START
path = [state]

for _ in range(20):  # Safety limit
    row, col = state
    action = np.argmax(q_table[row, col])  # Always pick the best action
    state = move(state, action)
    path.append(state)
    if state == GOAL:
        break

print(f"  Path taken: {' → '.join(str(p) for p in path)}")
print(f"  Steps: {len(path) - 1}")
print(f"  Optimal steps: {(GRID_SIZE - 1) * 2}")  # Manhattan distance
print()

if len(path) - 1 == (GRID_SIZE - 1) * 2:
    print("  ✓ The agent found the shortest path!")
else:
    print("  The agent found a path (may not be shortest — try more episodes)")


# ============================================================
# RECAP: What just happened?
# ============================================================
print()
print("=" * 35)
print("  RECAP")
print("=" * 35)
print("""
  1. We made a 3×3 grid with a Start and Goal.
  2. The agent tried random moves at first (exploration).
  3. Each time it moved, it updated its Q-table:
     "Was this move good? How good is the next spot?"
  4. Over 500 episodes, it figured out the best path.
  5. Now it can go from Start to Goal efficiently!

  KEY IDEA:
  Q-Learning = Trial and error + keeping notes
  The Q-table IS the knowledge the agent builds up.
""")
