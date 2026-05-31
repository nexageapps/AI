"""
Q-Learning on a 5x5 Grid World
================================
COMPSCI 713 - Reinforcement Learning Basics

Q-Learning is a MODEL-FREE, OFF-POLICY reinforcement learning algorithm.
- Model-free: The agent doesn't need to know the environment's transition probabilities.
- Off-policy: It learns the optimal policy regardless of the agent's current behavior.

The core idea:
  The agent maintains a Q-table that stores the expected cumulative reward
  for taking action 'a' in state 's', then following the optimal policy thereafter.

  Q(s, a) = "How good is it to take action 'a' when I'm in state 's'?"

The Bellman Update Equation:
  Q(s, a) ← Q(s, a) + α * [r + γ * max_a' Q(s', a') - Q(s, a)]
  
  Where:
    α (alpha)  = learning rate (how much we trust new info vs old)
    γ (gamma)  = discount factor (how much we value future rewards)
    r          = immediate reward received after taking action 'a'
    s'         = next state after taking action 'a'
    max_a' Q(s', a') = best Q-value achievable from the next state

Exploration vs Exploitation (ε-greedy):
  - With probability ε: explore (pick a random action)
  - With probability 1-ε: exploit (pick the action with highest Q-value)
  This ensures the agent doesn't get stuck in suboptimal policies early on.
"""

import numpy as np
import random
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.colors import LinearSegmentedColormap


# ============================================================
# PART 1: ENVIRONMENT DEFINITION
# ============================================================
# We define a simple 5x5 grid world:
#
#   (0,0) (0,1) (0,2) (0,3) (0,4)
#   (1,0) (1,1) (1,2) (1,3) (1,4)
#   (2,0) (2,1) (2,2) (2,3) (2,4)
#   (3,0) (3,1) (3,2) (3,3) (3,4)
#   (4,0) (4,1) (4,2) (4,3) (4,4)
#
# Start: top-left (0,0)  |  Goal: bottom-right (4,4)
# The agent must learn to navigate from Start to Goal.
# Reward: +100 for reaching the goal, -1 for every step (encourages shortest path).
# ============================================================

class GridWorld:
    """
    A simple deterministic grid world environment.
    
    The agent starts at (0,0) and must reach (4,4).
    At each step, the agent chooses one of 4 actions:
      0 = Up, 1 = Right, 2 = Down, 3 = Left
    
    If the agent tries to move off the grid, it stays in place
    (but still pays the -1 step penalty).
    """
    
    def __init__(self, size=5):
        self.size = size
        self.start = (0, 0)       # Top-left corner
        self.goal = (size-1, size-1)  # Bottom-right corner
        self.reset()
    
    def reset(self):
        """Reset the agent back to the start position."""
        self.state = self.start
        return self.state
    
    def step(self, action):
        """
        Execute one action in the environment.
        
        Parameters:
            action (int): 0=up, 1=right, 2=down, 3=left
        
        Returns:
            next_state (tuple): new (row, col) position
            reward (float): +100 if goal reached, -1 otherwise
            done (bool): True if episode is over (goal reached)
        """
        row, col = self.state
        
        # Move the agent (clamp to grid boundaries)
        if action == 0:    # Up: decrease row
            row = max(0, row - 1)
        elif action == 1:  # Right: increase column
            col = min(self.size - 1, col + 1)
        elif action == 2:  # Down: increase row
            row = min(self.size - 1, row + 1)
        elif action == 3:  # Left: decrease column
            col = max(0, col - 1)
        
        self.state = (row, col)
        
        # Check if we reached the goal
        if self.state == self.goal:
            return self.state, 100, True   # Big reward for reaching goal
        else:
            return self.state, -1, False   # Small penalty per step
    
    def get_valid_actions(self):
        """
        Returns actions that actually move the agent (not into walls).
        This prevents wasting time bumping into boundaries.
        """
        row, col = self.state
        valid = [0, 1, 2, 3]  # Start with all actions
        if row == 0:              valid.remove(0)  # Can't go up from top row
        if row == self.size - 1:  valid.remove(2)  # Can't go down from bottom row
        if col == 0:              valid.remove(3)  # Can't go left from leftmost col
        if col == self.size - 1:  valid.remove(1)  # Can't go right from rightmost col
        return valid


# ============================================================
# PART 2: Q-LEARNING HYPERPARAMETERS
# ============================================================
# These control how the agent learns. Tuning these is important!

alpha = 0.1       # Learning rate (α): How quickly we update Q-values.
                  #   High α (e.g., 0.9) → fast learning but unstable
                  #   Low α (e.g., 0.01) → slow but stable learning

