/**
 * GDPR-Compliant Cookie Consent System
 * Blocks Google Analytics until consent is given
 */

(function() {
    'use strict';

    const GA_MEASUREMENT_ID = 'G-J0JMKSKNY7';
    const CONSENT_COOKIE_NAME = 'gdpr_consent';
    const CONSENT_DURATION_DAYS = 365;

    const CookieConsent = {
        hasInitialized: false,
        consentGiven: null,

        init() {
            if (this.hasInitialized) return;
            this.hasInitialized = true;

            this.blockGoogleAnalytics();

            const consent = this.getConsent();
            this.consentGiven = consent;

            if (consent === null) {
                this.showBanner();
            } else if (consent === true) {
                this.enableGoogleAnalytics();
            }

            this.injectStyles();
            this.setupFooterLinks();
        },

        blockGoogleAnalytics() {
            window['ga-disable-' + GA_MEASUREMENT_ID] = true;
            window['gtag'] = function() {
                console.log('Google Analytics blocked - no consent given');
            };

            this.deleteGoogleAnalyticsCookies();
        },

        enableGoogleAnalytics() {
            delete window['ga-disable-' + GA_MEASUREMENT_ID];

            if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
                const script = document.createElement('script');
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
                document.head.appendChild(script);
            }

            window.dataLayer = window.dataLayer || [];
            window.gtag = function() { dataLayer.push(arguments); };
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID, {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
            });
        },

        disableGoogleAnalytics() {
            window['ga-disable-' + GA_MEASUREMENT_ID] = true;
            this.deleteGoogleAnalyticsCookies();
        },

        deleteGoogleAnalyticsCookies() {
            const cookies = document.cookie.split(';');
            const gaCookies = ['_ga', '_gid', '_gat', '_ga_' + GA_MEASUREMENT_ID.replace('G-', '')];

            cookies.forEach(cookie => {
                const eqPos = cookie.indexOf('=');
                const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

                if (gaCookies.some(gaCookie => name.startsWith(gaCookie))) {
                    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
                    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + window.location.hostname;
                    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + window.location.hostname;
                }
            });
        },

        setConsent(value) {
            const date = new Date();
            date.setTime(date.getTime() + (CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000));
            document.cookie = `${CONSENT_COOKIE_NAME}=${value};expires=${date.toUTCString()};path=/;SameSite=Strict`;
            this.consentGiven = value;
        },

        getConsent() {
            const name = CONSENT_COOKIE_NAME + '=';
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookies = decodedCookie.split(';');

            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.indexOf(name) === 0) {
                    const value = cookie.substring(name.length);
                    return value === 'true';
                }
            }
            return null;
        },

        resetConsent() {
            document.cookie = `${CONSENT_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            this.consentGiven = null;
            this.deleteGoogleAnalyticsCookies();
            this.disableGoogleAnalytics();
            this.showBanner();
        },

        acceptCookies() {
            this.setConsent(true);
            this.hideBanner();
            this.enableGoogleAnalytics();
        },

        rejectCookies() {
            this.setConsent(false);
            this.hideBanner();
            this.deleteGoogleAnalyticsCookies();
            this.disableGoogleAnalytics();
        },

        showBanner() {
            const existingBanner = document.getElementById('cookie-consent-banner');
            if (existingBanner) {
                existingBanner.style.display = 'flex';
                return;
            }

            const banner = document.createElement('div');
            banner.id = 'cookie-consent-banner';
            banner.className = 'cookie-consent-banner';
            banner.innerHTML = `
                <div class="cookie-consent-content">
                    <div class="cookie-consent-text">
                        <h3>Cookie Consent</h3>
                        <p>We use cookies to analyze website traffic and optimize your experience. By accepting, your data will be aggregated with all other user data.</p>
                    </div>
                    <div class="cookie-consent-actions">
                        <button class="cookie-consent-btn cookie-accept-btn" onclick="CookieConsent.acceptCookies()">
                            Accept Analytics
                        </button>
                        <button class="cookie-consent-btn cookie-reject-btn" onclick="CookieConsent.rejectCookies()">
                            Reject
                        </button>
                        <button class="cookie-consent-btn cookie-settings-btn" onclick="CookieConsent.showSettings()">
                            Settings
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(banner);
        },

        hideBanner() {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.style.display = 'none';
            }
        },

        showSettings() {
            const existingModal = document.getElementById('cookie-settings-modal');
            if (existingModal) {
                existingModal.style.display = 'flex';
                return;
            }

            const currentConsent = this.getConsent();
            const isChecked = currentConsent === true ? 'checked' : '';

            const modal = document.createElement('div');
            modal.id = 'cookie-settings-modal';
            modal.className = 'cookie-settings-modal';
            modal.innerHTML = `
                <div class="cookie-settings-content">
                    <div class="cookie-settings-header">
                        <h2>Cookie Preferences</h2>
                        <button class="cookie-close-btn" onclick="CookieConsent.closeSettings()">&times;</button>
                    </div>
                    <div class="cookie-settings-body">
                        <div class="cookie-category">
                            <h3>Essential Cookies</h3>
                            <p>These cookies are necessary for the website to function and cannot be disabled.</p>
                            <label class="cookie-switch disabled">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <div class="cookie-category">
                            <h3>Analytics Cookies</h3>
                            <p>We use Google Analytics to understand how visitors interact with our website. This helps us improve our services.</p>
                            <label class="cookie-switch">
                                <input type="checkbox" id="analytics-toggle" ${isChecked} onchange="CookieConsent.toggleAnalytics(this.checked)">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <div class="cookie-info">
                            <p><strong>Note:</strong> You can change your preferences at any time using the "Cookie Preferences" link in the footer.</p>
                        </div>
                    </div>
                    <div class="cookie-settings-footer">
                        <button class="cookie-consent-btn cookie-save-btn" onclick="CookieConsent.saveSettings()">
                            Save Preferences
                        </button>
                        <button class="cookie-consent-btn cookie-reset-btn" onclick="CookieConsent.resetAndClose()">
                            Reset Consent
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        },

        closeSettings() {
            const modal = document.getElementById('cookie-settings-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        },

        toggleAnalytics(enabled) {
            if (enabled) {
                this.enableGoogleAnalytics();
            } else {
                this.disableGoogleAnalytics();
            }
        },

        saveSettings() {
            const analyticsToggle = document.getElementById('analytics-toggle');
            if (analyticsToggle) {
                this.setConsent(analyticsToggle.checked);
                if (analyticsToggle.checked) {
                    this.enableGoogleAnalytics();
                } else {
                    this.disableGoogleAnalytics();
                }
            }
            this.closeSettings();
            this.hideBanner();
        },

        resetAndClose() {
            this.resetConsent();
            this.closeSettings();
        },

        setupFooterLinks() {
            document.addEventListener('click', (e) => {
                if (e.target.matches('[data-cookie-settings]')) {
                    e.preventDefault();
                    this.showSettings();
                }
                if (e.target.matches('[data-cookie-reset]')) {
                    e.preventDefault();
                    if (confirm('This will reset your cookie consent and reload the page. Continue?')) {
                        this.resetConsent();
                        window.location.reload();
                    }
                }
            });
        },

        injectStyles() {
            if (document.getElementById('cookie-consent-styles')) return;

            const style = document.createElement('style');
            style.id = 'cookie-consent-styles';
            style.textContent = `
                .cookie-consent-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #012169 0%, #023788 100%);
                    color: #fff;
                    padding: 1.5rem;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                .cookie-consent-content {
                    max-width: 1200px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                @media (min-width: 768px) {
                    .cookie-consent-content {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
                }

                .cookie-consent-text h3 {
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                    color: #fff;
                    font-family: 'Merriweather', serif;
                }

                .cookie-consent-text p {
                    font-size: 0.95rem;
                    line-height: 1.5;
                    opacity: 0.95;
                    margin: 0;
                }

                .cookie-consent-actions {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                @media (min-width: 768px) {
                    .cookie-consent-actions {
                        justify-content: flex-end;
                        flex-wrap: nowrap;
                    }
                }

                .cookie-consent-btn {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 5px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: 'Open Sans', sans-serif;
                    white-space: nowrap;
                }

                .cookie-accept-btn {
                    background: #FFD700;
                    color: #012169;
                }

                .cookie-accept-btn:hover {
                    background: #FFC700;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
                }

                .cookie-reject-btn {
                    background: transparent;
                    color: #fff;
                    border: 2px solid #fff;
                }

                .cookie-reject-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }

                .cookie-settings-btn {
                    background: rgba(255, 255, 255, 0.2);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .cookie-settings-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }

                .cookie-settings-modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 10000;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .cookie-settings-content {
                    background: #fff;
                    border-radius: 10px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    animation: scaleIn 0.3s ease-out;
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .cookie-settings-header {
                    background: linear-gradient(135deg, #012169 0%, #023788 100%);
                    color: #fff;
                    padding: 1.5rem;
                    border-radius: 10px 10px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .cookie-settings-header h2 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-family: 'Merriweather', serif;
                    color: #fff;
                }

                .cookie-close-btn {
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 2rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .cookie-close-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .cookie-settings-body {
                    padding: 2rem;
                }

                .cookie-category {
                    margin-bottom: 2rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid #e0e0e0;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 2rem;
                }

                .cookie-category:last-child {
                    border-bottom: none;
                }

                .cookie-category h3 {
                    color: #012169;
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                    font-family: 'Merriweather', serif;
                }

                .cookie-category p {
                    color: #6C757D;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    flex: 1;
                }

                .cookie-switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 28px;
                    flex-shrink: 0;
                }

                .cookie-switch.disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .cookie-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .cookie-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 28px;
                }

                .cookie-slider:before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: 0.4s;
                    border-radius: 50%;
                }

                input:checked + .cookie-slider {
                    background-color: #FFD700;
                }

                input:checked + .cookie-slider:before {
                    transform: translateX(32px);
                }

                .cookie-switch.disabled .cookie-slider {
                    cursor: not-allowed;
                }

                .cookie-info {
                    background: #F8F9FA;
                    padding: 1rem;
                    border-radius: 5px;
                    margin-top: 1rem;
                }

                .cookie-info p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #6C757D;
                }

                .cookie-settings-footer {
                    padding: 1.5rem;
                    background: #F8F9FA;
                    border-top: 1px solid #e0e0e0;
                    border-radius: 0 0 10px 10px;
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .cookie-save-btn {
                    background: #FFD700;
                    color: #012169;
                }

                .cookie-save-btn:hover {
                    background: #FFC700;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
                }

                .cookie-reset-btn {
                    background: #CF142B;
                    color: #fff;
                }

                .cookie-reset-btn:hover {
                    background: #B91228;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(207, 20, 43, 0.3);
                }

                @media (max-width: 640px) {
                    .cookie-settings-content {
                        max-height: 100vh;
                        border-radius: 0;
                    }

                    .cookie-settings-header {
                        border-radius: 0;
                    }

                    .cookie-settings-footer {
                        border-radius: 0;
                    }

                    .cookie-category {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .cookie-switch {
                        align-self: flex-start;
                    }
                }

                .cookie-footer-link {
                    color: #012169;
                    text-decoration: underline;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .cookie-footer-link:hover {
                    color: #CF142B;
                }
            `;
            document.head.appendChild(style);
        }
    };

    window.CookieConsent = CookieConsent;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
    } else {
        CookieConsent.init();
    }
})();