import random
import math
import copy


# -----------------------------
# Activation function
# -----------------------------
def sigmoid(x):
    return 1 / (1 + math.exp(-x))


# -----------------------------
# Connection Gene
# -----------------------------
class ConnectionGene:
    def __init__(self, in_node, out_node, weight, enabled=True):
        self.in_node = in_node
        self.out_node = out_node
        self.weight = weight
        self.enabled = enabled

    def copy(self):
        return ConnectionGene(
            self.in_node,
            self.out_node,
            self.weight,
            self.enabled
        )


# -----------------------------
# Genome = Neural Network Blueprint
# -----------------------------
class Genome:
    def __init__(self):
        # Nodes:
        # 1 = distance to wall
        # 2 = current speed
        # 3 = bias
        # 4 = output movement
        self.nodes = {
            1: "input_distance",
            2: "input_speed",
            3: "bias",
            4: "output_move"
        }

        self.connections = [
            ConnectionGene(1, 4, random.uniform(-1, 1)),
            ConnectionGene(2, 4, random.uniform(-1, 1)),
            ConnectionGene(3, 4, random.uniform(-1, 1))
        ]

        self.next_node_id = 5
        self.fitness = 0

    def copy(self):
        new_genome = Genome()
        new_genome.nodes = copy.deepcopy(self.nodes)
        new_genome.connections = [c.copy() for c in self.connections]
        new_genome.next_node_id = self.next_node_id
        new_genome.fitness = self.fitness
        return new_genome

    def calculate_output(self, distance, speed):
        """
        Convert genome into a simple neural network calculation.
        """

        values = {
            1: distance,
            2: speed,
            3: 1.0  # bias
        }

        # Initialize hidden/output nodes
        for node_id in self.nodes:
            if node_id not in values:
                values[node_id] = 0

        # Process connections
        for conn in self.connections:
            if conn.enabled:
                input_value = values.get(conn.in_node, 0)
                values[conn.out_node] += input_value * conn.weight

        # Apply sigmoid to output node
        move_amount = sigmoid(values[4])

        return move_amount

    def mutate_weights(self):
        """
        Slightly change connection weights.
        """
        for conn in self.connections:
            if random.random() < 0.8:
                conn.weight += random.uniform(-0.5, 0.5)

    def add_hidden_node(self):
        """
        Add a hidden node by splitting an existing connection.
        Similar to NEAT.
        """
        enabled_connections = [c for c in self.connections if c.enabled]

        if not enabled_connections:
            return

        # Pick a random enabled connection
        old_conn = random.choice(enabled_connections)

        # Disable old connection
        old_conn.enabled = False

        # Create new hidden node
        new_node_id = self.next_node_id
        self.nodes[new_node_id] = "hidden"
        self.next_node_id += 1

        # Add two new connections
        self.connections.append(
            ConnectionGene(old_conn.in_node, new_node_id, 1.0)
        )

        self.connections.append(
            ConnectionGene(new_node_id, old_conn.out_node, old_conn.weight)
        )

    def mutate(self):
        """
        Apply random mutations.
        """
        self.mutate_weights()

        # Small chance to add hidden node
        if random.random() < 0.1:
            self.add_hidden_node()


# -----------------------------
# Robot Simulation
# -----------------------------
def test_robot(genome):
    """
    Simulate robot moving toward a wall.
    Fitness = distance travelled safely.
    """

    wall_position = 10.0
    robot_position = 0.0
    speed = 0.0
    fitness = 0

    for step in range(100):
        distance_to_wall = wall_position - robot_position

        # Normalize inputs between 0 and 1
        normalized_distance = distance_to_wall / wall_position
        normalized_speed = speed / 2.0

        # Neural network decides movement
        move_signal = genome.calculate_output(
            normalized_distance,
            normalized_speed
        )

        # Convert output to speed
        speed = move_signal * 2.0

        # Move robot
        robot_position += speed * 0.1

        # If robot crashes, punish it
        if robot_position >= wall_position:
            fitness -= 50
            break

        # Reward moving forward safely
        fitness = robot_position * 10

        # Reward stopping near the wall
        if 8.5 <= robot_position <= 9.8 and speed < 0.5:
            fitness += 50
            break

    return fitness


# -----------------------------
# Evolution Process
# -----------------------------
def evolve():
    population_size = 30
    generations = 30

    # Create initial population
    population = [Genome() for _ in range(population_size)]

    for generation in range(generations):
        # Test every genome
        for genome in population:
            genome.fitness = test_robot(genome)

        # Sort by fitness
        population.sort(key=lambda g: g.fitness, reverse=True)

        best = population[0]

        print(
            f"Generation {generation + 1} | "
            f"Best Fitness: {best.fitness:.2f} | "
            f"Nodes: {len(best.nodes)} | "
            f"Connections: {len(best.connections)}"
        )

        # Keep top 20%
        survivors = population[:6]

        # Create next generation
        new_population = []

        for survivor in survivors:
            new_population.append(survivor.copy())

        while len(new_population) < population_size:
            parent = random.choice(survivors)
            child = parent.copy()
            child.mutate()
            new_population.append(child)

        population = new_population

    return population[0]


# -----------------------------
# Run Program
# -----------------------------
best_genome = evolve()

print("\nBest Genome:")
print("Nodes:")
for node_id, node_type in best_genome.nodes.items():
    print(f"Node {node_id}: {node_type}")

print("\nConnections:")
for conn in best_genome.connections:
    status = "enabled" if conn.enabled else "disabled"
    print(
        f"{conn.in_node} -> {conn.out_node}, "
        f"weight = {conn.weight:.2f}, "
        f"{status}"
    )