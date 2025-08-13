#!/bin/bash
cd /Users/jaytarzwell/british-nanny-website

echo "Removing old remote configuration..."
git remote remove origin 2>/dev/null

echo "Adding correct repository remote: British-Nanny-Web"
git remote add origin https://github.com/jaystarz1/British-Nanny-Web.git

echo -e "\nVerifying remote is set correctly:"
git remote -v

echo -e "\nPushing your files to GitHub..."
echo "Note: Enter your GitHub username and Personal Access Token when prompted"
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo -e "\n✅ Successfully pushed to GitHub!"
    echo "Check your files at: https://github.com/jaystarz1/British-Nanny-Web"
    echo -e "\nNext steps:"
    echo "1. Go to Settings > Pages in your repository"
    echo "2. Set Source to 'Deploy from branch'"
    echo "3. Select 'main' branch and '/ (root)' folder"
    echo "4. Add custom domain: thebritishnanny.ca"
else
    echo -e "\n❌ Push failed. Make sure you have a Personal Access Token"
fi
