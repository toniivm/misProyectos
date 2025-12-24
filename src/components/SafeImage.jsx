import React, { useState } from 'react';

const FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='32' fill='%236b7280'>Imagen no disponible</text></svg>";

export default function SafeImage({ src, alt, className, fallback = FALLBACK, showLoader = true, ...rest }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoading(false);
    if (e.target.src !== fallback) {
      e.target.src = fallback;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton loader */}
      {showLoader && isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </div>
  );
}
