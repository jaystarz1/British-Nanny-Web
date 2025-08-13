#!/bin/bash
cd /Users/jaytarzwell/british-nanny-website

echo "Checking current git status..."
git status

echo -e "\nChecking remote configuration..."
git remote -v

echo -e "\nRemoving and re-adding remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/jaystarz1/british-nanny-website.git

echo -e "\nAttempting to push to GitHub..."
echo "Note: You may need to enter your GitHub username and Personal Access Token"
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo -e "\n✅ Successfully pushed to GitHub!"
    echo "Your site should be visible at: https://github.com/jaystarz1/british-nanny-website"
else
    echo -e "\n❌ Push failed. Trying alternative approach..."
    echo "Attempting with set-upstream..."
    git push --set-upstream origin main --force
fi
