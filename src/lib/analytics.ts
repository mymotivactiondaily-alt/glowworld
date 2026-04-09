import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    ttq: { track: (...args: unknown[]) => void };
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>): void => {
  // Google Analytics (Traditional)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // Firebase Analytics
  if (analytics) {
    logEvent(analytics, eventName, params);
  }

  // TikTok Pixel
  if (typeof window.ttq?.track === 'function') {
    window.ttq.track(eventName, params);
  }
  
  console.log(`[Analytics] ${eventName}`, params);
};
