# 🚀 Wumpus World - Deployment Instructions

## Quick Deploy

### Option 1: Automatic (GitHub Actions)
Simply push to the `main` branch:
```bash
git add .
git commit -m "Deploy Wumpus World"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy to:
**https://nexageapps.github.io/AI/wumpus**

### Option 2: Manual Deploy
From the wumpus directory:
```bash
npm run deploy
```

## First-Time Setup Checklist

- [x] Added `homepage` to package.json
- [x] Added `gh-pages` dependency
- [x] Added deploy scripts to package.json
- [x] Created GitHub Actions workflow
- [x] Updated .gitignore to exclude node_modules

## Verify Deployment

1. Wait 2-3 minutes after push
2. Visit: https://nexageapps.github.io/AI/wumpus
3. Check browser console for errors
4. Test all game features

## Troubleshooting

**404 Error:**
- Check GitHub Pages settings (Settings → Pages)
- Ensure `gh-pages` branch exists
- Verify homepage URL in package.json

**Blank Page:**
- Check browser console for errors
- Verify build completed successfully
- Check that all assets loaded correctly

**Build Fails:**
- Run `npm run build` locally first
- Check for syntax errors in code
- Verify all dependencies are installed

## Repository Settings

Go to: https://github.com/nexageapps/AI/settings/pages

Ensure:
- Source: Deploy from a branch
- Branch: gh-pages / (root)
- Custom domain: (leave empty)

## Next Steps

To deploy additional applications, see: `application/compsci713/DEPLOYMENT.md`
