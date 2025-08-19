#!/bin/bash

# Safe CSS Minification Script for British Nanny Website
# This script carefully minifies CSS files with multiple safety checks

echo "========================================="
echo "SAFE CSS MINIFICATION SCRIPT"
echo "========================================="
echo ""
echo "This script will:"
echo "1. Create a backup of all CSS files"
echo "2. Minify each CSS file"
echo "3. Keep original files with .original.css extension"
echo "4. Show before/after sizes"
echo ""
echo "IMPORTANT: Test the site thoroughly after running!"
echo ""
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Check if cssnano is installed
if ! command -v cssnano &> /dev/null; then
    echo "cssnano not found. Installing..."
    npm install -g cssnano-cli
fi

# Create timestamp for backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backup-css-$TIMESTAMP"

# Create backup
echo "Creating backup in $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"
cp -r assets/css/* "$BACKUP_DIR/"
echo "✓ Backup created"
echo ""

# Function to minify a single CSS file
minify_css() {
    local file=$1
    local filename=$(basename "$file")
    local original_size=$(ls -lh "$file" | awk '{print $5}')
    
    # Skip already minified files and backups
    if [[ "$filename" == *.min.css ]] || [[ "$filename" == *.original.css ]] || [[ "$filename" == *-backup.css ]]; then
        return
    fi
    
    echo "Processing: $filename (Original: $original_size)"
    
    # Create backup with .original.css extension
    cp "$file" "${file%.css}.original.css"
    
    # Create temp minified file
    temp_file="${file}.tmp"
    
    # Minify CSS
    cssnano "$file" "$temp_file"
    
    if [ $? -eq 0 ]; then
        # Check if temp file exists and is not empty
        if [ -s "$temp_file" ]; then
            # Replace original with minified
            mv "$temp_file" "$file"
            new_size=$(ls -lh "$file" | awk '{print $5}')
            echo "  ✓ Minified to: $new_size"
        else
            echo "  ✗ Minification failed - keeping original"
            rm -f "$temp_file"
            rm -f "${file%.css}.original.css"
        fi
    else
        echo "  ✗ Error during minification - keeping original"
        rm -f "$temp_file"
        rm -f "${file%.css}.original.css"
    fi
    echo ""
}

echo "Minifying CSS files..."
echo ""

# Minify main CSS files
minify_css "assets/css/style.css"
minify_css "assets/css/daycare.css"
minify_css "assets/css/book.css"
minify_css "assets/css/resources.css"
minify_css "assets/css/navigation.css"

echo "========================================="
echo "MINIFICATION COMPLETE"
echo "========================================="
echo ""
echo "Backup saved in: $BACKUP_DIR"
echo ""
echo "Size comparison:"
du -sh "$BACKUP_DIR" | awk '{print "Original CSS: " $1}'
du -sh "assets/css" | awk '{print "Current CSS: " $1}'
echo ""
echo "TEST THE SITE THOROUGHLY!"
echo ""
echo "If styles are broken, restore with:"
echo "  rm -rf assets/css && mv $BACKUP_DIR assets/css"
echo ""
echo "Or restore individual files:"
echo "  cp assets/css/[filename].original.css assets/css/[filename].css"
echo ""