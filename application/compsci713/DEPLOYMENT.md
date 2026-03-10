# 🚀 Deployment Guide for COMPSCI 713 Applications

This guide explains how to deploy React applications to GitHub Pages.

## Current Deployments

- **Wumpus World**: https://nexageapps.github.io/AI/wumpus

## How It Works

The repository uses GitHub Actions to automatically deploy applications when changes are pushed to the `main` branch. Each app is deployed to its own subdirectory under the GitHub Pages site.

### Deployment Structure

```
https://nexageapps.github.io/AI/
├── wumpus/          # Wumpus World game
├── game2/           # Future game 2
└── game3/           # Future game 3
```

## Adding a New Application

To add a new React application for deployment:

### 1. Configure package.json

Add the following to your app's `package.json`:

```json
{
  "homepage": "https://nexageapps.github.io/AI/your-app-name",
  "dependencies": {
    "gh-pages": "^6.1.1"
  },
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 2. Update GitHub Actions Workflow

Edit `.github/workflows/deploy-apps.yml` and add:

**In the `detect-changes` job outputs:**
```yaml
outputs:
  wumpus: ${{ steps.filter.outputs.wumpus }}
  your-app: ${{ steps.filter.outputs.your-app }}  # Add this
```

**In the `filters` section:**
```yaml
filters: |
  wumpus:
    - 'application/compsci713/week2/wumpus/**'
  your-app:
    - 'application/path/to/your-app/**'  # Add this
```

**Add a new deployment job:**
```yaml
deploy-your-app:
  needs: detect-changes
  if: needs.detect-changes.outputs.your-app == 'true' || github.event_name == 'workflow_dispatch'
  runs-on: ubuntu-latest
  
  steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: application/path/to/your-app/package-lock.json
    
    - name: Install dependencies
      working-directory: application/path/to/your-app
      run: npm ci
    
    - name: Build
      working-directory: application/path/to/your-app
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./application/path/to/your-app/build
        destination_dir: your-app-name
        keep_files: true
```

### 3. Manual Deployment

You can also deploy manually from your local machine:

```bash
cd application/path/to/your-app
npm install
npm run deploy
```

## GitHub Pages Setup

Make sure GitHub Pages is enabled in your repository settings:

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **root**
4. Save

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally
- Check the Actions tab for detailed error logs

### 404 on Deployed Site
- Verify the `homepage` field in `package.json` matches the deployment URL
- Check that GitHub Pages is enabled and using the `gh-pages` branch
- Wait a few minutes for DNS propagation

### Routing Issues (React Router)
If using React Router, add a `404.html` that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/AI'">
  </head>
</html>
```

## Best Practices

1. **Test locally first**: Always run `npm run build` locally before pushing
2. **Keep files small**: Optimize images and assets
3. **Use environment variables**: For API keys and configuration
4. **Version your apps**: Update version in `package.json` for each release
5. **Document changes**: Update README.md with new features

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)
