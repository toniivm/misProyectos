// Performance utilities for VALTREX store

/**
 * Prefetch critical images for better perceived performance
 */
export const prefetchImages = (imageUrls) => {
  if (!Array.isArray(imageUrls)) return;
  
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
  console.log(`⚡ [VALTREX Performance] Prefetched ${imageUrls.length} images`);
};

/**
 * Lazy load images using IntersectionObserver
 */
export const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

/**
 * Preconnect to external domains for faster resource loading
 */
export const preconnectDomains = (domains) => {
  domains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  console.log(`⚡ [VALTREX Performance] Preconnected to ${domains.length} domains`);
};

/**
 * Debounce function for search/filter operations
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Log Core Web Vitals
 */
export const logWebVitals = (metric) => {
  const { name, value, id } = metric;
  console.log(`📊 [VALTREX Analytics] ${name}:`, value.toFixed(2), 'ms', `(ID: ${id})`);
  
  // Send to analytics endpoint if available
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }
};

/**
 * Resource hints for better performance
 */
export const addResourceHints = () => {
  // Preconnect to critical third-party domains
  const criticalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://firebasestorage.googleapis.com'
  ];
  
  preconnectDomains(criticalDomains);
  
  // DNS prefetch for other domains
  const dnsPrefetchDomains = [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com'
  ];
  
  dnsPrefetchDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

/**
 * Code splitting helper - load components on demand
 */
export const loadComponentOnDemand = async (importFunc) => {
  try {
    const module = await importFunc();
    return module.default || module;
  } catch (error) {
    console.error('[VALTREX] Error loading component:', error);
    throw error;
  }
};

/**
 * Memory optimization - clear unused cache
 */
export const clearUnusedCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const validCachePrefix = 'valtrex-v';
    
    const deletionPromises = cacheNames
      .filter(name => !name.startsWith(validCachePrefix))
      .map(name => caches.delete(name));
    
    await Promise.all(deletionPromises);
    console.log(`🧹 [VALTREX Performance] Cleared ${deletionPromises.length} old caches`);
  }
};
