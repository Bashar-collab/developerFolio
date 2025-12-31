/**
 * Analytics utility functions
 * Supports multiple analytics providers
 */

// Configuration - Set your analytics IDs here
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 (GA4) - Get your Measurement ID from Google Analytics
  // Format: G-XXXXXXXXXX
  GA4_MEASUREMENT_ID: process.env.REACT_APP_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  
  // Plausible Analytics (Privacy-focused alternative)
  // Get your domain from https://plausible.io
  PLAUSIBLE_DOMAIN: process.env.REACT_APP_PLAUSIBLE_DOMAIN || '',
  
  // Enable/disable analytics
  ENABLED: process.env.REACT_APP_ANALYTICS_ENABLED !== 'false',
};

/**
 * Initialize Google Analytics 4
 */
export const initGA4 = () => {
  if (!ANALYTICS_CONFIG.ENABLED || !ANALYTICS_CONFIG.GA4_MEASUREMENT_ID || ANALYTICS_CONFIG.GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

/**
 * Track page view
 * @param {string} path - The page path
 */
export const trackPageView = (path) => {
  if (!ANALYTICS_CONFIG.ENABLED) return;

  // Google Analytics 4
  if (ANALYTICS_CONFIG.GA4_MEASUREMENT_ID && ANALYTICS_CONFIG.GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
        page_path: path,
      });
    }
  }

  // Plausible Analytics
  if (ANALYTICS_CONFIG.PLAUSIBLE_DOMAIN && typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', {
      props: { path },
    });
  }
};

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Additional event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!ANALYTICS_CONFIG.ENABLED) return;

  // Google Analytics 4
  if (ANALYTICS_CONFIG.GA4_MEASUREMENT_ID && ANALYTICS_CONFIG.GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  }

  // Plausible Analytics
  if (ANALYTICS_CONFIG.PLAUSIBLE_DOMAIN && typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, {
      props: eventParams,
    });
  }
};

/**
 * Track button clicks, downloads, etc.
 */
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || window.location.pathname,
  });
};

export const trackDownload = (fileName) => {
  trackEvent('file_download', {
    file_name: fileName,
  });
};

export const trackExternalLink = (url) => {
  trackEvent('external_link_click', {
    link_url: url,
  });
};

