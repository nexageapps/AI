import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  GitBranch,
  Network,
  Trophy,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Dices,
  Layers3,
  Users,
  Scale,
  Route,
  Lightbulb,
  BookOpen,
} from 'lucide-react'

const steps = [
  {
    title: '1. Start with a minimal network',
    icon: Brain,
    text: 'NEAT starts with a simple neural network, usually inputs connected directly to outputs. It does not begin with a large hidden-layer design.',
  },
  {
    title: '2. Evaluate fitness',
    icon: Trophy,
    text: 'Each network is tested on a task. A fitness score tells NEAT how well that network performs.',
  },
  {
    title: '3. Mutate the genome',
    icon: GitBranch,
    text: 'NEAT can change connection weights, add a new connection, or split a connection by adding a new node.',
  },
  {
    title: '4. Group into species',
    icon: Users,
    text: 'Similar networks are grouped together. This protects new structures so they are not immediately eliminated before they improve.',
  },
  {
    title: '5. Reproduce the best networks',
    icon: Sparkles,
    text: 'Better networks are selected more often. They create the next generation through crossover and mutation.',
  },
]

const concepts = [
  {
    title: 'Genome',
    icon: BookOpen,
    short: 'The encoded blueprint of a neural network.',
    detail:
      'In NEAT, a genome stores the network design. It includes node genes and connection genes. Instead of manually designing the neural network architecture, NEAT evolves this blueprint automatically.',
    example: 'Example: Input A connects to Output B with weight 0.8. That connection is one gene in the genome.',
  },
  {
    title: 'Connection weight',
    icon: Scale,
    short: 'A number that controls the strength of a connection.',
    detail:
      'A positive weight increases the signal passed forward. A negative weight reduces or reverses it. Weight mutation slightly changes these values so the network can improve behavior over time.',
    example: 'Example: A sensor input may strongly affect a movement output if its weight is high.',
  },
  {
    title: 'Topology',
    icon: Network,
    short: 'The structure or shape of the neural network.',
    detail:
      'Topology means which nodes exist and how they are connected. NEAT is special because it evolves topology as well as weights. This is why the full name includes “Augmenting Topologies”.',
    example: 'Example: Generation 1 has no hidden node. Later generations may add hidden nodes only if they help.',
  },
  {
    title: 'Mutation',
    icon: Dices,
    short: 'Random changes that create variation.',
    detail:
      'Mutation is how NEAT explores new solutions. It can adjust a weight, add a connection between two existing nodes, or add a node by splitting an existing connection.',
    example: 'Example: A direct input-output connection is split, creating a new hidden node in the middle.',
  },
  {
    title: 'Crossover',
    icon: Route,
    short: 'Combining genes from two parent networks.',
    detail:
      'Crossover creates a child genome from two parents. NEAT uses innovation numbers to align matching genes correctly, even when the networks have different structures.',
    example: 'Example: Parent 1 has a good hidden node, Parent 2 has a useful weight. The child may inherit both.',
  },
  {
    title: 'Speciation',
    icon: Users,
    short: 'Grouping similar networks together.',
    detail:
      'Speciation protects innovation. A new structure might perform badly at first but become useful after a few mutations. Species give these new ideas time to develop.',
    example: 'Example: Networks with a newly added hidden node compete mostly against similar networks instead of all networks.',
  },
  {
    title: 'Innovation number',
    icon: Layers3,
    short: 'A historical marker for genes.',
    detail:
      'Whenever a new structural gene appears, NEAT gives it an innovation number. This helps NEAT match genes during crossover and compare different network structures.',
    example: 'Example: If two genomes both contain innovation #7, NEAT knows those genes came from the same historical structural change.',
  },
]

const mutationTypes = [
  {
    name: 'Weight mutation',
    before: 'Same structure',
    after: 'Connection weights change',
    why: 'Fine-tunes behavior without changing the network shape.',
  },
  {
    name: 'Add connection',
    before: 'Two nodes not directly linked',
    after: 'A new connection appears',
    why: 'Allows information to flow through a new route.',
  },
  {
    name: 'Add node',
    before: 'One connection between two nodes',
    after: 'Connection is split with a new hidden node',
    why: 'Adds complexity and allows more advanced decision patterns.',
  },
]

