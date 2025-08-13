#!/bin/bash

# Image optimization script for The British Nanny website
# This script creates responsive image sizes using macOS sips tool

echo "Creating responsive image sizes..."

# Create directories for optimized images
mkdir -p assets/images/daycare-gallery/optimized
mkdir -p assets/images/book/optimized

# Function to resize image
resize_image() {
    local input="$1"
    local output="$2"
    local width="$3"
    local quality="${4:-85}"
    
    echo "Resizing: $input to $output (width: $width)"
    sips -Z "$width" "$input" --out "$output" --setProperty formatOptions "$quality"
}

# Optimize gallery images (displayed at 352x469)
# Create multiple sizes for responsive loading
for img in assets/images/daycare-gallery/gallery-{1,2,3}.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img" .jpg)
        
        # Mobile size (352px width)
        resize_image "$img" "assets/images/daycare-gallery/optimized/${filename}-mobile.jpg" 352 85
        
        # Tablet size (512px width)
        resize_image "$img" "assets/images/daycare-gallery/optimized/${filename}-tablet.jpg" 512 85
        
        # Desktop size (768px width)
        resize_image "$img" "assets/images/daycare-gallery/optimized/${filename}-desktop.jpg" 768 90
    fi
done

# Optimize book images
# child-on-potty.jpg displayed at 100x100
if [ -f "assets/images/book/child-on-potty.jpg" ]; then
    resize_image "assets/images/book/child-on-potty.jpg" "assets/images/book/optimized/child-on-potty-thumb.jpg" 200 85
fi

# book-cover.jpg - create responsive sizes
if [ -f "assets/images/book/book-cover.jpg" ]; then
    resize_image "assets/images/book/book-cover.jpg" "assets/images/book/optimized/book-cover-mobile.jpg" 250 85
    resize_image "assets/images/book/book-cover.jpg" "assets/images/book/optimized/book-cover-tablet.jpg" 350 90
fi

echo "Image optimization complete!"
echo ""
echo "Note: For WebP conversion (better compression), install cwebp:"
echo "brew install webp"
echo ""
echo "Then run: for img in assets/images/daycare-gallery/optimized/*.jpg; do cwebp -q 85 \"\$img\" -o \"\${img%.jpg}.webp\"; done"