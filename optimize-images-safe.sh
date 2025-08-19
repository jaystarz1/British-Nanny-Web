#!/bin/bash

# Safe Image Optimization Script for British Nanny Website
# This script carefully optimizes images with multiple safety checks

echo "========================================="
echo "SAFE IMAGE OPTIMIZATION SCRIPT"
echo "========================================="
echo ""
echo "This script will:"
echo "1. Create a backup of all images"
echo "2. Optimize ONLY the 3 large gallery images (1MB+)"
echo "3. Resize to max 1600px width"
echo "4. Use 80% quality to maintain visual quality"
echo "5. Show before/after sizes"
echo ""
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Create timestamp for backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backup-images-$TIMESTAMP"

# Create backup
echo "Creating backup in $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"
cp -r assets/images/* "$BACKUP_DIR/"
echo "✓ Backup created"
echo ""

# Function to optimize a single image
optimize_image() {
    local img=$1
    local original_size=$(ls -lh "$img" | awk '{print $5}')
    
    echo "Processing: $img (Original: $original_size)"
    
    # Create temp file
    temp_file="${img}.tmp"
    
    # Optimize image
    magick "$img" -resize 1600x1600\> -quality 80 "$temp_file"
    
    if [ $? -eq 0 ]; then
        # Check if temp file exists and is not empty
        if [ -s "$temp_file" ]; then
            # Replace original with optimized
            mv "$temp_file" "$img"
            new_size=$(ls -lh "$img" | awk '{print $5}')
            echo "  ✓ Optimized to: $new_size"
        else
            echo "  ✗ Optimization failed - keeping original"
            rm -f "$temp_file"
        fi
    else
        echo "  ✗ Error during optimization - keeping original"
        rm -f "$temp_file"
    fi
    echo ""
}

# Only optimize the large gallery images
echo "Optimizing large gallery images..."
echo ""

# Gallery images 1, 2, and 3 are the problematic ones
optimize_image "assets/images/daycare-gallery/gallery-1.jpg"
optimize_image "assets/images/daycare-gallery/gallery-2.jpg"
optimize_image "assets/images/daycare-gallery/gallery-3.jpg"

echo "========================================="
echo "OPTIMIZATION COMPLETE"
echo "========================================="
echo ""
echo "Backup saved in: $BACKUP_DIR"
echo ""
echo "Size comparison:"
du -sh "$BACKUP_DIR/daycare-gallery" | awk '{print "Original gallery: " $1}'
du -sh "assets/images/daycare-gallery" | awk '{print "Optimized gallery: " $1}'
echo ""
echo "If images look wrong, restore with:"
echo "  rm -rf assets/images && mv $BACKUP_DIR assets/images"
echo ""