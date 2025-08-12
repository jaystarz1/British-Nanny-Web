#!/bin/bash

# Remove corrupted .git directory if it exists
rm -rf .git

# Initialize new git repository
git init

# Add GitHub remote
git remote add origin https://github.com/jaystarz1/british-nanny-website.git

# Add all files
git add .

# Create initial commit
git commit -m "Deploy The British Nanny's Daycare website"

# Create gh-pages branch (for GitHub Pages)
git branch -M main

# Push to GitHub
git push -u origin main --force

echo "Website deployed to GitHub!"
echo "Now configuring GitHub Pages..."
