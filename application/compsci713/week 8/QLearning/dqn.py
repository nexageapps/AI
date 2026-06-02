"""
Deep Q-Network (DQN) — When Q-Tables Aren't Enough
=====================================================

PREREQUISITE: Read qlearningBasic.py first!

THE PROBLEM WITH Q-TABLES:
    In qlearningBasic.py, we used a table to store Q-values.
    That works great for a 3×3 grid (only 9 states × 4 actions = 36 entries).

    But what about:
    - A 100×100 grid? → 40,000 entries (still okay)
    - An Atari game with pixel inputs? → millions of possible states (impossible!)
    - A robot with continuous sensor readings? → infinite states (definitely impossible!)

    You can't make a table with infinite rows.

THE SOLUTION — DQN:
    Replace the Q-table with a neural network!

    Q-Table approach:   state → look up row in table → get Q-values for each action
    DQN approach:       state → feed into neural network → get Q-values for each action

    The neural network APPROXIMATES the Q-table. Instead of memorizing every state,
    it learns PATTERNS — "states that look like THIS tend to have high value for action X."

KEY INNOVATIONS FROM THE ORIGINAL DQN PAPER (Mnih et al., 2015):
    1. Experience Replay: Store past experiences and sample randomly during training.
       Why? Breaks correlations between consecutive experiences (more stable learning).

    2. Target Network: A separate, slowly-updated copy of the network for computing targets.
       Why? Prevents the "moving target" problem (chasing your own tail).

    3. State Representation: Feed raw observations (e.g., pixels) directly to the network.
       Why? No need for hand-crafted features — the network learns what matters.

ANALOGY:
    Q-Table = A student who memorizes every single exam question and answer.
              Works if there are 50 questions. Fails if there are 50 million.

    DQN = A student who learns the CONCEPTS and can answer NEW questions
          they've never seen before. That's generalization!
"""

import numpy as np
import random
from collections import deque

# We'll use PyTorch for the neural network
import torch
import torch.nn as nn
import torch.optim as optim


# ============================================================
# STEP 1: Same grid world, but BIGGER to show why DQN helps
# ============================================================
#
#  Now we use a 5×5 grid (25 states). Still small enough to visualize,
#  but big enough to appreciate the neural network approach.
#
#     [S][ ][ ][ ][ ]
#     [ ][ ][ ][ ][ ]
#     [ ][ ][W][ ][ ]       W = Wall (obstacle)
#     [ ][ ][ ][ ][ ]
#     [ ][ ][ ][ ][G]
#
#  Actions: Up(0), Right(1), Down(2), Left(3)

GRID_SIZE = 5
START = (0, 0)
GOAL = (4, 4)
WALLS = [(2, 2)]  # Obstacles the agent must navigate around


def move(state, action):
    """Move the agent. Walls and grid edges block movement."""
    row, col = state

    if action == 0: row -= 1  # Up
    if action == 1: col += 1  # Right
    if action == 2: row += 1  # Down
    if action == 3: col -= 1  # Left

    # Stay inside grid
    row = max(0, min(GRID_SIZE - 1, row))
    col = max(0, min(GRID_SIZE - 1, col))

    # Can't walk into walls — bounce back
    if (row, col) in WALLS:
        return state

    return (row, col)


def get_reward(state):
    """Reward structure: big reward for goal, penalty otherwise."""
    if state == GOAL:
        return 10.0
    else:
        return -0.1  # Small penalty to encourage finding the goal quickly


def state_to_tensor(state):
    """
    Convert a grid position to a neural network input.

    THIS IS A KEY CONCEPT:
    The neural network needs numbers as input. We encode the state
    as a one-hot vector: a vector of zeros with a 1 at the position
    corresponding to our current cell.

    Example for a 5×5 grid, position (1, 2):
        cell index = 1*5 + 2 = 7
        tensor = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, ..., 0]  (25 elements)

    In real DQN (like Atari), this would be raw pixel values instead!
    """
    tensor = torch.zeros(GRID_SIZE * GRID_SIZE)
    index = state[0] * GRID_SIZE + state[1]
    tensor[index] = 1.0
    return tensor


