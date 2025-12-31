import { useEffect } from 'react';
import { trackPageView, initGA4 } from '../../utils/analytics';

/**
 * Analytics component that tracks page views
 * Add this component to your App.js or Main.js
 */
const Analytics = () => {
  useEffect(() => {
    // Initialize analytics
    initGA4();
    
    // Track initial page view
    trackPageView(window.location.pathname + window.location.search);
    
    // Track page visibility changes (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackPageView(window.location.pathname);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;

