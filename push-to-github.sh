#!/bin/bash
cd /Users/jaytarzwell/british-nanny-website

# Remove old remote if it exists
git remote remove origin 2>/dev/null

# Add the correct remote
git remote add origin https://github.com/jaystarz1/british-nanny-website.git

# Verify remote is added
echo "Remote repository configured:"
git remote -v

# Push to GitHub (you'll need to enter your GitHub username and password/token)
echo -e "\nPushing to GitHub..."
echo "You'll need to enter your GitHub credentials:"
git push -u origin main

echo -e "\n✅ If successful, your files are now on GitHub!"
echo "Next: Go to Settings > Pages in your GitHub repository to enable GitHub Pages"