# ============================================================
# STEP 2: Define the Q-Network (replaces the Q-table!)
# ============================================================
#
#  Architecture:
#     Input (25 neurons: one-hot state) 
#       → Hidden Layer (64 neurons + ReLU activation)
#       → Hidden Layer (64 neurons + ReLU activation)
#       → Output (4 neurons: one Q-value per action)
#
#  Compare to Q-table:
#     Q-table shape: (5, 5, 4) = 100 entries, looked up by index
#     Q-network: takes state as input, COMPUTES Q-values as output

class QNetwork(nn.Module):
    """
    A simple feedforward neural network that predicts Q-values.

    Input:  state representation (one-hot encoded grid position)
    Output: Q-value for each possible action [Q(s,up), Q(s,right), Q(s,down), Q(s,left)]
    """

    def __init__(self, state_size, action_size, hidden_size=64):
        super(QNetwork, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(state_size, hidden_size),   # Input → Hidden 1
            nn.ReLU(),                            # Activation (introduces non-linearity)
            nn.Linear(hidden_size, hidden_size),  # Hidden 1 → Hidden 2
            nn.ReLU(),                            # Activation
            nn.Linear(hidden_size, action_size),  # Hidden 2 → Output (Q-values)
        )

    def forward(self, x):
        """Forward pass: state in, Q-values out."""
        return self.network(x)


# ============================================================
# STEP 3: Experience Replay Buffer
# ============================================================
#
#  WHY DO WE NEED THIS?
#
#  Problem: If we train on experiences in order (step 1, step 2, step 3...),
#  consecutive experiences are highly correlated. The network overfits to
#  recent experiences and "forgets" older lessons.
#
#  Solution: Store experiences in a buffer and sample RANDOMLY.
#  This breaks temporal correlations and gives more stable training.
#
#  ANALOGY:
#  Bad studying:  Read chapter 1, immediately take quiz on chapter 1.
#                 Read chapter 2, immediately take quiz on chapter 2.
#                 → You forget chapter 1!
#
#  Good studying: Read all chapters, then quiz yourself on RANDOM chapters.
#                 → You remember everything better!

class ReplayBuffer:
    """Stores past experiences for random sampling during training."""

    def __init__(self, capacity=10000):
        self.buffer = deque(maxlen=capacity)  # Auto-removes oldest when full

    def push(self, state, action, reward, next_state, done):
        """Store one experience tuple."""
        self.buffer.append((state, action, reward, next_state, done))

    def sample(self, batch_size):
        """Randomly sample a batch of experiences."""
        batch = random.sample(self.buffer, batch_size)

        states, actions, rewards, next_states, dones = zip(*batch)

        # Convert to tensors for PyTorch
        states = torch.stack(states)
        actions = torch.tensor(actions, dtype=torch.long)
        rewards = torch.tensor(rewards, dtype=torch.float32)
        next_states = torch.stack(next_states)
        dones = torch.tensor(dones, dtype=torch.float32)

        return states, actions, rewards, next_states, dones

    def __len__(self):
        return len(self.buffer)


# ============================================================
# STEP 4: The DQN Agent
# ============================================================
#
#  This brings everything together:
#  - Q-Network (for choosing actions)
#  - Target Network (for stable training targets)
#  - Replay Buffer (for breaking correlations)
#  - Epsilon-greedy exploration (same as basic Q-learning!)

