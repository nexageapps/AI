#!/bin/bash

# Manual deployment script for Data Preprocessing Studio
# This script builds and deploys the app to gh-pages branch

set -e

echo "🚀 Starting deployment process..."

# Navigate to the app directory
cd "$(dirname "$0")"

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
PUBLIC_URL=/AI/compsci714/week3/data-preprocessing-studio npm run build

echo "📤 Deploying to gh-pages..."

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Checkout gh-pages branch
git checkout gh-pages

# Copy build files to the correct location
mkdir -p compsci714/week3/data-preprocessing-studio
cp -r build/* compsci714/week3/data-preprocessing-studio/

# Commit and push
git add compsci714/week3/data-preprocessing-studio
git commit -m "Deploy Data Preprocessing Studio - $(date '+%Y-%m-%d %H:%M:%S')"
git push origin gh-pages

# Return to original branch
git checkout "$CURRENT_BRANCH"

echo "✅ Deployment complete!"
echo "🌐 Your app will be available at: https://nexageapps.github.io/AI/compsci714/week3/data-preprocessing-studio"
