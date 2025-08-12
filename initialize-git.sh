#!/bin/bash

# Initialize Git repository for The British Nanny's Daycare website
cd /Users/jaytarzwell/british-nanny-website

# Initialize git
git init

# Configure git
git config user.name "jaystarz1"
git config user.email "thebritishnanny@gmail.com"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Two-page website with NNEB explainer sections added"

# Add remote origin
git remote add origin https://github.com/jaystarz1/british-nanny-website.git

# Set main branch
git branch -M main

echo "Git repository initialized successfully!"
echo "Ready to push to GitHub with: git push -u origin main"
