# Detailed NEAT Explainer App

A more detailed React presentation app for **NEAT — NeuroEvolution of Augmenting Topologies**.

## New sections added

- Interactive network growth up to generation 4
- NEAT lifecycle explanation
- Clickable concept cards:
  - Genome
  - Connection weight
  - Topology
  - Mutation
  - Crossover
  - Speciation
  - Innovation number
- Mutation type explanation
- Detailed quiz
- Presentation summary

## Run in VS Code

```bash
npm install
npm run dev
```

Open the URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Important Tailwind note

This project uses Tailwind CSS `^3.4.17` to avoid the Tailwind v4 PostCSS plugin issue.

If you copied this into an existing project, delete old dependencies first:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```
