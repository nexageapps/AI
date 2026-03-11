#!/bin/bash

# Quick script to deploy the landing page to GitHub Pages
# This will update the root index.html without affecting the games

echo "🚀 Deploying landing page to GitHub Pages..."

# Check if gh-pages npm package is installed
if ! command -v gh-pages &> /dev/null; then
    echo "📦 Installing gh-pages..."
    npm install -g gh-pages
fi

# Create temporary directory
mkdir -p .deploy-temp
cp index.html .deploy-temp/

# Deploy to root of gh-pages branch
echo "📤 Deploying to gh-pages branch..."
npx gh-pages -d .deploy-temp -m "Update landing page" --dotfiles

# Cleanup
rm -rf .deploy-temp

echo "✅ Landing page deployed successfully!"
echo "🌐 Visit: https://nexageapps.github.io/AI/"
echo ""
echo "Note: It may take a few minutes for GitHub Pages to update."
