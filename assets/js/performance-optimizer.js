/* ==========================================
   Performance Optimization Script
   Loads CSS and fonts asynchronously
   ========================================== */

// Add this script to the <head> of your index.html to improve performance

// Function to load CSS asynchronously
function loadCSS(href, before, media) {
    "use strict";
    var ss = document.createElement("link");
    var ref = before || document.getElementsByTagName("script")[0];
    ss.rel = "stylesheet";
    ss.href = href;
    ss.media = "only x";
    if (ref.parentNode) {
        ref.parentNode.insertBefore(ss, ref);
    }
    setTimeout(function() {
        ss.media = media || "all";
    });
    return ss;
}

// Function to load fonts with optimization
function optimizeFonts() {
    // Add class while fonts are loading
    document.documentElement.classList.add('fonts-loading');
    
    // Create font face observer if available
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1em Open Sans'),
            document.fonts.load('700 1em Merriweather')
        ]).then(function() {
            document.documentElement.classList.remove('fonts-loading');
            document.documentElement.classList.add('fonts-loaded');
        }).catch(function() {
            // Fallback if fonts fail to load
            document.documentElement.classList.add('fonts-loaded');
        });
    } else {
        // Fallback for browsers without font loading API
        setTimeout(function() {
            document.documentElement.classList.add('fonts-loaded');
        }, 1000);
    }
}

// Function to preload critical resources
function preloadCriticalResources() {
    // Preload critical fonts
    var preloadFonts = [
        'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5OeyxNV-bnrw.woff2',
        'https://fonts.gstatic.com/s/opensans/v35/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2'
    ];
    
    preloadFonts.forEach(function(fontUrl) {
        var link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = fontUrl;
        document.head.appendChild(link);
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        preloadCriticalResources();
        optimizeFonts();
    });
} else {
    preloadCriticalResources();
    optimizeFonts();
}

// Load non-critical CSS after window load
window.addEventListener('load', function() {
    // Load Google Fonts with display=swap
    loadCSS('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600;700&display=swap');
    
    // Load stylesheets asynchronously
    loadCSS('assets/css/style.css');
    loadCSS('assets/css/daycare.css');
});

// Resource hints for faster connections
function addResourceHints() {
    var hints = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }
    ];
    
    hints.forEach(function(hint) {
        var link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.rel === 'preconnect') {
            link.crossOrigin = '';
        }
        document.head.appendChild(link);
    });
}

// Add resource hints immediately
addResourceHints();

// Optimize navigation menu for mobile
document.addEventListener('DOMContentLoaded', function() {
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('nav-menu-active');
            this.classList.toggle('nav-toggle-active');
        });
        
        // Close menu when clicking on a link (mobile)
        var navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav-menu-active');
                navToggle.classList.remove('nav-toggle-active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    var lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
    
    if ('IntersectionObserver' in window) {
        var lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window && 'measure' in window.performance) {
        // Measure page load time
        var perfData = window.performance.timing;
        var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        // Log performance metrics (you can send these to analytics)
        console.log('Page Load Time:', pageLoadTime + 'ms');
        
        // Check Core Web Vitals if available
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                var lcp = new PerformanceObserver(function(entryList) {
                    var entries = entryList.getEntries();
                    var lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                });
                lcp.observe({ type: 'largest-contentful-paint', buffered: true });
                
                // First Input Delay
                var fid = new PerformanceObserver(function(entryList) {
                    var entries = entryList.getEntries();
                    entries.forEach(function(entry) {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fid.observe({ type: 'first-input', buffered: true });
                
                // Cumulative Layout Shift
                var cls = new PerformanceObserver(function(entryList) {
                    var clsValue = 0;
                    entryList.getEntries().forEach(function(entry) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    console.log('CLS:', clsValue);
                });
                cls.observe({ type: 'layout-shift', buffered: true });
            } catch (e) {
                // Silent fail for browsers that don't support these metrics
            }
        }
    }
});