# 🚀 Quick Manual Deployment

If GitHub Actions isn't working, you can deploy manually from your local machine:

## One-Command Deploy

```bash
cd application/compsci713/week2/wumpus
npm run deploy
```

This will:
1. Build the production version
2. Push to the `gh-pages` branch
3. Deploy to https://nexageapps.github.io/AI/wumpus

## First Time Setup

If this is your first time deploying, install gh-pages:

```bash
cd application/compsci713/week2/wumpus
npm install
```

## Troubleshooting

**Error: "Failed to get remote.origin.url"**
- Make sure you're in a git repository
- Run: `git remote -v` to verify origin is set

**Error: "Permission denied"**
- Make sure you're authenticated with GitHub
- Run: `git config --global user.name "Your Name"`
- Run: `git config --global user.email "your@email.com"`

**Build fails:**
- Run `npm run build` first to see detailed errors
- Fix any errors, then run `npm run deploy` again
