export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export function trackMetaEvent(name, params = {}, custom = false) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (custom) {
    window.fbq('trackCustom', name, params);
  } else {
    window.fbq('track', name, params);
  }
}
