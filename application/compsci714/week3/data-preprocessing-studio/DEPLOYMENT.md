# 🚀 Deployment Guide

## Issue: GitHub Pages Deployment Blocked

The error "Branch 'main' is not allowed to deploy to github-pages due to environment protection rules" occurs when GitHub repository settings restrict which branches can deploy.

## Solutions

### Option 1: Fix GitHub Repository Settings (Recommended)

1. Go to your repository: `https://github.com/nexageapps/AI`
2. Click **Settings** (top right)
3. Click **Environments** (left sidebar)
4. Click **github-pages**
5. Under "Deployment branches":
   - Change from "Selected branches" to **"All branches"**
   - OR add `main` to the allowed branches list
6. Click **Save protection rules**
7. Re-run the failed GitHub Action

### Option 2: Use Alternative Workflow

I've created an alternative workflow that uses a different deployment method:

**File**: `.github/workflows/deploy-preprocessing-studio-alternative.yml`

This workflow:
- Uses `peaceiris/actions-gh-pages` action
- Deploys directly to gh-pages branch
- Doesn't require environment protection changes
- Works with branch protection rules

To use it:
1. Rename or delete the original workflow:
   ```bash
   mv .github/workflows/deploy-preprocessing-studio.yml .github/workflows/deploy-preprocessing-studio.yml.backup
   mv .github/workflows/deploy-preprocessing-studio-alternative.yml .github/workflows/deploy-preprocessing-studio.yml
   ```

2. Commit and push:
   ```bash
   git add .github/workflows/
   git commit -m "Update deployment workflow"
   git push
   ```

### Option 3: Manual Deployment Script

Use the provided deployment script for manual deployments:

```bash
cd application/compsci714/week3/data-preprocessing-studio
./deploy.sh
```

This script:
- Builds the application
- Switches to gh-pages branch
- Copies build files
- Commits and pushes
- Returns to your original branch

### Option 4: Deploy from Local Machine

```bash
# 1. Build the app
cd application/compsci714/week3/data-preprocessing-studio
npm install
PUBLIC_URL=/AI/compsci714/week3/data-preprocessing-studio npm run build

# 2. Switch to gh-pages branch
git checkout gh-pages

# 3. Copy build files
mkdir -p compsci714/week3/data-preprocessing-studio
cp -r build/* compsci714/week3/data-preprocessing-studio/

# 4. Commit and push
git add compsci714/week3/data-preprocessing-studio
git commit -m "Deploy Data Preprocessing Studio"
git push origin gh-pages

# 5. Return to main branch
git checkout main
```

## Recommended Approach

**For this specific case**, I recommend:

1. **Immediate fix**: Use Option 1 (fix GitHub settings)
2. **Long-term**: Keep the alternative workflow as backup

## Verifying Deployment

After deployment, check:
- GitHub Actions tab: All workflows should pass ✅
- Live URL: https://nexageapps.github.io/AI/compsci714/week3/data-preprocessing-studio

## Troubleshooting

### Error: "Permission denied"
- Check repository permissions
- Ensure GITHUB_TOKEN has write access
- Verify branch protection rules

### Error: "Build failed"
- Check Node.js version (should be 18)
- Verify package.json dependencies
- Check build logs for specific errors

### Error: "Pages not updating"
- Clear browser cache
- Wait 2-3 minutes for GitHub Pages to update
- Check GitHub Pages settings (Settings → Pages)

## GitHub Pages Settings

Ensure these settings are correct:

1. **Settings → Pages**
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. **Settings → Environments → github-pages**
   - Deployment branches: All branches (or include main)

3. **Settings → Actions → General**
   - Workflow permissions: Read and write permissions
   - Allow GitHub Actions to create and approve pull requests: ✅

## Quick Commands

```bash
# Check current branch
git branch

# Check deployment status
git log gh-pages --oneline -5

# View GitHub Actions logs
# Go to: https://github.com/nexageapps/AI/actions

# Manual deployment
cd application/compsci714/week3/data-preprocessing-studio
./deploy.sh
```

## Support

If issues persist:
1. Check GitHub Actions logs
2. Verify repository settings
3. Try manual deployment
4. Contact repository admin for permissions

---

**Status**: Deployment scripts ready
**Recommended**: Fix GitHub settings (Option 1)
**Alternative**: Use manual deployment script