gamma = 0.9       # Discount factor (γ): How much we value future rewards.
                  #   γ = 0 → agent is "myopic", only cares about immediate reward
                  #   γ = 1 → agent values future rewards equally to immediate ones
                  #   γ = 0.9 → future rewards are worth 90% of current ones per step

epsilon = 0.1     # Exploration rate (ε): Probability of taking a random action.
                  #   High ε → more exploration (good early in training)
                  #   Low ε → more exploitation (good later in training)

n_episodes = 1000  # Number of complete episodes (start→goal or timeout) to train
max_steps = 100    # Maximum steps per episode (prevents infinite loops)

size = 5

# ============================================================
# PART 3: Q-TABLE INITIALIZATION
# ============================================================
# The Q-table stores a value for every (state, action) pair.
# Shape: (5 rows, 5 cols, 4 actions) = 100 entries total.
# Initialized to zeros → agent starts with no knowledge.
#
# Conceptually:
#   q_table[row][col][action] = "Expected total reward if I'm at (row,col)
#                                 and I take this action, then act optimally"

q_table = np.zeros((size, size, 4))

# Create the environment
env = GridWorld(size)

# Track rewards per episode to monitor learning progress
rewards_per_episode = []
# Track steps per episode to see if agent gets faster
steps_per_episode = []


# ============================================================
# PART 4: TRAINING LOOP
# ============================================================
# Each episode:
#   1. Start at (0,0)
#   2. Choose action (ε-greedy)
#   3. Take action, observe reward and next state
#   4. Update Q-table using Bellman equation
#   5. Repeat until goal reached or max_steps exceeded

print("=" * 60)
print("  Q-LEARNING TRAINING ON 5x5 GRID WORLD")
print("=" * 60)
print(f"  Episodes: {n_episodes} | Max steps/episode: {max_steps}")
print(f"  α={alpha}, γ={gamma}, ε={epsilon}")
print("=" * 60)

for episode in range(n_episodes):
    state = env.reset()       # Reset agent to start
    total_reward = 0
    steps = 0
    
    for step in range(max_steps):
        steps += 1
        
        # --- ACTION SELECTION: ε-greedy strategy ---
        # With probability ε: EXPLORE (random action)
        # With probability 1-ε: EXPLOIT (best known action)
        if random.random() < epsilon:
            # Exploration: try a random valid action
            action = random.choice(env.get_valid_actions())
        else:
            # Exploitation: pick the action with highest Q-value
            row, col = state
            action = np.argmax(q_table[row, col])
        
        # --- TAKE ACTION: interact with environment ---
        next_state, reward, done = env.step(action)
        total_reward += reward
        
        # --- Q-TABLE UPDATE: Bellman equation ---
        # This is the CORE of Q-learning!
        #
        # Formula: Q(s,a) ← Q(s,a) + α * [r + γ * max Q(s',a') - Q(s,a)]
        #                                   \_________TD Target__________/
        #                              \____________TD Error_________________/
        #
        # TD Target = what we THINK the value should be (based on new info)
        # TD Error  = difference between target and current estimate
        # We nudge Q(s,a) toward the target by a fraction α
        
        row, col = state
        next_row, next_col = next_state
        
        # Best Q-value achievable from the NEXT state (greedy lookahead)
        best_next_q = np.max(q_table[next_row, next_col])
        
        # The temporal difference (TD) target
        td_target = reward + gamma * best_next_q
        
        # The TD error (how wrong our current estimate is)
        td_error = td_target - q_table[row, col, action]
        
        # Update the Q-value (move it toward the target)
        q_table[row, col, action] += alpha * td_error
        
        # Move to next state
        state = next_state
        
        if done:
            break
    
    rewards_per_episode.append(total_reward)
    steps_per_episode.append(steps)
    
    # --- EPSILON DECAY ---
    # Gradually reduce exploration as the agent learns.
    # Early: explore a lot (find good paths)
    # Later: exploit what we've learned (follow best paths)
    if episode % 100 == 0:
        epsilon = max(0.01, epsilon * 0.95)  # Never go below 1% exploration
        if episode % 200 == 0:
            avg_reward = np.mean(rewards_per_episode[-100:]) if len(rewards_per_episode) >= 100 else np.mean(rewards_per_episode)
            print(f"  Episode {episode:4d} | Avg Reward (last 100): {avg_reward:7.1f} | ε: {epsilon:.4f}")

print(f"\n  Episode {n_episodes:4d} | Final Avg Reward (last 100): {np.mean(rewards_per_episode[-100:]):.1f}")
print("  Training complete!")


# ============================================================
# PART 5: DISPLAY LEARNED POLICY (TEXT)
# ============================================================
# The policy is derived from the Q-table:
#   π(s) = argmax_a Q(s, a)
# i.e., at each state, pick the action with the highest Q-value.

