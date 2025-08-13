#!/bin/bash
cd /Users/jaytarzwell/british-nanny-website

# Check remote configuration
echo "Current remotes:"
git remote -v

# Check current branch
echo -e "\nCurrent branch:"
git branch

# Show what will be pushed
echo -e "\nFiles in the commit:"
git ls-tree --name-only -r HEAD
