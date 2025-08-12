# The British Nanny's Website - Complete Style Guide

## Table of Contents
1. [Brand Foundation](#brand-foundation)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Layout System](#layout-system)
5. [Component Library](#component-library)
6. [Content Patterns](#content-patterns)
7. [Accessibility Standards](#accessibility-standards)
8. [Performance Guidelines](#performance-guidelines)
9. [Resource Page Specific Guidelines](#resource-page-specific-guidelines)

---

## Brand Foundation

### Brand Personality
- **Professional yet Warm**: Conveying expertise with a friendly, approachable tone
- **British Heritage**: Subtle British elements without being kitsch or overdone
- **Trust & Authority**: 40+ years of experience should feel evident in design quality
- **Accessible & Inclusive**: Welcoming to all parents, grandparents, and caregivers

### Design Principles
1. **Clarity First**: Information should be immediately understandable
2. **Mobile-First**: All designs start with mobile and scale up
3. **Consistent but Flexible**: Unified look with room for page-specific needs
4. **Performance Optimized**: Fast loading is non-negotiable
5. **Accessibility by Default**: WCAG AA compliant minimum

---

## Color System

### Primary Colors
```css
--british-navy: #012169;    /* Primary brand color - headings, CTAs */
--british-red: #CF142B;     /* Accent color - highlights, important CTAs */
--white: #FFFFFF;           /* Base background */
```

### Secondary Colors
```css
--warm-cream: #FFF8F3;      /* Soft background for alternating sections */
--soft-blue: #E8F2FF;       /* Light accent background */
--tan-beige: #F5E6D3;       /* Warm background for CTAs and highlights */
```

### Text Colors
```css
--dark-text: #2C3E50;       /* Primary body text */
--medium-gray: #6C757D;     /* Secondary text, captions */
--light-gray: #F8F9FA;      /* Subtle backgrounds */
```

### Functional Colors
```css
--success-green: #28A745;   /* Success states, checkmarks */
--warning-yellow: #FFC107;  /* Warnings, important notes */
--danger-red: #DC3545;      /* Errors, critical warnings */
--accent-gold: #FFD700;     /* Star ratings, special highlights */
```

### Color Usage Rules

#### Background Patterns
- **White**: Primary content sections
- **Warm Cream**: Alternating sections, FAQ areas, soft CTAs
- **Soft Blue**: Feature sections, connection boxes, testimonials background
- **Tan Beige**: Major CTA sections, resource highlights
- **Navy Gradient**: Hero sections, footer, high-impact areas

#### Text on Backgrounds
- **On White**: Use `--dark-text` for body, `--british-navy` for headings
- **On Cream/Tan**: Use `--dark-text` with increased weight for better contrast
- **On Blue**: Use `--dark-text` or `--british-navy` for optimal contrast
- **On Navy**: Use `#FFFFFF` for all text with opacity variations for hierarchy

---

## Typography

### Font Stack
```css
/* Headings */
--font-heading: 'Merriweather', Georgia, serif;

/* Body Text */
--font-body: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale (Mobile First)

#### Mobile (< 768px)
```css
h1: 1.75rem (28px)
h2: 1.5rem (24px)
h3: 1.25rem (20px)
h4: 1.125rem (18px)
body: 1rem (16px)
small: 0.875rem (14px)
```

#### Tablet (768px - 1023px)
```css
h1: 2.25rem (36px)
h2: 1.875rem (30px)
h3: 1.5rem (24px)
h4: 1.25rem (20px)
body: 1rem (16px)
```

#### Desktop (≥ 1024px)
```css
h1: 3rem (48px)
h2: 2.25rem (36px)
h3: 1.875rem (30px)
h4: 1.5rem (24px)
body: 1.0625rem (17px)
```

### Typography Rules

#### Line Height
- Headings: `1.2`
- Body text: `1.6` (comfortable reading)
- Long-form content: `1.7-1.8` (resource pages)

#### Font Weight
- Regular: `400` (body text)
- Semibold: `600` (emphasis, links)
- Bold: `700` (headings, CTAs)

#### Text Alignment
- **Mobile**: Center-aligned headings, left-aligned body
- **Desktop**: Flexible based on context
- **Resource Pages**: Always left-aligned body text

#### Maximum Line Length
- Body text: `65ch` (optimal reading)
- Wide screens: Constrain with max-width containers

---

## Layout System

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1200px;
--container-content: 900px; /* For article-style content */
```

### Spacing System
```css
--spacing-xs: 0.25rem (4px)
--spacing-sm: 0.5rem (8px)
--spacing-md: 1rem (16px)
--spacing-lg: 1.5rem (24px)
--spacing-xl: 2rem (32px)
--spacing-xxl: 3rem (48px)
--spacing-xxxl: 5rem (80px)
```

### Grid System

#### Two-Column Grid
```css
/* Mobile: Stack */
grid-template-columns: 1fr;

/* Tablet+: Side by side */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}
```

#### Three-Column Grid
```css
/* Mobile: Stack */
grid-template-columns: 1fr;

/* Tablet: 2 columns */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}
```

### Section Padding
```css
/* Mobile */
padding: 40px 20px;

/* Tablet */
@media (min-width: 768px) {
  padding: 60px 30px;
}

/* Desktop */
@media (min-width: 1024px) {
  padding: 80px 40px;
}
```

---

## Component Library

### Buttons

#### Primary Button (High Emphasis)
```css
.btn-primary {
  background: var(--british-red);
  color: white;
  padding: 14px 30px;
  border-radius: 25px;
  font-weight: 600;
  min-height: 48px; /* Touch target */
  box-shadow: 0 4px 15px rgba(207, 20, 43, 0.3);
}

.btn-primary:hover {
  background: #B01025; /* Darker red */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(207, 20, 43, 0.4);
}
```

#### Secondary Button (Medium Emphasis)
```css
.btn-secondary {
  background: white;
  color: var(--british-navy);
  border: 2px solid var(--british-navy);
  /* Same structure as primary */
}
```

#### Button Sizes
- **Small**: `padding: 10px 20px; font-size: 0.875rem;`
- **Regular**: `padding: 14px 30px; font-size: 1rem;`
- **Large**: `padding: 16px 35px; font-size: 1.125rem;`
- **XL**: `padding: 20px 40px; font-size: 1.25rem;`

### Cards

#### Basic Card
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}
```

#### Card Variations
- **Bordered**: Add `border-left: 4px solid var(--british-red)`
- **Highlighted**: Use `background: var(--warm-cream)`
- **Interactive**: Include hover states for clickable cards

### Content Boxes

#### Highlight Box (Important Information)
```css
.highlight-box {
  background: var(--tan-beige);
  border-left: 4px solid var(--british-navy);
  padding: 20px;
  border-radius: 0 8px 8px 0;
  margin: 30px 0;
}
```

#### Warning Box
```css
.warning-box {
  background: #FFF3CD;
  border-left: 4px solid var(--british-red);
  /* Same structure as highlight */
}
```

#### Tip Box
```css
.tip-box {
  background: #E8F5E9;
  border-left: 4px solid var(--success-green);
  /* Same structure as highlight */
}
```

### Lists

#### Checkmark List
```css
.checkmark-list li::before {
  content: '✓';
  color: var(--success-green);
  font-weight: bold;
  margin-right: 10px;
}
```

#### Numbered List (Styled)
```css
.numbered-list li::before {
  content: counter(item);
  background: var(--british-navy);
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}
```

### Forms

#### Input Fields
```css
input, textarea, select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px; /* Prevents zoom on iOS */
  min-height: 48px; /* Touch target */
  transition: all 0.3s ease;
}

input:focus {
  border-color: var(--british-navy);
  box-shadow: 0 0 0 3px rgba(1, 33, 105, 0.1);
}
```

---

## Content Patterns

### Hero Sections

#### Main Daycare Hero
- **Background**: Navy gradient
- **Text**: White, center-aligned on mobile, flexible on desktop
- **Elements**: Badge, title, subtitle, features, CTA
- **Height**: Min 400px mobile, 450px desktop

#### Book Page Hero
- **Layout**: Two-column on desktop (text + book cover)
- **Book Cover**: Prominent, 250-380px based on screen size
- **Rating**: Gold stars with review count
- **Benefits**: Small badges in single row

### Section Alternation Pattern
1. White background
2. Warm cream background
3. White background
4. Soft blue background
5. White background
6. Tan beige (CTA section)
7. Navy (footer)

### Content Sections

#### Standard Content Section
```html
<section class="[background-class]">
  <div class="container">
    <h2 class="section-title">Title</h2>
    <p class="section-subtitle">Subtitle/description</p>
    <div class="content-grid">
      <!-- Content cards/items -->
    </div>
  </div>
</section>
```

### Testimonial Patterns

#### Basic Testimonial Card
```html
<div class="testimonial-card">
  <div class="stars">★★★★★</div>
  <blockquote>
    <p>"Quote text here"</p>
  </blockquote>
  <cite>- Parent Name, Context</cite>
</div>
```

### CTA Sections

#### Primary CTA Pattern
- **Background**: Tan beige or gradient
- **Title**: Large, centered
- **Subtitle**: Supporting text
- **Button**: XL size, high contrast
- **Additional**: Trust signals, urgency indicators

---

## Accessibility Standards

### Color Contrast Requirements
- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text** (>18px or >14px bold): 3:1 minimum
- **Interactive elements**: 3:1 minimum
- **Focus indicators**: 3:1 minimum

### Interactive Elements
- **Touch targets**: Minimum 48x48px
- **Spacing**: 8px minimum between targets
- **Focus states**: Visible outline (3px gold)
- **Hover states**: Clear visual feedback

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Landmark regions (header, main, footer)
- Descriptive link text (not "click here")
- Alt text for all images

### Keyboard Navigation
- All interactive elements keyboard accessible
- Logical tab order
- Skip links for main content
- Focus trap prevention

---

## Performance Guidelines

### Image Optimization
- **Format**: WebP with fallbacks
- **Sizing**: Responsive images with srcset
- **Lazy loading**: Below-the-fold images
- **Compression**: 85% quality for photos

### CSS Optimization
- **Critical CSS**: Inline above-the-fold styles
- **Minification**: All production CSS
- **Unused CSS**: Remove with PurgeCSS
- **Variables**: Use CSS custom properties

### JavaScript Guidelines
- **Defer/Async**: Non-critical scripts
- **Minification**: All production JS
- **Bundle size**: < 50KB for main bundle
- **Code splitting**: Lazy load components

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **PageSpeed Score**: 90+ mobile, 95+ desktop
- **Core Web Vitals**: All green

---

## Resource Page Specific Guidelines

### Content Structure

#### Hero Section
```css
.resource-hero {
  text-align: center;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--tan-beige);
}

.resource-hero h1 {
  font-size: 2.5rem;
  color: var(--british-navy);
  margin-bottom: 1rem;
}
```

#### Table of Contents
- **Background**: Tan beige
- **Border radius**: 12px
- **Links**: Arrow prefix, hover indent
- **Position**: After hero, before content

#### Content Sections
```css
.content-section {
  margin-bottom: 3rem;
  padding-top: 2rem;
  border-top: 3px solid var(--tan-beige);
}

.content-section h2 {
  font-size: 2rem;
  color: var(--british-navy);
  margin-bottom: 1.5rem;
}
```

### Resource-Specific Components

#### Question Cards
```css
.question-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.question-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
```

#### Download Boxes
```css
.download-box {
  background: linear-gradient(135deg, var(--british-navy), #1e3a8a);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin: 3rem 0;
}
```

#### Related Resources Grid
```css
.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
```

### Content Typography
- **Paragraph spacing**: 1.5rem margin-bottom
- **Line height**: 1.8 for readability
- **Font size**: 1.1rem for body text
- **Max width**: 65ch for paragraphs

### Resource CTAs
- **Position**: Bottom of content, before related resources
- **Background**: Tan beige with rounded corners
- **Button**: Primary red CTA to main daycare
- **Message**: Connect resource value to daycare service

---

## Implementation Checklist

### For New Pages
- [ ] Use correct DOCTYPE and lang attribute
- [ ] Include all meta tags (viewport, description, keywords)
- [ ] Link correct CSS files (style.css + page-specific)
- [ ] Include structured data where appropriate
- [ ] Test on mobile first
- [ ] Validate HTML
- [ ] Check color contrast
- [ ] Test keyboard navigation
- [ ] Optimize images
- [ ] Minify CSS/JS for production

### For Content Sections
- [ ] Follow alternating background pattern
- [ ] Use semantic HTML
- [ ] Include proper heading hierarchy
- [ ] Add breadcrumbs for navigation
- [ ] Include related links
- [ ] Add CTA at bottom
- [ ] Ensure 65ch max width for readability
- [ ] Test all interactive elements
- [ ] Check loading performance
- [ ] Verify accessibility

---

## Style Guide Maintenance

### Version Control
- Document all changes in CHANGELOG
- Tag releases with semantic versioning
- Keep style guide in sync with implementation

### Review Schedule
- Monthly: Check for consistency issues
- Quarterly: Review performance metrics
- Annually: Major design system review

### Feedback Loop
- Collect user feedback
- Monitor analytics for UX issues
- A/B test major changes
- Document lessons learned

---

## Examples & Code Snippets

### Complete Section Example
```html
<section class="services warm-cream">
  <div class="container">
    <h2 class="section-title">Our Services</h2>
    <p class="section-subtitle">
      Comprehensive care tailored to your child's needs
    </p>
    <div class="services-grid">
      <div class="service-card">
        <span class="service-icon">🎨</span>
        <h3>Creative Learning</h3>
        <p>Age-appropriate activities that spark imagination</p>
      </div>
      <!-- More cards -->
    </div>
  </div>
</section>
```

### Button Implementation
```html
<!-- Primary CTA -->
<a href="#" class="btn btn-primary btn-large">
  Schedule a Visit
</a>

<!-- Secondary Action -->
<button class="btn btn-secondary">
  Learn More
</button>

<!-- Text Link with Icon -->
<a href="#" class="text-link">
  Download Our Guide
  <span class="icon">→</span>
</a>
```

### Responsive Image
```html
<picture>
  <source 
    srcset="image-mobile.webp" 
    media="(max-width: 767px)"
    type="image/webp">
  <source 
    srcset="image-desktop.webp" 
    media="(min-width: 768px)"
    type="image/webp">
  <img 
    src="image-fallback.jpg" 
    alt="Description"
    loading="lazy"
    width="800"
    height="600">
</picture>
```

---

## Contact & Support

For questions about this style guide or implementation:
- **Project Manager**: Jay
- **Repository**: https://github.com/jaystarz1/british-nanny-website
- **Domain**: thebritishnanny.ca

---

*Last Updated: 2024*
*Version: 1.0.0*