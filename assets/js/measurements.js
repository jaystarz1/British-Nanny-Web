/* ==========================================
   Global Measurement Cache System
   Prevents forced reflows by caching all DOM measurements
   ========================================== */

(function() {
    'use strict';

    // Global measurement cache
    window.MeasurementCache = {
        // Element measurements stored in WeakMap
        elements: new WeakMap(),
        
        // Global measurements
        global: {
            headerHeight: 0,
            viewportWidth: 0,
            viewportHeight: 0,
            scrollY: 0,
            scrollX: 0,
            documentHeight: 0,
            documentWidth: 0
        },
        
        // Section positions for scroll tracking
        sections: [],
        
        // Carousel measurements
        carousels: new WeakMap(),
        
        // Initialize and cache all measurements
        init: function() {
            // Wait for DOM to be fully ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.cacheAll());
            } else {
                // Use double RAF to ensure layout is complete
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this.cacheAll();
                    });
                });
            }
            
            // Setup resize observer for recaching
            this.setupResizeObserver();
        },
        
        // Cache all measurements in a single batch
        cacheAll: function() {
            // Batch all DOM reads together
            const header = document.querySelector('.site-header, .navbar');
            const sections = document.querySelectorAll('section[id], .hero-book[id]');
            const carouselTracks = document.querySelectorAll('.carousel-track');
            const testimonialGrids = document.querySelectorAll('.testimonials-grid');
            
            // Global measurements
            this.global.viewportWidth = window.innerWidth;
            this.global.viewportHeight = window.innerHeight;
            this.global.scrollY = window.scrollY;
            this.global.scrollX = window.scrollX;
            this.global.documentHeight = document.documentElement.scrollHeight;
            this.global.documentWidth = document.documentElement.scrollWidth;
            
            // Header height
            if (header) {
                this.global.headerHeight = header.offsetHeight;
                this.elements.set(header, {
                    height: header.offsetHeight,
                    width: header.offsetWidth,
                    top: header.offsetTop,
                    left: header.offsetLeft
                });
            }
            
            // Cache section positions
            this.sections = Array.from(sections).map(section => ({
                id: section.id,
                element: section,
                top: section.offsetTop,
                height: section.offsetHeight,
                bottom: section.offsetTop + section.offsetHeight
            }));
            
            // Cache carousel measurements
            carouselTracks.forEach(track => {
                const items = track.querySelectorAll('.carousel-item');
                if (items.length > 0) {
                    this.carousels.set(track, {
                        itemWidth: items[0].offsetWidth,
                        itemCount: items.length,
                        gap: 24, // Standard gap
                        trackWidth: track.offsetWidth
                    });
                }
            });
            
            // Cache testimonial grid measurements
            testimonialGrids.forEach(grid => {
                const cards = grid.querySelectorAll('.testimonial-card');
                if (cards.length > 0) {
                    this.carousels.set(grid, {
                        itemWidth: cards[0].offsetWidth,
                        itemCount: cards.length,
                        gap: 24,
                        trackWidth: grid.offsetWidth
                    });
                }
            });
        },
        
        // Get cached measurement for element
        getElement: function(element) {
            if (!this.elements.has(element)) {
                // Cache on demand if not already cached
                this.elements.set(element, {
                    height: element.offsetHeight,
                    width: element.offsetWidth,
                    top: element.offsetTop,
                    left: element.offsetLeft
                });
            }
            return this.elements.get(element);
        },
        
        // Get cached carousel measurements
        getCarousel: function(element) {
            return this.carousels.get(element);
        },
        
        // Get section at current scroll position
        getCurrentSection: function(scrollY = window.scrollY) {
            const offset = this.global.headerHeight + 100;
            const position = scrollY + offset;
            
            for (let section of this.sections) {
                if (position >= section.top && position < section.bottom) {
                    return section;
                }
            }
            return null;
        },
        
        // Setup resize observer for automatic recaching
        setupResizeObserver: function() {
            let resizeTimeout;
            
            // Debounced resize handler
            const handleResize = () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.cacheAll();
                }, 250);
            };
            
            // Use ResizeObserver if available
            if ('ResizeObserver' in window) {
                const observer = new ResizeObserver(handleResize);
                observer.observe(document.documentElement);
            } else {
                // Fallback to window resize
                window.addEventListener('resize', handleResize, { passive: true });
            }
        },
        
        // Update scroll position (called from scroll handlers)
        updateScroll: function() {
            this.global.scrollY = window.scrollY;
            this.global.scrollX = window.scrollX;
        },
        
        // Force recache (use sparingly)
        recache: function() {
            // Use RAF to batch the recache
            requestAnimationFrame(() => {
                this.cacheAll();
            });
        }
    };
    
    // Initialize on load
    window.MeasurementCache.init();
})();