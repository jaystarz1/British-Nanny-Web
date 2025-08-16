// Book page navigation fix
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    ready(function() {
        console.log('Book navigation fix initializing...');
        
        // Fix anchor navigation
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        console.log(`Found ${anchorLinks.length} anchor links`);
        
        anchorLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip empty or just # links
            if (!href || href === '#' || href === '#main-content') return;
            
            link.addEventListener('click', function(e) {
                console.log(`Navigating to ${href}`);
                
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    
                    // Calculate position accounting for sticky header
                    const header = document.querySelector('.site-header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, href);
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.querySelector('.mobile-menu-overlay')?.classList.remove('active');
                        document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    console.log(`Scrolled to ${href}`);
                } else {
                    console.error(`Target not found: ${href}`);
                }
            });
        });
        
        // Debug: List all sections
        const sections = ['overview', 'inside', 'author', 'reviews', 'faq'];
        sections.forEach(id => {
            const elem = document.getElementById(id);
            console.log(`Section #${id}: ${elem ? 'exists' : 'MISSING'}`);
        });
    });
})();