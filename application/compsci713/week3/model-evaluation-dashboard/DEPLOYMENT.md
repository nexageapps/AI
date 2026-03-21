# Deployment Guide

## GitHub Pages Deployment

This application is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

The application automatically deploys when:
1. Changes are pushed to the `main` branch
2. Changes are made to files in `application/compsci713/week3/model-evaluation-dashboard/`

### Manual Deployment

To deploy manually:

```bash
# Build the application
npm run build

# The build folder contains production-ready files
# These are automatically deployed by GitHub Actions
```

### GitHub Actions Workflow

The deployment is handled by `.github/workflows/deploy.yml`:

```yaml
- name: Build Week 3 App
  run: |
    cd application/compsci713/week3/model-evaluation-dashboard
    npm ci
    npm run build
    
- name: Deploy Week 3 to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./application/compsci713/week3/model-evaluation-dashboard/build
    destination_dir: week3
```

### Access the Deployed Application

Once deployed, access at:
```
https://[your-username].github.io/AI/week3/
```

### Local Testing

Test the production build locally:

```bash
# Build the app
npm run build

# Serve the build folder
npx serve -s build
```

### Troubleshooting

**Build Fails:**
- Check Node.js version (requires v14+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for syntax errors: `npm run build`

**Deployment Fails:**
- Verify GitHub Pages is enabled in repository settings
- Check GitHub Actions permissions
- Review workflow logs in Actions tab

**App Not Loading:**
- Check browser console for errors
- Verify correct URL path
- Clear browser cache

### Environment Variables

For production deployment with custom settings:

```bash
# Create .env.production file
REACT_APP_API_URL=your_api_url
PUBLIC_URL=/AI/week3
```

### Performance Optimization

The production build includes:
- Minified JavaScript and CSS
- Optimized images
- Code splitting
- Service worker for caching (optional)

### Monitoring

Monitor deployment status:
1. Go to repository Actions tab
2. Check latest workflow run
3. Review build and deployment logs

---

**Last Updated:** 2024
**Maintained by:** COMPSCI 713 Team
