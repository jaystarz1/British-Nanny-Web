// Share button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create share button if it doesn't exist
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = document.getElementById('share-menu-inline');
            
            // Toggle menu
            if (menu.style.display === 'none' || !menu.style.display) {
                menu.style.display = 'block';
            } else {
                menu.style.display = 'none';
            }
        });
    }
});

// Share functions
window.shareToLinkedIn = function() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    document.getElementById('share-menu-inline').style.display = 'none';
};

window.shareToFacebook = function() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    document.getElementById('share-menu-inline').style.display = 'none';
};

window.shareToEmail = function() {
    const subject = document.title;
    const url = window.location.href;
    const body = `Check out this page from The British Nanny's Daycare: ${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.getElementById('share-menu-inline').style.display = 'none';
};

window.shareCopyLink = function() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        // Create a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Link copied!';
        tooltip.style.cssText = `
            position: fixed;
            background: #012169;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000000;
            font-size: 14px;
        `;
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    });
    document.getElementById('share-menu-inline').style.display = 'none';
};

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('#share-btn') && !e.target.closest('#share-menu-inline')) {
        const menu = document.getElementById('share-menu-inline');
        if (menu) {
            menu.style.display = 'none';
        }
    }
});