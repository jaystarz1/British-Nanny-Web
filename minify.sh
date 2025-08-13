#!/bin/bash

# Simple JavaScript minification script
# Removes comments, extra whitespace, and compresses the code

minify_js() {
    local input="$1"
    local output="$2"
    
    echo "Minifying $input to $output..."
    
    # Remove comments, extra whitespace, and compress
    cat "$input" | \
        sed 's|//.*$||g' | \
        sed 's|/\*[^*]*\*\+\([^/*][^*]*\*\+\)*\/||g' | \
        tr '\n' ' ' | \
        sed 's/  */ /g' | \
        sed 's/: /:/g' | \
        sed 's/; /;/g' | \
        sed 's/{ /{/g' | \
        sed 's/ }/}/g' | \
        sed 's/, /,/g' | \
        sed 's/ = /=/g' | \
        sed 's/ + /+/g' | \
        sed 's/ - /-/g' | \
        sed 's/ \* /*/g' | \
        sed 's/ \/ /\//g' | \
        sed 's/ > />/g' | \
        sed 's/ < /</g' | \
        sed 's/ >= />=/g' | \
        sed 's/ <= /<=/g' | \
        sed 's/ == /==/g' | \
        sed 's/ != /!=/g' | \
        sed 's/ && /&&/g' | \
        sed 's/ || /||/g' | \
        sed 's/ ? /?/g' > "$output"
    
    # Get file sizes
    original_size=$(ls -lh "$input" | awk '{print $5}')
    minified_size=$(ls -lh "$output" | awk '{print $5}')
    
    echo "✅ Minified: $original_size → $minified_size"
}

# Minify book.js
minify_js "assets/js/book.js" "assets/js/book.min.js"

# Also create proper minified versions of common.js and daycare.js if needed
# (The ones already created are properly minified)

echo "Minification complete!"