class DQNAgent:
    """
    The DQN Agent — combines neural network with Q-learning.

    KEY DIFFERENCE FROM BASIC Q-LEARNING:
    - Basic: Q-table[state][action] = value  (lookup)
    - DQN:   Q-network(state) → [value_action0, value_action1, ...]  (computation)
    """

    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size

        # --- The two networks ---
        # Policy network: the one we actively train
        self.policy_net = QNetwork(state_size, action_size)

        # Target network: a FROZEN copy used for computing targets
        # (updated periodically to match policy_net)
        self.target_net = QNetwork(state_size, action_size)
        self.target_net.load_state_dict(self.policy_net.state_dict())
        self.target_net.eval()  # Never trains directly

        # --- Training setup ---
        self.optimizer = optim.Adam(self.policy_net.parameters(), lr=0.001)
        self.loss_fn = nn.MSELoss()  # Mean Squared Error between predicted and target Q-values

        # --- Replay buffer ---
        self.memory = ReplayBuffer(capacity=5000)

        # --- Hyperparameters ---
        self.batch_size = 32       # How many experiences to learn from at once
        self.gamma = 0.99          # Discount factor (same as 'discount' in basic Q-learning)
        self.epsilon = 1.0         # Start fully exploratory
        self.epsilon_min = 0.01    # Never stop exploring completely
        self.epsilon_decay = 0.995 # Decay rate per episode
        self.target_update = 10    # Update target network every N episodes

    def choose_action(self, state_tensor):
        """
        Epsilon-greedy action selection.
        Same idea as basic Q-learning, but we ask the NETWORK instead of the TABLE.
        """
        if random.random() < self.epsilon:
            # EXPLORE: random action
            return random.randint(0, self.action_size - 1)
        else:
            # EXPLOIT: ask the network for Q-values, pick the highest
            with torch.no_grad():  # No gradient needed for action selection
                q_values = self.policy_net(state_tensor)
                return q_values.argmax().item()

    def learn(self):
        """
        Train the network on a random batch from the replay buffer.

        THIS IS THE CORE OF DQN — compare to the Q-learning update:

        Basic Q-Learning:
            new_Q = old_Q + lr * (reward + gamma * max_future_Q - old_Q)

        DQN:
            target = reward + gamma * max(target_network(next_state))
            loss = (policy_network(state)[action] - target)²
            backpropagate loss to update policy_network weights

        Same idea, different implementation!
        """
        if len(self.memory) < self.batch_size:
            return  # Not enough experiences yet

        # Sample a random batch
        states, actions, rewards, next_states, dones = self.memory.sample(self.batch_size)

        # --- Compute current Q-values ---
        # Get Q-values for the actions we actually took
        current_q = self.policy_net(states)  # Shape: (batch, 4)
        current_q = current_q.gather(1, actions.unsqueeze(1)).squeeze(1)  # Shape: (batch,)

        # --- Compute target Q-values ---
        # Use the TARGET network (not policy!) for stability
        with torch.no_grad():
            next_q = self.target_net(next_states)  # Shape: (batch, 4)
            max_next_q = next_q.max(1)[0]          # Best Q-value at next state

        # Target = reward + gamma * max_next_Q (0 if episode ended)
        target_q = rewards + self.gamma * max_next_q * (1 - dones)

        # --- Update the network ---
        loss = self.loss_fn(current_q, target_q)
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()

        return loss.item()

    def update_target_network(self):
        """Copy policy network weights to target network."""
        self.target_net.load_state_dict(self.policy_net.state_dict())

    def decay_epsilon(self):
        """Reduce exploration over time."""
        self.epsilon = max(self.epsilon_min, self.epsilon * self.epsilon_decay)


# ============================================================
# STEP 5: Training Loop
# ============================================================

print("=" * 55)
print("  DQN Training on 5×5 Grid World")
print("  (Neural network replaces Q-table)")
print("=" * 55)
print()

# Initialize
state_size = GRID_SIZE * GRID_SIZE  # 25 (one-hot encoding)
action_size = 4                      # Up, Right, Down, Left
agent = DQNAgent(state_size, action_size)

# Training
num_episodes = 300
max_steps = 50

print("Training...\n")

for episode in range(num_episodes):
    state = START
    state_tensor = state_to_tensor(state)
    total_reward = 0
    steps = 0

    for step in range(max_steps):
        steps += 1

        # Choose action (epsilon-greedy, same concept as basic Q-learning)
        action = agent.choose_action(state_tensor)

        # Take action
        next_state = move(state, action)
        reward = get_reward(next_state)
        done = (next_state == GOAL)
        total_reward += reward

        # Convert next state to tensor
        next_state_tensor = state_to_tensor(next_state)

        # Store experience in replay buffer
        agent.memory.push(state_tensor, action, reward, next_state_tensor, done)

        # Learn from a random batch of past experiences
        agent.learn()

        # Move to next state
        state = next_state
        state_tensor = next_state_tensor

        if done:
            break

    # Decay exploration
    agent.decay_epsilon()

    # Update target network periodically
    if episode % agent.target_update == 0:
        agent.update_target_network()

    # Print progress
    if episode % 50 == 0:
        print(f"  Episode {episode:3d} | Steps: {steps:2d} | "
              f"Reward: {total_reward:6.1f} | Epsilon: {agent.epsilon:.3f}")

