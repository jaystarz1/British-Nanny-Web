#!/bin/bash

# Google Analytics 4 Installation Script for thebritishnanny.ca
# This script adds GA4 tracking code to all HTML pages

echo "========================================="
echo "Google Analytics 4 Installation"
echo "========================================="
echo ""
echo "This script will add Google Analytics tracking to all your HTML pages."
echo ""
echo "First, you need to get your Measurement ID from Google Analytics:"
echo "1. Go to https://analytics.google.com"
echo "2. Create a new property for thebritishnanny.ca"
echo "3. Get your Measurement ID (looks like G-XXXXXXXXXX)"
echo ""
read -p "Enter your GA4 Measurement ID (e.g., G-XXXXXXXXXX): " GA_ID

# Validate the ID format
if [[ ! $GA_ID =~ ^G-[A-Z0-9]{10}$ ]]; then
    echo ""
    echo "❌ Invalid Measurement ID format."
    echo "It should look like: G-XXXXXXXXXX (G- followed by 10 characters)"
    echo ""
    exit 1
fi

echo ""
echo "Using Measurement ID: $GA_ID"
echo ""

# Create the GA4 tracking code
GA_CODE="<!-- Google Analytics -->
<script async src=\"https://www.googletagmanager.com/gtag/js?id=$GA_ID\"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '$GA_ID');
</script>
<!-- End Google Analytics -->"

# Create a temporary file with the GA code
TEMP_FILE=$(mktemp)
echo "$GA_CODE" > "$TEMP_FILE"

# Function to add GA to a single HTML file
add_ga_to_file() {
    local file=$1
    local filename=$(basename "$file")
    
    # Skip template files and Google verification
    if [[ "$filename" == *"template"* ]] || [[ "$filename" == "google"* ]] || [[ "$filename" == ".old"* ]]; then
        return
    fi
    
    # Check if GA is already added
    if grep -q "Google Analytics" "$file" 2>/dev/null; then
        echo "  ⚠️  Skipping $file (already has Google Analytics)"
        return
    fi
    
    # Check if file has a </head> tag
    if ! grep -q "</head>" "$file" 2>/dev/null; then
        echo "  ⚠️  Skipping $file (no </head> tag found)"
        return
    fi
    
    echo "  ✓ Adding GA to: $file"
    
    # Create backup
    cp "$file" "$file.ga-backup"
    
    # Add GA code before </head> tag
    awk -v ga="$GA_CODE" '
    {
        if (/<\/head>/) {
            print ga
        }
        print
    }
    ' "$file.ga-backup" > "$file"
}

echo "Adding Google Analytics to HTML files..."
echo ""

# Process main files
add_ga_to_file "index.html"
add_ga_to_file "potty-training-book.html"

# Process resource files
for file in resources/*.html; do
    if [ -f "$file" ]; then
        add_ga_to_file "$file"
    fi
done

# Clean up
rm -f "$TEMP_FILE"

echo ""
echo "========================================="
echo "INSTALLATION COMPLETE"
echo "========================================="
echo ""
echo "✅ Google Analytics has been added to your HTML pages"
echo ""
echo "NEXT STEPS:"
echo "1. Test your website in a browser"
echo "2. Go to Google Analytics > Reports > Real-time"
echo "3. You should see yourself as an active user"
echo ""
echo "BACKUP FILES:"
echo "Backup files created with .ga-backup extension"
echo "To restore: mv [filename].ga-backup [filename]"
echo ""
echo "MEASUREMENT ID: $GA_ID"
echo "Save this ID for future reference!"
echo ""

# Create a record of the installation
echo "$GA_ID" > .ga-measurement-id
echo "Measurement ID saved to .ga-measurement-id"