print("\n" + "=" * 60)
print("  LEARNED OPTIMAL POLICY")
print("  (Arrow shows best action at each cell)")
print("=" * 60)

action_names = ['↑', '→', '↓', '←']
for i in range(size):
    row_str = []
    for j in range(size):
        if (i, j) == env.goal:
            row_str.append(' G ')  # Goal
        elif (i, j) == env.start:
            row_str.append(' S ')  # Start
        else:
            best_action = np.argmax(q_table[i, j])
            row_str.append(f' {action_names[best_action]} ')
    print("  " + " | ".join(row_str))
    if i < size - 1:
        print("  " + "-----" * size)

# Show Q-values at start state
print("\n  Q-values at start state (0,0):")
print(f"    Up:    {q_table[0, 0, 0]:7.2f}")
print(f"    Right: {q_table[0, 0, 1]:7.2f}")
print(f"    Down:  {q_table[0, 0, 2]:7.2f}")
print(f"    Left:  {q_table[0, 0, 3]:7.2f}")
print(f"  → Best action: {action_names[np.argmax(q_table[0, 0])]}")


# ============================================================
# PART 6: VISUALIZATIONS
# ============================================================
# We create 4 plots to understand what the agent learned:
#   1. Reward curve over episodes (did the agent improve?)
#   2. Steps per episode (did the agent get faster?)
#   3. Heatmap of max Q-values (which states are most valuable?)
#   4. Policy visualization (what does the agent do at each cell?)

fig, axes = plt.subplots(2, 2, figsize=(14, 11))
fig.suptitle("Q-Learning on 5×5 Grid World", fontsize=16, fontweight='bold')

# --- Plot 1: Reward per Episode (smoothed) ---
ax1 = axes[0, 0]
window = 50  # Smoothing window
smoothed_rewards = pd.Series(rewards_per_episode).rolling(window=window, min_periods=1).mean()
ax1.plot(rewards_per_episode, alpha=0.2, color='blue', label='Raw')
ax1.plot(smoothed_rewards, color='blue', linewidth=2, label=f'Smoothed (window={window})')
ax1.axhline(y=92, color='green', linestyle='--', alpha=0.7, label='Optimal (8 steps = 92)')
ax1.set_xlabel('Episode')
ax1.set_ylabel('Total Reward')
ax1.set_title('Learning Curve: Reward per Episode')
ax1.legend()
ax1.grid(True, alpha=0.3)

# --- Plot 2: Steps per Episode (smoothed) ---
ax2 = axes[0, 1]
smoothed_steps = pd.Series(steps_per_episode).rolling(window=window, min_periods=1).mean()
ax2.plot(steps_per_episode, alpha=0.2, color='orange', label='Raw')
ax2.plot(smoothed_steps, color='orange', linewidth=2, label=f'Smoothed (window={window})')
ax2.axhline(y=8, color='green', linestyle='--', alpha=0.7, label='Optimal (8 steps)')
ax2.set_xlabel('Episode')
ax2.set_ylabel('Steps to Goal')
ax2.set_title('Efficiency: Steps per Episode')
ax2.legend()
ax2.grid(True, alpha=0.3)

# --- Plot 3: Heatmap of Max Q-values ---
# Shows the "value" of each state (how good it is to be there)
ax3 = axes[1, 0]
max_q_values = np.max(q_table, axis=2)  # Best Q-value at each cell
im = ax3.imshow(max_q_values, cmap='YlOrRd', interpolation='nearest')
ax3.set_title('State Value Heatmap\n(max Q-value at each cell)')
ax3.set_xlabel('Column')
ax3.set_ylabel('Row')

# Annotate each cell with its value
for i in range(size):
    for j in range(size):
        text_color = 'white' if max_q_values[i, j] > max_q_values.max() * 0.6 else 'black'
        ax3.text(j, i, f'{max_q_values[i, j]:.1f}', ha='center', va='center',
                 fontsize=10, color=text_color, fontweight='bold')

# Mark start and goal
ax3.text(0, 0, '\nS', ha='center', va='center', fontsize=8, color='blue')
ax3.text(size-1, size-1, '\nG', ha='center', va='center', fontsize=8, color='green')
plt.colorbar(im, ax=ax3, shrink=0.8)

# --- Plot 4: Policy Visualization (arrows on grid) ---
ax4 = axes[1, 1]
ax4.set_xlim(-0.5, size - 0.5)
ax4.set_ylim(size - 0.5, -0.5)  # Invert y-axis so (0,0) is top-left
ax4.set_aspect('equal')
ax4.set_title('Learned Policy\n(arrows show best action)')
ax4.set_xlabel('Column')
ax4.set_ylabel('Row')

