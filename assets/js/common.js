/* ==========================================
   Common JavaScript - Mobile-First
   The British Nanny's Website
   ========================================== */

(function() {
    'use strict';

    // ==========================================
    // MOBILE MENU FUNCTIONALITY
    // ==========================================
    
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        const mobileClose = document.querySelector('.mobile-menu-close');
        const body = document.body;

        if (!mobileToggle || !mobileMenu || !mobileOverlay) return;

        // Add hamburger animation spans if not present
        if (mobileToggle.children.length === 0) {
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                mobileToggle.appendChild(span);
            }
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        function openMobileMenu() {
            // Add animation classes with proper timing
            mobileToggle.classList.add('active');
            mobileOverlay.style.display = 'block';
            
            // Force reflow for animation
            mobileOverlay.offsetHeight;
            
            requestAnimationFrame(() => {
                mobileOverlay.classList.add('active');
                mobileMenu.classList.add('active');
            });
            
            body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Update active menu state based on current page
            updateActiveMenuItems();
        }

        function closeMobileMenu() {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                if (!mobileOverlay.classList.contains('active')) {
                    mobileOverlay.style.display = 'none';
                }
            }, 300);
            
            body.style.overflow = ''; // Restore scrolling
        }

        // Update active menu items based on current section
        function updateActiveMenuItems() {
            const currentHash = window.location.hash;
            const menuLinks = mobileMenu.querySelectorAll('nav a');
            
            menuLinks.forEach(link => {
                link.classList.remove('active');
                
                // Check if this is the current section
                const href = link.getAttribute('href');
                if (href === currentHash || 
                    (currentHash === '' && href === '#hero') ||
                    (href.includes('index.html') && window.location.pathname.includes('index.html')) ||
                    (href.includes('potty-training-book.html') && window.location.pathname.includes('potty-training-book.html'))) {
                    link.classList.add('active');
                }
            });
        }

        // Event listeners
        mobileToggle.addEventListener('click', toggleMobileMenu);
        
        if (mobileClose) {
            mobileClose.addEventListener('click', closeMobileMenu);
        }
        
        mobileOverlay.addEventListener('click', closeMobileMenu);

        // Close menu when clicking on menu links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Small delay to allow navigation
                setTimeout(closeMobileMenu, 100);
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu on window resize (if user rotates device)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Update active state on scroll for section-based navigation
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(() => {
                if (mobileMenu.classList.contains('active')) {
                    updateActiveMenuItemsFromScroll();
                }
            });
        });

        // Update active menu items based on scroll position
        function updateActiveMenuItemsFromScroll() {
            const sections = document.querySelectorAll('section[id], .hero-book[id]');
            const menuLinks = mobileMenu.querySelectorAll('nav a[href^="#"]');
            const scrollPosition = window.scrollY + 100; // Offset for header
            
            let currentSection = '';
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                
                if (scrollPosition >= top && scrollPosition < top + height) {
                    currentSection = '#' + section.id;
                }
            });
            
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    }

    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    
    function initSmoothScrolling() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Skip empty hrefs or just #
                if (!href || href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                    const offset = 20; // Additional offset for breathing room
                    
                    const targetPosition = target.offsetTop - headerHeight - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================
    // FAQ ACCORDION FUNCTIONALITY
    // ==========================================
    
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items (optional - remove if you want multiple open)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
            
            // Keyboard accessibility
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
            
            // Make focusable for screen readers
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('role', 'button');
            
            // Update aria-expanded when toggled
            const observer = new MutationObserver(() => {
                const isExpanded = item.classList.contains('active');
                question.setAttribute('aria-expanded', isExpanded.toString());
            });
            
            observer.observe(item, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // ==========================================
    // FORM ENHANCEMENT
    // ==========================================
    
    function initFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add loading state on submit
            form.addEventListener('submit', function() {
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.classList.add('loading');
                }
            });
            
            // Form validation feedback
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', validateInput);
                input.addEventListener('input', clearValidation);
            });
        });
        
        function validateInput(e) {
            const input = e.target;
            const value = input.value.trim();
            
            // Remove previous validation classes
            input.classList.remove('valid', 'invalid');
            
            if (input.hasAttribute('required') && !value) {
                input.classList.add('invalid');
                return false;
            }
            
            // Email validation
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    input.classList.add('invalid');
                    return false;
                }
            }
            
            // Phone validation (basic)
            if (input.type === 'tel' && value) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    input.classList.add('invalid');
                    return false;
                }
            }
            
            if (value) {
                input.classList.add('valid');
            }
            
            return true;
        }
        
        function clearValidation(e) {
            const input = e.target;
            input.classList.remove('invalid');
        }
    }

    // ==========================================
    // LOADING ANIMATIONS
    // ==========================================
    
    function initLoadingAnimations() {
        // Fade in elements on load
        const animatedElements = document.querySelectorAll('.card, .service-card, .testimonial-card, .content-card, .review-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ==========================================
    // TOUCH AND GESTURE ENHANCEMENTS
    // ==========================================
    
    function initTouchEnhancements() {
        // Add touch feedback to buttons
        const touchElements = document.querySelectorAll('.btn, .card, .service-card, .testimonial-card, .faq-question');
        
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            });
            
            el.addEventListener('touchcancel', function() {
                this.style.transform = '';
            });
        });
        
        // Improve tap targets on small screens
        if (window.innerWidth < 768) {
            const smallTargets = document.querySelectorAll('a, button');
            smallTargets.forEach(target => {
                const rect = target.getBoundingClientRect();
                if (rect.height < 44) {
                    target.style.minHeight = '44px';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                }
            });
        }
    }

    // ==========================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================
    
    function initPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Preload critical resources on mobile
        if (window.innerWidth < 768) {
            const preloadLinks = [
                'assets/css/style.css',
                'assets/css/daycare.css',
                'assets/css/book.css'
            ];
            
            preloadLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = href;
                document.head.appendChild(link);
            });
        }
    }

    // ==========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================
    
    function initAccessibilityEnhancements() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Ensure main content has proper id
        const mainContent = document.querySelector('main') || document.querySelector('.hero, .hero-book');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
        
        // Add focus indicators for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Announce page changes for screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.id = 'announcer';
        document.body.appendChild(announcer);
    }

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    function init() {
        // Initialize all components
        initMobileMenu();
        initSmoothScrolling();
        initFAQAccordion();
        initFormEnhancements();
        initTouchEnhancements();
        initAccessibilityEnhancements();
        
        // Initialize performance optimizations after load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initLoadingAnimations();
                initPerformanceOptimizations();
            });
        } else {
            initLoadingAnimations();
            initPerformanceOptimizations();
        }
        
        // Handle orientation changes
        window.addEventListener('orientationchange', debounce(() => {
            // Recalculate layouts and close mobile menu if needed
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.mobile-menu-overlay').classList.remove('active');
                document.querySelector('.mobile-menu-toggle').classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250));
        
        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            });
        }
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for debugging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.BritishNannyCommon = {
            initMobileMenu,
            initSmoothScrolling,
            initFAQAccordion,
            debounce,
            throttle
        };
    }

})();