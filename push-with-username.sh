#!/bin/bash
cd /Users/jaytarzwell/british-nanny-website

echo "Setting up repository with your username..."
git remote remove origin 2>/dev/null
git remote add origin https://jaystarz1@github.com/jaystarz1/british-nanny-website.git

echo -e "\nCurrent remotes:"
git remote -v

echo -e "\nPushing to GitHub (you'll only need to enter your Personal Access Token as password)..."
git push -u origin main --force

echo -e "\nIf successful, check: https://github.com/jaystarz1/british-nanny-website"
