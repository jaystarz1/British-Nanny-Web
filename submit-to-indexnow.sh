#!/bin/bash

# IndexNow Submission Script for thebritishnanny.ca
# This submits URLs to Bing and Yandex for instant indexing

echo "========================================="
echo "IndexNow URL Submission"
echo "========================================="
echo ""
echo "This will submit your URLs to Bing for instant indexing."
echo "You'll need your Bing IndexNow API key."
echo ""
echo "To get your API key:"
echo "1. Go to Bing Webmaster Tools"
echo "2. Click on 'Settings' → 'API Access' → 'IndexNow'"
echo "3. Generate and copy your API key"
echo ""
read -p "Enter your IndexNow API key: " API_KEY

if [ -z "$API_KEY" ]; then
    echo "No API key provided. Exiting."
    exit 1
fi

# Create the key file (required by IndexNow)
echo "$API_KEY" > "${API_KEY}.txt"

# URLs to submit
URLS=(
    "https://thebritishnanny.ca/"
    "https://thebritishnanny.ca/potty-training-book.html"
    "https://thebritishnanny.ca/resources/parent-resources.html"
    "https://thebritishnanny.ca/resources/choosing-daycare-ottawa.html"
    "https://thebritishnanny.ca/resources/daycare-interview-questions.html"
    "https://thebritishnanny.ca/resources/potty-training-guide.html"
    "https://thebritishnanny.ca/resources/preparing-for-daycare.html"
    "https://thebritishnanny.ca/resources/daycare-food-allergies-guide.html"
)

echo ""
echo "Submitting ${#URLS[@]} URLs to IndexNow..."
echo ""

for url in "${URLS[@]}"; do
    echo "Submitting: $url"
    
    # Submit to Bing IndexNow endpoint
    response=$(curl -s -X POST "https://www.bing.com/indexnow" \
        -H "Content-Type: application/json" \
        -d "{
            \"host\": \"thebritishnanny.ca\",
            \"key\": \"$API_KEY\",
            \"keyLocation\": \"https://thebritishnanny.ca/${API_KEY}.txt\",
            \"urlList\": [\"$url\"]
        }")
    
    if [ $? -eq 0 ]; then
        echo "  ✓ Submitted successfully"
    else
        echo "  ✗ Failed to submit"
    fi
    
    # Small delay between requests
    sleep 1
done

echo ""
echo "========================================="
echo "SUBMISSION COMPLETE"
echo "========================================="
echo ""
echo "IMPORTANT:"
echo "1. Upload ${API_KEY}.txt to your website root"
echo "   (This file contains just your API key)"
echo ""
echo "2. The file must be accessible at:"
echo "   https://thebritishnanny.ca/${API_KEY}.txt"
echo ""
echo "3. Check Bing Webmaster Tools in a few minutes"
echo "   to verify submission success"
echo ""