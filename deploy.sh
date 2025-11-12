#!/bin/bash

# Deploy to GitHub Pages Script
echo "🔨 Building production version..."
npm run build

echo "📦 Updating docs folder..."
rm -rf docs
cp -r dist docs

echo "📝 Committing changes..."
git add docs/
git commit -m "Deploy updates to GitHub Pages"

echo "🚀 Pushing to GitHub..."
git push

echo "✅ Deployment complete!"
echo "🌐 View at: https://sliu44artcenter.github.io/StoryInteract1/"
echo "⏳ Wait 1-2 minutes for GitHub to rebuild the site"