# Draw grid
for i in range(size + 1):
    ax4.axhline(y=i - 0.5, color='gray', linewidth=0.5)
    ax4.axvline(x=i - 0.5, color='gray', linewidth=0.5)

# Arrow directions for each action: (dx, dy) in plot coordinates
# action 0=up (dy=-1), 1=right (dx=+1), 2=down (dy=+1), 3=left (dx=-1)
arrow_dx = [0, 0.3, 0, -0.3]
arrow_dy = [-0.3, 0, 0.3, 0]

for i in range(size):
    for j in range(size):
        if (i, j) == env.goal:
            # Draw goal as a green square
            rect = mpatches.FancyBboxPatch((j - 0.4, i - 0.4), 0.8, 0.8,
                                            boxstyle="round,pad=0.05",
                                            facecolor='lightgreen', edgecolor='green', linewidth=2)
            ax4.add_patch(rect)
            ax4.text(j, i, 'GOAL', ha='center', va='center', fontsize=8, fontweight='bold', color='darkgreen')
        elif (i, j) == env.start:
            # Draw start as a blue square
            rect = mpatches.FancyBboxPatch((j - 0.4, i - 0.4), 0.8, 0.8,
                                            boxstyle="round,pad=0.05",
                                            facecolor='lightblue', edgecolor='blue', linewidth=2)
            ax4.add_patch(rect)
            ax4.text(j, i - 0.15, 'START', ha='center', va='center', fontsize=7, fontweight='bold', color='darkblue')
            # Still show the arrow for start
            best_action = np.argmax(q_table[i, j])
            ax4.arrow(j, i + 0.1, arrow_dx[best_action] * 0.7, arrow_dy[best_action] * 0.7,
                     head_width=0.12, head_length=0.08, fc='darkblue', ec='darkblue')
        else:
            # Draw arrow showing best action
            best_action = np.argmax(q_table[i, j])
            ax4.arrow(j, i, arrow_dx[best_action], arrow_dy[best_action],
                     head_width=0.15, head_length=0.1, fc='red', ec='darkred', linewidth=1.5)

ax4.set_xticks(range(size))
ax4.set_yticks(range(size))

plt.tight_layout()
plt.savefig('qlearning_results.png', dpi=150, bbox_inches='tight')
plt.show()
print("\n  Visualization saved to 'qlearning_results.png'")


# ============================================================
# PART 7: SAVE Q-TABLE TO CSV
# ============================================================
# Export the full Q-table for inspection or further analysis.

q_data = []
for i in range(size):
    for j in range(size):
        for a in range(4):
            q_data.append({
                'row': i,
                'col': j,
                'action': action_names[a],
                'action_id': a,
                'q_value': round(q_table[i, j, a], 4)
            })

df_q = pd.DataFrame(q_data)
df_q.to_csv('q_table_gridworld.csv', index=False)
print("  Q-table saved to 'q_table_gridworld.csv'")


# ============================================================
# PART 8: SUMMARY OF KEY CONCEPTS
# ============================================================
print("\n" + "=" * 60)
print("  KEY CONCEPTS SUMMARY")
print("=" * 60)
print("""
  ┌─────────────────────────────────────────────────────────┐
  │  Q-LEARNING ALGORITHM                                   │
  ├─────────────────────────────────────────────────────────┤
  │                                                         │
  │  1. Initialize Q(s,a) = 0 for all states and actions    │
  │                                                         │
  │  2. For each episode:                                   │
  │     a. Start in initial state s                         │
  │     b. Choose action a using ε-greedy:                  │
  │        - Random action with prob ε (explore)            │
  │        - Best action with prob 1-ε (exploit)            │
  │     c. Take action a, observe reward r and next state s'│
  │     d. Update Q-value:                                  │
  │                                                         │
  │        Q(s,a) ← Q(s,a) + α[r + γ·max Q(s',a') - Q(s,a)]│
  │                           ↑       ↑                     │
  │                        learning  discount               │
  │                          rate    factor                  │
  │                                                         │
  │     e. s ← s' (move to next state)                     │
  │     f. Repeat until terminal state                      │
  │                                                         │
  │  3. After enough episodes, Q-table converges to         │
  │     optimal values → extract optimal policy:            │
  │     π*(s) = argmax_a Q(s,a)                             │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

  WHY IT WORKS:
  • The Bellman equation guarantees convergence to optimal Q*
    under certain conditions (all state-action pairs visited
    infinitely often, learning rate decays appropriately).
  • Each update propagates reward information backward from
    the goal through the state space.
  • After training, cells near the goal have high Q-values,
    and the policy naturally points toward the goal.
""")
