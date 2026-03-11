# Deployment Guide - Blindfold Hill Game

## GitHub Pages Deployment

This project is configured to deploy to GitHub Pages with the build output in the `./docs` directory.

### Prerequisites

- GitHub repository with the project
- GitHub Pages enabled in repository settings

### Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `./docs` directory.

2. **Commit and push**:
   ```bash
   git add docs/
   git commit -m "Build for GitHub Pages deployment"
   git push origin main
   ```

3. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "Deploy from a branch"
   - Select branch: `main`
   - Select folder: `/docs`
   - Click "Save"

4. **Access your deployed site**:
   - URL format: `https://<username>.github.io/<repository>/compsci714/week2/blindfold-hill/`
   - GitHub will provide the exact URL in the Pages settings

### Configuration Details

The project is configured with:
- **Homepage**: `/compsci714/week2/blindfold-hill` (in package.json)
- **Build output**: `./docs` directory
- **Base URL**: Automatically handled by the homepage setting

### Updating the Deployment

To update the deployed version:
1. Make your changes
2. Run `npm run build`
3. Commit and push the updated `docs/` directory
4. GitHub Pages will automatically redeploy

### Local Testing

To test the production build locally:
```bash
npm install -g serve
serve -s docs -l 3000
```

Then open `http://localhost:3000/compsci714/week2/blindfold-hill/`

### Troubleshooting

**Issue**: Blank page after deployment
- **Solution**: Verify the `homepage` field in package.json matches your GitHub Pages URL structure

**Issue**: Assets not loading
- **Solution**: Ensure all asset paths are relative and the PUBLIC_URL is correctly set

**Issue**: 404 errors
- **Solution**: Check that GitHub Pages is configured to use the `/docs` folder from the main branch

## Alternative Deployment Options

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `docs`

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect React and configure build settings
3. Override output directory to `docs` if needed

## Notes

- The `docs/` directory should be committed to version control for GitHub Pages deployment
- The `.gitignore` file does NOT exclude the `docs/` directory (unlike typical React apps that ignore `build/`)
- Each build overwrites the previous `docs/` directory contents
