# NEAT Explainer App

A simple presentable React app to explain **NEAT — NeuroEvolution of Augmenting Topologies**.

## Important fix included

This version pins Tailwind CSS to version 3.4.17, so the normal `postcss.config.js` setup works without the Tailwind v4 PostCSS plugin error.

## Run in VS Code

```bash
npm install
npm run dev
```

Open the URL shown in the terminal, usually:

```text
http://localhost:5173
```

## If you already installed dependencies before

Delete `node_modules` and `package-lock.json`, then run:

```bash
npm install
npm run dev
```

## Main files

- `src/App.jsx` — main React app
- `src/main.jsx` — React entry point
- `src/styles.css` — Tailwind CSS setup
- `package.json` — dependencies and scripts
