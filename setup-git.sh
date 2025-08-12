#!/bin/bash

# Initialize Git repository for The British Nanny's Website
cd /Users/jaytarzwell/british-nanny-website

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit - The British Nanny's Daycare two-page website"

# Add remote origin (you'll need to create the repository on GitHub first)
# git remote add origin https://github.com/jaystarz1/british-nanny-website.git

# Push to GitHub (after creating the repository)
# git push -u origin main

echo "Git repository initialized successfully!"
echo "Next steps:"
echo "1. Create a new repository on GitHub called 'british-nanny-website'"
echo "2. Make it PUBLIC"
echo "3. Run: git remote add origin https://github.com/jaystarz1/british-nanny-website.git"
echo "4. Run: git push -u origin main"
echo "5. Go to repository Settings > Pages"
echo "6. Set Source to 'Deploy from a branch'"
echo "7. Set Branch to 'main' and folder to '/ (root)'"
echo "8. Your site will be live at thebritishnanny.ca"