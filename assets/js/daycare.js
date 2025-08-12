/* ==========================================
   Daycare Page JavaScript - Mobile-First
   The British Nanny's Daycare
   ========================================== */

(function() {
    'use strict';

    // ==========================================
    // PHONE CALL TRACKING
    // ==========================================
    
    function initPhoneTracking() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"], .phone-btn, .phone-highlight');
        
        phoneLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Contact',
                        'event_label': 'Phone Call',
                        'value': 1
                    });
                }
                
                console.log('Phone number clicked:', this.href || this.textContent);
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // ==========================================
    // CONTACT FORM ENHANCEMENT
    // ==========================================
    
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form form, #contact-form');
        
        if (!contactForm) return;
        
        // Add form validation and submission handling
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                return false;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('loading');
            
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'submit', {
                    'event_category': 'Contact',
                    'event_label': 'Inquiry Form',
                    'value': 1
                });
            }
            
            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                showFormSuccess();
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
        
        function validateForm(data) {
            const required = ['name', 'email', 'message'];
            let isValid = true;
            
            required.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                const value = data[field]?.trim();
                
                if (!value) {
                    showFieldError(input, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                    isValid = false;
                } else {
                    clearFieldError(input);
                }
            });
            
            // Email validation
            if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                const emailInput = contactForm.querySelector('[name="email"]');
                showFieldError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            return isValid;
        }
        
        function showFieldError(input, message) {
            clearFieldError(input);
            
            input.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
        }
        
        function clearFieldError(input) {
            input.classList.remove('error');
            const existingError = input.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
        }
        
        function showFormSuccess() {
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = `
                <div class="success-content">
                    <h3>✅ Message Sent Successfully!</h3>
                    <p>Thank you for your inquiry. We'll get back to you within 24 hours.</p>
                </div>
            `;
            
            contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
            
            // Scroll to success message on mobile
            if (window.innerWidth < 768) {
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // ==========================================
    // SERVICE CARD INTERACTIONS
    // ==========================================
    
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Add hover effects for desktop
            if (window.innerWidth > 768) {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            }
            
            // Add click interactions for mobile
            card.addEventListener('click', function() {
                // Toggle expanded state
                const isExpanded = this.classList.contains('expanded');
                
                // Remove expanded from all cards
                serviceCards.forEach(c => c.classList.remove('expanded'));
                
                if (!isExpanded) {
                    this.classList.add('expanded');
                    
                    // Scroll card into view on mobile
                    if (window.innerWidth < 768) {
                        setTimeout(() => {
                            this.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center' 
                            });
                        }, 100);
                    }
                }
            });
        });
        
        // Add expanded styles
        const style = document.createElement('style');
        style.textContent = `
            .service-card.expanded {
                transform: scale(1.05);
                z-index: 10;
                box-shadow: 0 15px 35px rgba(0,0,0,0.15);
            }
            @media (max-width: 767px) {
                .service-card.expanded {
                    transform: scale(1.02);
                    margin: var(--spacing-lg) 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // TESTIMONIAL CAROUSEL (MOBILE)
    // ==========================================
    
    function initTestimonialCarousel() {
        if (window.innerWidth > 768) return; // Only on mobile
        
        const testimonialGrid = document.querySelector('.testimonials-grid');
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        if (!testimonialGrid || testimonials.length === 0) return;
        
        let currentIndex = 0;
        const totalTestimonials = testimonials.length;
        
        // Convert grid to horizontal scrolling container
        testimonialGrid.style.cssText = `
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: var(--spacing-lg);
            padding-bottom: var(--spacing-md);
            -webkit-overflow-scrolling: touch;
        `;
        
        testimonials.forEach(testimonial => {
            testimonial.style.cssText = `
                flex: 0 0 85%;
                scroll-snap-align: center;
            `;
        });
        
        // Add dots indicator
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: var(--spacing-sm);
            margin-top: var(--spacing-lg);
        `;
        
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: ${i === 0 ? 'var(--british-red)' : 'var(--medium-gray)'};
                cursor: pointer;
                transition: background 0.3s ease;
            `;
            
            dot.addEventListener('click', () => {
                scrollToTestimonial(i);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        testimonialGrid.parentNode.appendChild(dotsContainer);
        
        // Update dots on scroll
        testimonialGrid.addEventListener('scroll', () => {
            const scrollLeft = testimonialGrid.scrollLeft;
            const cardWidth = testimonials[0].offsetWidth + 24; // width + gap
            const newIndex = Math.round(scrollLeft / cardWidth);
            
            if (newIndex !== currentIndex) {
                updateDots(newIndex);
                currentIndex = newIndex;
            }
        });
        
        function scrollToTestimonial(index) {
            const cardWidth = testimonials[0].offsetWidth + 24;
            testimonialGrid.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }
        
        function updateDots(activeIndex) {
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, index) => {
                dot.style.background = index === activeIndex ? 'var(--british-red)' : 'var(--medium-gray)';
            });
        }
    }

    // ==========================================
    // MOBILE QUICK ACTIONS
    // ==========================================
    
    function initMobileQuickActions() {
        if (window.innerWidth > 768) return;
        
        // Create floating action buttons
        const fab = document.createElement('div');
        fab.className = 'floating-actions';
        fab.innerHTML = `
            <button class="fab-toggle" aria-label="Quick Actions">
                <span class="fab-icon">📞</span>
            </button>
            <div class="fab-menu">
                <a href="tel:613-XXX-XXXX" class="fab-action phone">
                    <span class="fab-icon">📞</span>
                    <span class="fab-label">Call Now</span>
                </a>
                <a href="mailto:thebritishnanny@gmail.com" class="fab-action email">
                    <span class="fab-icon">✉️</span>
                    <span class="fab-label">Email Us</span>
                </a>
                <a href="potty-training-book.html" class="fab-action book">
                    <span class="fab-icon">📚</span>
                    <span class="fab-label">Get Book</span>
                </a>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .floating-actions {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            .fab-toggle {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: var(--british-red);
                border: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                transition: all 0.3s ease;
            }
            .fab-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(0,0,0,0.2);
            }
            .fab-menu {
                position: absolute;
                bottom: 70px;
                right: 0;
                display: flex;
                flex-direction: column;
                gap: 12px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
            }
            .floating-actions.active .fab-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .fab-action {
                display: flex;
                align-items: center;
                gap: 8px;
                background: var(--white);
                color: var(--british-navy);
                padding: 12px 16px;
                border-radius: 28px;
                text-decoration: none;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                font-weight: 600;
                font-size: 0.9rem;
                white-space: nowrap;
                transition: all 0.3s ease;
            }
            .fab-action:hover {
                background: var(--british-navy);
                color: var(--white);
                transform: translateX(-5px);
            }
            .fab-icon {
                font-size: 1.2rem;
            }
            @media (min-width: 768px) {
                .floating-actions {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(fab);
        
        // Toggle functionality
        const toggle = fab.querySelector('.fab-toggle');
        let isOpen = false;
        
        toggle.addEventListener('click', () => {
            isOpen = !isOpen;
            fab.classList.toggle('active', isOpen);
            
            // Rotate icon
            toggle.style.transform = isOpen ? 'rotate(45deg)' : '';
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!fab.contains(e.target) && isOpen) {
                isOpen = false;
                fab.classList.remove('active');
                toggle.style.transform = '';
            }
        });
        
        // Track interactions
        fab.querySelectorAll('.fab-action').forEach(action => {
            action.addEventListener('click', function() {
                const type = this.classList.contains('phone') ? 'Phone' : 
                           this.classList.contains('email') ? 'Email' : 'Book';
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'FAB',
                        'event_label': type,
                        'value': 1
                    });
                }
            });
        });
    }

    // ==========================================
    // BOOK FEATURE HIGHLIGHTING
    // ==========================================
    
    function initBookFeature() {
        const bookFeatures = document.querySelectorAll('.book-feature-hero, .book-connection');
        
        bookFeatures.forEach(feature => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transform = 'scale(1.02)';
                        entry.target.style.boxShadow = '0 10px 25px rgba(207, 20, 43, 0.2)';
                        
                        setTimeout(() => {
                            entry.target.style.transform = '';
                            entry.target.style.boxShadow = '';
                        }, 2000);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(feature);
        });
        
        // Track book link clicks
        const bookLinks = document.querySelectorAll('a[href="potty-training-book.html"], .book-link');
        bookLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Cross-Navigation',
                        'event_label': 'Daycare to Book',
                        'value': 1
                    });
                }
                
                console.log('Book link clicked from daycare page');
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .trust-item, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ==========================================
    // EMERGENCY CONTACT BANNER
    // ==========================================
    
    function initEmergencyBanner() {
        if (window.innerWidth > 768) return;
        
        // Check if user has been on page for more than 30 seconds
        setTimeout(() => {
            const banner = document.createElement('div');
            banner.className = 'emergency-contact';
            banner.innerHTML = `
                <a href="tel:613-XXX-XXXX">📞 Call Now for Immediate Enrollment!</a>
            `;
            
            document.body.appendChild(banner);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                banner.style.transform = 'translateY(100%)';
                setTimeout(() => banner.remove(), 300);
            }, 10000);
            
        }, 30000);
    }

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
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

    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    function init() {
        // Core functionality
        initPhoneTracking();
        initContactForm();
        initServiceCards();
        initBookFeature();
        
        // Mobile-specific features
        initTestimonialCarousel();
        initMobileQuickActions();
        initEmergencyBanner();
        
        // Visual enhancements
        initScrollAnimations();
        
        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Daycare page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            });
        }
    }

    // Gallery Carousel Functionality
    function initGalleryCarousel() {
        const track = document.querySelector('.carousel-track');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        if (!track || !items.length) return;
        
        let currentIndex = 0;
        const itemsPerView = window.innerWidth > 768 ? 2 : 1;
        const maxIndex = Math.max(0, items.length - itemsPerView);
        
        // Update carousel position
        function updateCarousel() {
            const slideWidth = 100 / itemsPerView;
            const translateX = -currentIndex * slideWidth;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }
        
        // Navigate to specific slide
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
        }
        
        // Next slide
        function nextSlide() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        // Previous slide
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        
        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Auto-play (optional)
        let autoplayInterval;
        const autoplayDelay = 5000; // 5 seconds
        
        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                if (currentIndex >= maxIndex) {
                    goToSlide(0);
                } else {
                    nextSlide();
                }
            }, autoplayDelay);
        }
        
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }
        
        // Pause autoplay on hover/touch
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);
        track.addEventListener('touchstart', stopAutoplay, { passive: true });
        
        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newItemsPerView = window.innerWidth > 768 ? 2 : 1;
                if (newItemsPerView !== itemsPerView) {
                    location.reload(); // Simple reload for responsive changes
                }
            }, 250);
        });
        
        // Initialize
        updateCarousel();
        startAutoplay();
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            initGalleryCarousel();
        });
    } else {
        init();
        initGalleryCarousel();
    }

    // Export for debugging (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.DaycarePageJS = {
            initPhoneTracking,
            initContactForm,
            initServiceCards,
            initMobileQuickActions,
            throttle,
            debounce
        };
    }

})();