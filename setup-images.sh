#!/bin/bash

echo "🎨 COPYING BOOK IMAGES TO WEBSITE..."
echo "====================================="

# Create destination directories
echo "Creating image directories..."
mkdir -p "/Users/jaytarzwell/british-nanny-website/assets/images/book"
mkdir -p "/Users/jaytarzwell/british-nanny-website/assets/images/branding"

# Copy and rename images for web
echo "Copying book cover..."
cp "/Users/jaytarzwell/Desktop/British Nanny/British Nanny's Guide Template-2.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/book-cover.jpg"

echo "Copying book back cover..."
cp "/Users/jaytarzwell/Desktop/British Nanny/IMG_9079.jpeg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/book-back-cover.jpg"

echo "Copying child on potty illustration..."
cp "/Users/jaytarzwell/Desktop/British Nanny/Image 2.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/child-on-potty.jpg"

echo "Copying outdoor potty scene..."
cp "/Users/jaytarzwell/Desktop/British Nanny/Image.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/outdoor-potty-scene.jpg"

echo "Copying Union Jack flag..."
cp "/Users/jaytarzwell/Desktop/British Nanny/Image 11.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/branding/union-jack.jpg"

# Check if files were copied successfully
echo ""
echo "✅ VERIFICATION:"
if [ -f "/Users/jaytarzwell/british-nanny-website/assets/images/book/book-cover.jpg" ]; then
    echo "✓ Book cover copied successfully"
else
    echo "✗ Book cover failed to copy"
fi

if [ -f "/Users/jaytarzwell/british-nanny-website/assets/images/book/book-back-cover.jpg" ]; then
    echo "✓ Book back cover copied successfully"
else
    echo "✗ Book back cover failed to copy"
fi

if [ -f "/Users/jaytarzwell/british-nanny-website/assets/images/book/child-on-potty.jpg" ]; then
    echo "✓ Child on potty image copied successfully"
else
    echo "✗ Child on potty image failed to copy"
fi

if [ -f "/Users/jaytarzwell/british-nanny-website/assets/images/book/outdoor-potty-scene.jpg" ]; then
    echo "✓ Outdoor scene copied successfully"
else
    echo "✗ Outdoor scene failed to copy"
fi

if [ -f "/Users/jaytarzwell/british-nanny-website/assets/images/branding/union-jack.jpg" ]; then
    echo "✓ Union Jack flag copied successfully"
else
    echo "✗ Union Jack flag failed to copy"
fi

echo ""
echo "📁 WEBSITE IMAGE STRUCTURE:"
echo "assets/images/"
echo "├── book/"
echo "│   ├── book-cover.jpg (Hero image for book page)"
echo "│   ├── book-back-cover.jpg (Book summary/details)"
echo "│   ├── child-on-potty.jpg (Service illustration)"
echo "│   └── outdoor-potty-scene.jpg (Daycare methodology)"
echo "└── branding/"
echo "    └── union-jack.jpg (British theme elements)"

echo ""
echo "🎯 NEXT STEPS:"
echo "1. The website HTML has been updated to reference these images"
echo "2. CSS styles have been added for proper display"
echo "3. Test the website locally to see the images"
echo "4. Optional: Optimize images for web (compress/resize)"
echo "5. Commit and deploy to GitHub Pages"

echo ""
echo "🚀 TO VIEW YOUR WEBSITE:"
echo "1. cd /Users/jaytarzwell/british-nanny-website"
echo "2. python3 -m http.server 8000"
echo "3. Open: http://localhost:8000"

echo ""
echo "📸 IMAGE INTEGRATION COMPLETE!"