const quiz = [
  { question: 'What does NEAT evolve?', options: ['Only weights', 'Only data', 'Both network structure and weights'], answer: 2 },
  { question: 'Why does NEAT start with simple networks?', options: ['To reduce complexity', 'To avoid learning', 'To make networks random forever'], answer: 0 },
  { question: 'What is speciation used for?', options: ['Deleting all new ideas', 'Protecting new innovations', 'Making one fixed model'], answer: 1 },
  { question: 'What is an innovation number mainly used for?', options: ['Tracking gene history', 'Increasing screen size', 'Removing fitness scores'], answer: 0 },
  { question: 'What does add-node mutation do?', options: ['Deletes all outputs', 'Splits a connection and inserts a node', 'Stops evolution'], answer: 1 },
]

function Card({ children, className = '' }) {
  return <div className={`rounded-3xl bg-white shadow-lg ${className}`}>{children}</div>
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  const style = variant === 'outline'
    ? 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
    : variant === 'soft'
      ? 'bg-sky-100 text-sky-800 hover:bg-sky-200'
      : 'bg-slate-950 text-white hover:bg-slate-800'

  return (
    <button className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold transition ${style} ${className}`} {...props}>
      {children}
    </button>
  )
}

function NetworkDiagram({ generation }) {
  const nodes = useMemo(() => {
    const base = [
      { id: 'I1', x: 70, y: 85, type: 'Input' },
      { id: 'I2', x: 70, y: 175, type: 'Input' },
      { id: 'O1', x: 330, y: 130, type: 'Output' },
    ]
    if (generation >= 2) base.splice(2, 0, { id: 'H1', x: 200, y: 80, type: 'Hidden' })
    if (generation >= 3) base.splice(3, 0, { id: 'H2', x: 205, y: 185, type: 'Hidden' })
    if (generation >= 4) base.splice(4, 0, { id: 'H3', x: 245, y: 130, type: 'Hidden' })
    return base
  }, [generation])

  const links = useMemo(() => {
    const base = [['I1', 'O1'], ['I2', 'O1']]
    if (generation >= 2) base.push(['I1', 'H1'], ['H1', 'O1'])
    if (generation >= 3) base.push(['I2', 'H2'], ['H2', 'O1'], ['H1', 'H2'])
    if (generation >= 4) base.push(['H1', 'H3'], ['H2', 'H3'], ['H3', 'O1'])
    return base
  }, [generation])

  const getNode = (id) => nodes.find((n) => n.id === id)

  return (
    <div className="rounded-2xl bg-slate-950 p-4 text-white shadow-inner">
      <svg viewBox="0 0 400 260" className="h-64 w-full">
        {links.map(([from, to], index) => {
          const a = getNode(from)
          const b = getNode(to)
          return (
            <motion.line
              key={`${from}-${to}-${index}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
          )
        })}
        {nodes.map((node) => (
          <motion.g key={node.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220 }}>
            <circle cx={node.x} cy={node.y} r="28" fill={node.type === 'Hidden' ? '#a78bfa' : node.type === 'Output' ? '#34d399' : '#f59e0b'} />
            <text x={node.x} y={node.y + 5} textAnchor="middle" className="fill-slate-950 text-sm font-bold">
              {node.id}
            </text>
          </motion.g>
        ))}
      </svg>
      <p className="text-center text-sm text-slate-300">Generation {generation}: NEAT grows complexity only when it helps fitness.</p>
    </div>
  )
}

