import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, GitBranch, Network, Trophy, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react'

const steps = [
  {
    title: '1. Start Simple',
    icon: Brain,
    text: 'NEAT begins with very small neural networks. This makes the first generation easy to evaluate and evolve.',
  },
  {
    title: '2. Mutate',
    icon: GitBranch,
    text: 'Networks change over time. NEAT can add a connection, change a weight, or add a new neuron.',
  },
  {
    title: '3. Protect Innovation',
    icon: Sparkles,
    text: 'New structures are grouped into species so useful innovations get time to improve instead of being removed too early.',
  },
  {
    title: '4. Select Winners',
    icon: Trophy,
    text: 'The best-performing networks are more likely to reproduce, creating the next generation.',
  },
]

const quiz = [
  {
    question: 'What does NEAT evolve?',
    options: ['Only weights', 'Only data', 'Both network structure and weights'],
    answer: 2,
  },
  {
    question: 'Why does NEAT start with simple networks?',
    options: ['To reduce complexity', 'To avoid learning', 'To make networks random forever'],
    answer: 0,
  },
  {
    question: 'What is speciation used for?',
    options: ['Deleting all new ideas', 'Protecting new innovations', 'Making one fixed model'],
    answer: 1,
  },
]

function Card({ children, className = '' }) {
  return <div className={`rounded-3xl bg-white shadow-lg ${className}`}>{children}</div>
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  const style = variant === 'outline'
    ? 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
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
    return base
  }, [generation])

  const links = useMemo(() => {
    const base = [['I1', 'O1'], ['I2', 'O1']]
    if (generation >= 2) base.push(['I1', 'H1'], ['H1', 'O1'])
    if (generation >= 3) base.push(['I2', 'H2'], ['H2', 'O1'], ['H1', 'H2'])
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
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
      <p className="text-center text-sm text-slate-300">Generation {generation}: network complexity grows only when useful.</p>
    </div>
  )
}

export default function App() {
  const [generation, setGeneration] = useState(1)
  const [selected, setSelected] = useState({})
  const score = quiz.reduce((total, item, index) => total + (selected[index] === item.answer ? 1 : 0), 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 p-4 text-slate-900 md:p-8">
      <section className="mx-auto max-w-6xl">
        <motion.div className="mb-8 rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                <Network className="h-4 w-4" /> AI Concept Explainer
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Understand NEAT</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                NEAT means <strong>NeuroEvolution of Augmenting Topologies</strong>. It is an AI method that evolves neural networks by improving both their connection weights and their structure over generations.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg md:w-80">
              <p className="text-sm uppercase tracking-wide text-sky-300">Core idea</p>
              <p className="mt-2 text-2xl font-semibold">Start simple, mutate, protect new ideas, and select the best networks.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="p-6">
              <h2 className="mb-4 text-2xl font-bold">How NEAT evolves a network</h2>
              <NetworkDiagram generation={generation} />
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => setGeneration((g) => Math.min(3, g + 1))}>Next generation</Button>
                <Button variant="outline" onClick={() => setGeneration(1)}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div key={step.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                  <Card className="shadow-md">
                    <div className="flex gap-4 p-5">
                      <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{step.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{step.text}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold">Mini quiz</h2>
              <p className="mt-1 text-slate-600">Check your understanding after presenting.</p>
              <div className="mt-5 space-y-5">
                {quiz.map((item, qIndex) => (
                  <div key={item.question} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold">{item.question}</p>
                    <div className="mt-3 grid gap-2 md:grid-cols-3">
                      {item.options.map((option, optionIndex) => {
                        const isSelected = selected[qIndex] === optionIndex
                        const isCorrect = item.answer === optionIndex
                        return (
                          <button
                            key={option}
                            onClick={() => setSelected({ ...selected, [qIndex]: optionIndex })}
                            className={`rounded-2xl border p-3 text-left text-sm transition ${isSelected && isCorrect ? 'border-emerald-400 bg-emerald-50' : isSelected ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white hover:border-sky-300'}`}
                          >
                            {option}
                          </button>
                        )
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
                <li>• NEAT is an evolutionary AI algorithm.</li>
                <li>• It evolves both weights and topology.</li>
                <li>• It starts simple and becomes complex only when needed.</li>
                <li>• Speciation protects new network structures.</li>
              </ul>
              <div className="mt-6 rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Quiz score</p>
                <p className="text-4xl font-bold">{score}/{quiz.length}</p>
              </div>
            </div>
          </Card>
        </section>
      </section>
    </main>
  )
}
