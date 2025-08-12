# British Nanny Website - Image Integration Plan

## Images Available from Book:

1. **Book Cover** - `British Nanny's Guide Template-2.jpg`
   - Beautiful cover with Union Jack design and happy child on potty
   - Use on: Book landing page hero, daycare page book callout
   - Website location: `assets/images/book/book-cover.jpg`

2. **Book Back Cover** - `IMG_9079.jpeg` 
   - Contains book summary and description
   - Use on: Book landing page for detail/preview
   - Website location: `assets/images/book/book-back-cover.jpg`

3. **Child on Potty** - `Image 2.jpg`
   - Simple, clean illustration of child on potty
   - Use on: Both pages as section dividers or icons
   - Website location: `assets/images/book/child-on-potty.jpg`

4. **Outdoor Potty Scene** - `Image.jpg`
   - Child using potty in outdoor playhouse with caregiver
   - Perfect for daycare page to show outdoor activities
   - Website location: `assets/images/book/outdoor-potty-scene.jpg`

5. **Union Jack Flag** - `Image 11.jpg`
   - Clean British flag for branding elements
   - Use on: Both pages for British theme accents
   - Website location: `assets/images/branding/union-jack.jpg`

## Image Usage Strategy:

### Daycare Page (index.html):
- **Hero Section**: Add outdoor potty scene as background or side image
- **About Section**: Book cover thumbnail in the book callout
- **Services Section**: Child on potty icon for potty training service
- **Header/Footer**: Small Union Jack accents for British branding

### Book Landing Page (potty-training-book.html):
- **Hero Section**: Large book cover image (main focal point)
- **Content Sections**: Book back cover for "what's inside" preview
- **Author Section**: Author photo placeholder (when available)
- **Background Elements**: Subtle Union Jack accents

## Implementation Steps:

1. **Copy Images** (Manual step required):
   ```bash
   # Run the copy-images.sh script or manually copy:
   cp "/Users/jaytarzwell/Desktop/British Nanny/British Nanny's Guide Template-2.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/book-cover.jpg"
   cp "/Users/jaytarzwell/Desktop/British Nanny/IMG_9079.jpeg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/book-back-cover.jpg"
   cp "/Users/jaytarzwell/Desktop/British Nanny/Image 2.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/child-on-potty.jpg"
   cp "/Users/jaytarzwell/Desktop/British Nanny/Image.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/book/outdoor-potty-scene.jpg"
   cp "/Users/jaytarzwell/Desktop/British Nanny/Image 11.jpg" "/Users/jaytarzwell/british-nanny-website/assets/images/branding/union-jack.jpg"
   ```

2. **Update HTML files** (Done below)

3. **Optimize for web** (Optional):
   - Compress images for faster loading
   - Create responsive sizes
   - Add proper alt tags for SEO

## SEO Benefits:
- Authentic book cover increases trust and conversion
- Real images from book provide credibility
- Outdoor scene shows actual daycare methodology
- British branding reinforces unique positioning
- Alt tags with keywords boost search rankings

## Performance Considerations:
- Optimize image sizes for web (recommend <500KB each)
- Use WebP format if possible for better compression
- Implement lazy loading for below-fold images
- Ensure mobile responsiveness