function ConceptCard({ concept, active, onClick }) {
  const Icon = concept.icon
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl border p-4 text-left transition ${active ? 'border-indigo-400 bg-indigo-50 shadow-md' : 'border-slate-200 bg-white hover:border-sky-300'}`}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-950 p-2 text-white"><Icon className="h-5 w-5" /></div>
        <div>
          <h3 className="font-bold">{concept.title}</h3>
          <p className="text-sm text-slate-600">{concept.short}</p>
        </div>
      </div>
    </button>
  )
}

export default function App() {
  const [generation, setGeneration] = useState(1)
  const [selectedConcept, setSelectedConcept] = useState(0)
  const [selected, setSelected] = useState({})
  const score = quiz.reduce((total, item, index) => total + (selected[index] === item.answer ? 1 : 0), 0)
  const concept = concepts[selectedConcept]
  const ConceptIcon = concept.icon

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 p-4 text-slate-900 md:p-8">
      <section className="mx-auto max-w-6xl">
        <motion.div className="mb-8 rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700"><Network className="h-4 w-4" /> AI Concept Explainer</p>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Understand NEAT in Detail</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                NEAT means <strong>NeuroEvolution of Augmenting Topologies</strong>. It is an evolutionary AI method that automatically improves both the <strong>weights</strong> and the <strong>structure</strong> of neural networks.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg md:w-80">
              <p className="text-sm uppercase tracking-wide text-sky-300">Simple explanation</p>
              <p className="mt-2 text-2xl font-semibold">NEAT is like natural selection for neural network designs.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="p-6">
              <h2 className="mb-2 text-2xl font-bold">Interactive network growth</h2>
              <p className="mb-4 text-sm text-slate-600">Click next generation to see how a simple network can become more complex.</p>
              <NetworkDiagram generation={generation} />
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => setGeneration((g) => Math.min(4, g + 1))}>Next generation</Button>
                <Button variant="outline" onClick={() => setGeneration(1)}><RefreshCw className="mr-2 h-4 w-4" /> Reset</Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold">NEAT lifecycle</h2>
              <p className="mt-1 text-sm text-slate-600">This is the repeated loop that improves the population.</p>
              <div className="mt-5 space-y-3">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <motion.div key={step.title} className="flex gap-4 rounded-2xl bg-slate-50 p-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
                      <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700"><Icon className="h-6 w-6" /></div>
                      <div><h3 className="font-bold">{step.title}</h3><p className="mt-1 text-sm text-slate-600">{step.text}</p></div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold">Core NEAT concepts</h2>
              <p className="mt-1 text-sm text-slate-600">Select a concept to read the detailed explanation.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {concepts.map((item, index) => (
                  <ConceptCard key={item.title} concept={item} active={selectedConcept === index} onClick={() => setSelectedConcept(index)} />
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-slate-950 text-white">
            <div className="p-6">
              <div className="rounded-2xl bg-white/10 p-3 text-sky-300 w-fit"><ConceptIcon className="h-8 w-8" /></div>
              <h2 className="mt-4 text-2xl font-bold">{concept.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{concept.detail}</p>
              <div className="mt-5 rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-semibold text-sky-200">Example</p>
                <p className="mt-1 text-sm text-slate-300">{concept.example}</p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold">Three important mutation types</h2>
              <p className="mt-1 text-sm text-slate-600">Mutation creates the variation needed for evolution.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {mutationTypes.map((item) => (
                  <div key={item.name} className="rounded-2xl bg-slate-50 p-4">
                    <h3 className="font-bold text-indigo-700">{item.name}</h3>
                    <p className="mt-3 text-sm"><strong>Before:</strong> {item.before}</p>
                    <p className="mt-2 text-sm"><strong>After:</strong> {item.after}</p>
                    <p className="mt-2 text-sm text-slate-600"><strong>Why:</strong> {item.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Lightbulb className="h-10 w-10 text-amber-500" />
              <h2 className="mt-4 text-2xl font-bold">Why NEAT is useful</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• You do not need to manually choose the perfect network architecture.</li>
                <li>• It starts simple, so early search is cheaper.</li>
                <li>• It can discover unexpected structures.</li>
                <li>• It is useful for control, game AI, robotics-style tasks, and reinforcement learning experiments.</li>
              </ul>
            </div>
          </Card>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold">Detailed quiz</h2>
              <p className="mt-1 text-slate-600">Use this after the presentation to test understanding.</p>
              <div className="mt-5 space-y-5">
                {quiz.map((item, qIndex) => (
                  <div key={item.question} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold">{item.question}</p>
                    <div className="mt-3 grid gap-2 md:grid-cols-3">
                      {item.options.map((option, optionIndex) => {
                        const isSelected = selected[qIndex] === optionIndex
                        const isCorrect = item.answer === optionIndex
                        return <button key={option} onClick={() => setSelected({ ...selected, [qIndex]: optionIndex })} className={`rounded-2xl border p-3 text-left text-sm transition ${isSelected && isCorrect ? 'border-emerald-400 bg-emerald-50' : isSelected ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white hover:border-sky-300'}`}>{option}</button>
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-slate-950 text-white">
            <div className="p-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-300" />
              <h2 className="mt-4 text-2xl font-bold">Presentation summary</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• NEAT evolves neural networks using natural selection ideas.</li>
                <li>• It evolves both weights and topology.</li>
                <li>• It begins with small networks and complexifies over generations.</li>
                <li>• Mutation creates new structures.</li>
                <li>• Speciation protects new ideas.</li>
                <li>• Innovation numbers help align genes during crossover.</li>
              </ul>
              <div className="mt-6 rounded-2xl bg-white/10 p-4"><p className="text-sm text-slate-300">Quiz score</p><p className="text-4xl font-bold">{score}/{quiz.length}</p></div>
            </div>
          </Card>
        </section>
      </section>
    </main>
  )
}