print(f"\n  Training complete! ({num_episodes} episodes)")
print()


# ============================================================
# STEP 6: Visualize the Learned Policy
# ============================================================

arrows = ['↑', '→', '↓', '←']

print("=" * 55)
print("  LEARNED POLICY (best action at each cell)")
print("=" * 55)
print()

for i in range(GRID_SIZE):
    row_display = []
    for j in range(GRID_SIZE):
        if (i, j) == START:
            row_display.append(" S ")
        elif (i, j) == GOAL:
            row_display.append(" G ")
        elif (i, j) in WALLS:
            row_display.append(" W ")
        else:
            state_tensor = state_to_tensor((i, j))
            with torch.no_grad():
                q_values = agent.policy_net(state_tensor)
                best_action = q_values.argmax().item()
            row_display.append(f" {arrows[best_action]} ")
    print("    " + " | ".join(row_display))
    if i < GRID_SIZE - 1:
        print("    " + "-----" * GRID_SIZE)

print()
print("  S = Start, G = Goal, W = Wall")
print("  Arrows show the best direction learned by the neural network")
print()


# ============================================================
# STEP 7: Watch the trained agent solve the grid
# ============================================================

print("=" * 55)
print("  AGENT SOLVING THE GRID (greedy, no exploration)")
print("=" * 55)
print()

state = START
path = [state]

for _ in range(30):
    state_tensor = state_to_tensor(state)
    with torch.no_grad():
        q_values = agent.policy_net(state_tensor)
        action = q_values.argmax().item()
    state = move(state, action)
    path.append(state)
    if state == GOAL:
        break

print(f"  Path: {' → '.join(str(p) for p in path)}")
print(f"  Steps taken: {len(path) - 1}")
print(f"  Optimal steps: {abs(GOAL[0]-START[0]) + abs(GOAL[1]-START[1])}")
print()

if state == GOAL:
    print("  ✓ Agent reached the goal!")
else:
    print("  ✗ Agent didn't reach the goal — try more episodes or tune hyperparameters")
print()


# ============================================================
# STEP 8: Compare Q-values (peek inside the network's "brain")
# ============================================================

print("=" * 55)
print("  Q-VALUES AT START POSITION (what the network thinks)")
print("=" * 55)
print()

state_tensor = state_to_tensor(START)
with torch.no_grad():
    q_values = agent.policy_net(state_tensor)

action_names = ['Up', 'Right', 'Down', 'Left']
for i, (name, q) in enumerate(zip(action_names, q_values)):
    marker = " ← BEST" if i == q_values.argmax().item() else ""
    print(f"    {name:5s}: {q.item():6.3f}{marker}")

print()
print("  Higher Q-value = network thinks this action leads to more reward")
print()


# ============================================================
# RECAP: Q-Table vs DQN
# ============================================================

print("=" * 55)
print("  RECAP: Q-TABLE vs DQN")
print("=" * 55)
print("""
  ┌─────────────────┬──────────────────────┬──────────────────────────┐
  │                  │ Q-Table              │ DQN                      │
  ├─────────────────┼──────────────────────┼──────────────────────────┤
  │ Storage          │ Table (matrix)       │ Neural network weights   │
  │ Lookup           │ Direct index         │ Forward pass             │
  │ Scalability      │ Finite states only   │ Any state representation │
  │ Generalization   │ None (exact match)   │ Yes (similar states)     │
  │ Training         │ Single update rule   │ Gradient descent         │
  │ Stability        │ Guaranteed converge  │ Can be unstable          │
  │ Tricks needed    │ None                 │ Replay + Target network  │
  └─────────────────┴──────────────────────┴──────────────────────────┘

  WHEN TO USE WHAT:
  • Q-Table: Small, discrete state spaces (grid worlds, simple games)
  • DQN:     Large or continuous state spaces (Atari, robotics, real-world)

  KEY TAKEAWAYS:
  1. DQN = Q-Learning + Neural Network + Experience Replay + Target Network
  2. The neural network APPROXIMATES the Q-table (can't store infinite states)
  3. Experience Replay breaks correlations → more stable training
  4. Target Network prevents chasing a moving target → more stable targets
  5. Same core idea: learn Q(state, action) to pick the best action!
""")
