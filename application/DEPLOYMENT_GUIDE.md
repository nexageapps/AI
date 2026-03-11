# 🚀 Deployment Guide - Interactive AI Demos

This guide explains how the interactive demos are deployed to GitHub Pages.

## 🌐 Live Demos

- **Landing Page**: https://nexageapps.github.io/AI/
- **Wumpus World**: https://nexageapps.github.io/AI/wumpus/
- **Mountain Explorer (Gradient Descent)**: https://nexageapps.github.io/AI/gradient-descent/

## 📁 Project Structure

```
AI/
├── index.html                                    # Landing page (root)
├── .github/workflows/deploy-apps.yml            # Deployment automation
├── application/
│   ├── compsci713/week2/wumpus/                # Wumpus World (React)
│   └── compsci714/week2/gradient-descent-game/ # Gradient Descent (Vite + React)
```

## 🔄 Deployment Architecture

### GitHub Pages Structure

The `gh-pages` branch contains:
```
gh-pages/
├── index.html                    # Landing page
├── wumpus/                       # Wumpus World app
│   ├── index.html
│   └── static/
└── gradient-descent/             # Gradient Descent app
    ├── index.html
    └── assets/
```

### Automated Deployment

The GitHub Actions workflow (`.github/workflows/deploy-apps.yml`) automatically:

1. **Detects changes** in application folders
2. **Builds** each app independently
3. **Deploys** to specific subdirectories on `gh-pages` branch
4. **Preserves** other apps (using `keep_files: true`)

## 🛠️ How It Works

### Wumpus World (React + Create React App)

**Build Configuration:**
- Uses Create React App's default build process
- Outputs to `build/` directory
- Deployed to `/wumpus/` path

**Deployment:**
```yaml
- Build: npm run build
- Output: ./application/compsci713/week2/wumpus/build
- Destination: wumpus/
```

### Gradient Descent Game (Vite + React)

**Build Configuration:**
```json
{
  "homepage": "/AI/gradient-descent/",
  "scripts": {
    "build": "vite build --outDir docs --base=/AI/gradient-descent/"
  }
}
```

**Deployment:**
```yaml
- Build: npm run build
- Output: ./application/compsci714/week2/gradient-descent-game/docs
- Destination: gradient-descent/
```

### Landing Page

**Deployment:**
- Simple HTML file at repository root
- Deployed to root of `gh-pages` branch
- Lists all available demos with links

## 🚀 Manual Deployment

### Prerequisites
```bash
npm install -g gh-pages
```

### Deploy Wumpus World
```bash
cd application/compsci713/week2/wumpus
npm install
npm run build
npx gh-pages -d build -e wumpus
```

### Deploy Gradient Descent Game
```bash
cd application/compsci714/week2/gradient-descent-game
npm install
npm run build
npx gh-pages -d docs -e gradient-descent
```

### Deploy Landing Page
```bash
# From repository root
npx gh-pages -d . -e . --src index.html
```

## 🔧 Adding a New Game

1. **Create your app** in `application/compsciXXX/weekX/your-game/`

2. **Configure build output:**
   - For Vite: Use `--outDir docs --base=/AI/your-game/`
   - For CRA: Configure `homepage` in package.json

3. **Update workflow** (`.github/workflows/deploy-apps.yml`):
   ```yaml
   # Add to detect-changes job
   your-game:
     - 'application/compsciXXX/weekX/your-game/**'
   
   # Add new deployment job
   deploy-your-game:
     needs: detect-changes
     if: needs.detect-changes.outputs.your-game == 'true' || github.event_name == 'workflow_dispatch'
     # ... (follow existing pattern)
   ```

4. **Update landing page** (`index.html`):
   - Add new game card with link to `/your-game/`

5. **Update README.md**:
   - Add entry to Live Demos table

## 🐛 Troubleshooting

### Issue: Root path loads wrong app

**Problem:** `https://nexageapps.github.io/AI/` loads an app instead of landing page

**Solution:** 
- Ensure `index.html` is at repository root
- Deploy landing page with workflow or manually
- Check `gh-pages` branch has `index.html` at root

### Issue: App shows 404 or blank page

**Problem:** Assets not loading correctly

**Solution:**
- Check `base` path in build configuration matches deployment path
- For Vite: `--base=/AI/your-path/`
- For CRA: `"homepage": "/AI/your-path/"`

### Issue: Changes not deploying

**Problem:** Workflow not triggering

**Solution:**
- Check workflow file syntax
- Verify path filters in `detect-changes` job
- Manually trigger with "Run workflow" button in GitHub Actions

## 📝 Best Practices

1. **Path Consistency**: Always use `/AI/app-name/` format
2. **Keep Files**: Use `keep_files: true` to preserve other apps
3. **Test Locally**: Run `npm run build && npm run preview` before pushing
4. **Clean Builds**: Delete `build/` or `docs/` before rebuilding
5. **Branch Protection**: Never commit directly to `gh-pages` branch

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check existing deployment logs in Actions tab
- Review this guide and workflow configuration

---

**Last Updated:** March 2026  
**Maintained by:** nexageapps
