/* ==========================================
   Book Landing Page JavaScript - Mobile-First
   The British Nanny's Guide to Potty Training
   Phase 5 Optimizations - Performance & Accessibility
   ========================================== */

(function() {
    'use strict';

    // ==========================================
    // PERFORMANCE OPTIMIZATIONS - Phase 5.1
    // ==========================================
    
    // Single consolidated scroll handler for all scroll-based features
    let scrollHandlers = [];
    let scrollThrottle = null;
    
    function addScrollHandler(handler) {
        scrollHandlers.push(handler);
    }
    
    function handleScroll() {
        if (!scrollThrottle) {
            scrollThrottle = requestAnimationFrame(() => {
                scrollHandlers.forEach(handler => handler());
                scrollThrottle = null;
            });
        }
    }
    
    // Only add one scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ==========================================
    // AMAZON LINK TRACKING (Simplified)
    // ==========================================
    
    function initAmazonTracking() {
        const amazonLinks = document.querySelectorAll('a[href*="amazon"], .btn-primary');
        
        amazonLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Minimal tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Amazon',
                        'event_label': 'Book Purchase',
                        'value': 1
                    });
                }
                
                // Simple visual feedback
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '';
                }, 200);
            });
        });
    }

    // ==========================================
    // MOBILE-SPECIFIC OPTIMIZATIONS - Phase 5 Simplified
    // ==========================================
    
    function initMobileOptimizations() {
        if (window.innerWidth < 768) {
            // Optimize touch scrolling
            document.addEventListener('touchstart', function() {}, { passive: true });
            document.addEventListener('touchmove', function() {}, { passive: true });
            
            // Add mobile CTA bar with optimized logic
            addMobileCTABar();
        }
    }
    
    // Phase 6.2: Enhanced mobile CTA bar with close button and better UX
    function addMobileCTABar() {
        // Check if user has dismissed it this session
        if (sessionStorage.getItem('mobileCTADismissed') === 'true') {
            return;
        }
        
        const mobileCTA = document.createElement('div');
        mobileCTA.className = 'mobile-cta-bar';
        mobileCTA.innerHTML = `
            <button class="mobile-cta-close" aria-label="Close offer bar" title="Close">
                <span>×</span>
            </button>
            <a href="https://www.amazon.ca/dp/B0DBQBQBXT" target="_blank" class="mobile-cta-button">
                📚 Get the Book on Amazon
            </a>
        `;
        
        // Add enhanced styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-cta-bar {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, var(--british-red) 0%, #B91C1C 100%);
                padding: 12px;
                z-index: 999;
                box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
                transform: translateY(100%);
                transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .mobile-cta-bar.visible {
                transform: translateY(0);
            }
            .mobile-cta-bar.hiding {
                transform: translateY(100%);
                transition: transform 0.3s ease-out;
            }
            .mobile-cta-close {
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: var(--white);
                width: 32px;
                height: 32px;
                border-radius: 50%;
                font-size: 20px;
                line-height: 1;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                z-index: 1000;
            }
            .mobile-cta-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
            .mobile-cta-close:active {
                transform: scale(0.95);
            }
            .mobile-cta-button {
                flex: 1;
                display: block;
                background: var(--white);
                color: var(--british-red);
                padding: 14px 40px 14px 24px;
                border-radius: 25px;
                text-align: center;
                font-weight: 600;
                text-decoration: none;
                font-size: 0.95rem;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                transition: all 0.2s ease;
                min-height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .mobile-cta-button:active {
                background: var(--accent-gold);
                color: var(--british-navy);
                transform: scale(0.98);
            }
            @media (min-width: 768px) {
                .mobile-cta-bar {
                    display: none;
                }
            }
            /* Animation for initial appearance */
            @keyframes slideUpBounce {
                0% { transform: translateY(100%); }
                60% { transform: translateY(-5px); }
                100% { transform: translateY(0); }
            }
            .mobile-cta-bar.visible {
                animation: slideUpBounce 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(mobileCTA);
        
        // Handle close button
        const closeBtn = mobileCTA.querySelector('.mobile-cta-close');
        closeBtn.addEventListener('click', () => {
            mobileCTA.classList.add('hiding');
            setTimeout(() => {
                mobileCTA.remove();
            }, 300);
            sessionStorage.setItem('mobileCTADismissed', 'true');
        });
        
        // Improved scroll handling - Phase 6.2
        let lastScrollY = 0;
        let isVisible = false;
        let checkCounter = 0;
        let hasShownOnce = false;
        
        addScrollHandler(() => {
            // Only check every 5th scroll event for performance
            checkCounter++;
            if (checkCounter % 5 !== 0) return;
            
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;
            const scrolledPastHero = currentScrollY > window.innerHeight * 0.8; // Show later
            const nearBottom = currentScrollY > document.documentElement.scrollHeight - window.innerHeight - 500;
            const atTop = currentScrollY < 100;
            
            // Only show after scrolling past hero and when scrolling up
            // Hide when near bottom or at top to avoid interference
            if (scrolledPastHero && !scrollingDown && !isVisible && !nearBottom && !atTop && !hasShownOnce) {
                mobileCTA.classList.add('visible');
                isVisible = true;
                hasShownOnce = true;
                
                // Auto-hide after 10 seconds if not interacted with
                setTimeout(() => {
                    if (isVisible) {
                        mobileCTA.classList.remove('visible');
                        isVisible = false;
                    }
                }, 10000);
            } else if ((scrollingDown || nearBottom || atTop) && isVisible) {
                mobileCTA.classList.remove('visible');
                isVisible = false;
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // ==========================================
    // SIMPLIFIED TESTIMONIAL ANIMATIONS - Phase 5.1
    // ==========================================
    
    function initTestimonialAnimations() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const testimonials = document.querySelectorAll('.review-card.featured');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Reduced delay
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        testimonials.forEach(testimonial => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateY(20px)';
            testimonial.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(testimonial);
        });
    }

    // ==========================================
    // SIMPLIFIED AUTHOR HIGHLIGHTS - Phase 5.1
    // ==========================================
    
    function initAuthorHighlights() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const authorSection = document.querySelector('.author-section');
        if (!authorSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const credentials = entry.target.querySelectorAll('.credentials li');
                    credentials.forEach((credential, index) => {
                        setTimeout(() => {
                            credential.style.opacity = '1';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const credentials = authorSection.querySelectorAll('.credentials li');
        credentials.forEach(credential => {
            credential.style.opacity = '0';
            credential.style.transition = 'opacity 0.3s ease';
        });
        
        observer.observe(authorSection);
    }

    // ==========================================
    // SIMPLIFIED CTA EFFECTS - Phase 5.1
    // ==========================================
    
    function initCTAEffects() {
        // Only add minimal hover effects on desktop
        if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const ctaButtons = document.querySelectorAll('.btn-primary');
            
            ctaButtons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
        }
    }

    // ==========================================
    // DAYCARE LINK TRACKING (Simplified)
    // ==========================================
    
    function initDaycareTracking() {
        const daycareLinks = document.querySelectorAll('a[href="index.html"], .daycare-link');
        
        daycareLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Navigation',
                        'event_label': 'Book to Daycare',
                        'value': 1
                    });
                }
            });
        });
    }

    // ==========================================
    // PROGRESSIVE DISCLOSURE - Phase 4 (Kept, simplified)
    // ==========================================
    
    function initProgressiveDisclosure() {
        const longContents = document.querySelectorAll('.content-card ul');
        
        longContents.forEach(content => {
            if (content.scrollHeight > 200) {
                const wrapper = document.createElement('div');
                wrapper.className = 'expandable-content';
                content.parentNode.insertBefore(wrapper, content);
                wrapper.appendChild(content);
                
                const toggle = document.createElement('button');
                toggle.className = 'expand-toggle';
                toggle.textContent = 'Show more';
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Show more content');
                wrapper.parentNode.insertBefore(toggle, wrapper.nextSibling);
                
                toggle.addEventListener('click', function() {
                    const isExpanded = wrapper.classList.contains('expanded');
                    wrapper.classList.toggle('expanded');
                    this.textContent = isExpanded ? 'Show more' : 'Show less';
                    this.setAttribute('aria-expanded', !isExpanded);
                });
            }
        });
    }

    // ==========================================
    // SECTION TRANSITIONS - Phase 5.1 Simplified
    // ==========================================
    
    function initSectionTransitions() {
        // Skip if reduced motion is preferred
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const sections = document.querySelectorAll('section:not(.hero-book)');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px'
        });
        
        sections.forEach(section => {
            section.classList.add('fade-in-section');
            sectionObserver.observe(section);
        });
    }

    // ==========================================
    // PERFORMANCE MONITORING - Simplified
    // ==========================================
    
    function initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log('Phase 5: Page load time:', loadTime, 'ms');
                    
                    if (loadTime > 2000) {
                        console.warn('Load time exceeds 2s target');
                    }
                }
            });
        }
    }

    // ==========================================
    // INITIALIZATION - Phase 5 Optimized
    // ==========================================
    
    function init() {
        // Core functionality
        initAmazonTracking();
        initDaycareTracking();
        
        // Visual enhancements (simplified)
        initTestimonialAnimations();
        initAuthorHighlights();
        initCTAEffects();
        
        // Mobile optimizations
        initMobileOptimizations();
        
        // Content enhancements
        initProgressiveDisclosure();
        initSectionTransitions();
        
        // Performance monitoring
        initPerformanceMonitoring();
        
        console.log('Phase 5: Performance optimizations loaded');
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();