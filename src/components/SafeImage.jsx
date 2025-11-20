import React from 'react';

const FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter,Arial' font-size='32' fill='%236b7280'>Imagen no disponible</text></svg>";

export default function SafeImage({ src, alt, className, fallback = FALLBACK, ...rest }) {
  const handleError = (e) => {
    if (e.target.src !== fallback) {
      e.target.src = fallback;
    }
  };
  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      decoding="async"
      className={className}
      onError={handleError}
      {...rest}
    />
  );
}
