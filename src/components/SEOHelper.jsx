import { useEffect } from 'react';

export default function SEOHelper({ 
  title, 
  description, 
  image, 
  url 
}) {
  useEffect(() => {
    // Limpiar tags SEO anteriores antes de agregar nuevos
    const cleanup = () => {
      document.querySelectorAll('meta[data-seo-tag="true"]').forEach(tag => tag.remove());
    };
    cleanup();

    // Set page title
    document.title = title || 'Tienda de Moda - Sneakers, Bolsos y Ropa Premium';

    // Update or create meta tags
    const setMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"][data-seo-tag="true"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('data-seo-tag', 'true');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"][data-seo-tag="true"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('data-seo-tag', 'true');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    setMetaTag('description', description || 'Descubre nuestra colección premium de sneakers auténticas, bolsos de lujo y ropa de moda. Envío gratis en pedidos superiores a 50€.');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('keywords', 'sneakers, zapatillas, bolsos, moda, ropa premium, Nike, Adidas, Gucci');

    // Open Graph tags
    setOGTag('og:title', title || 'Tienda de Moda Premium');
    setOGTag('og:description', description || 'Descubre nuestra colección premium de sneakers auténticas, bolsos de lujo y ropa de moda.');
    setOGTag('og:image', image || 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=630&fit=crop');
    setOGTag('og:url', url || window.location.href);
    setOGTag('og:type', 'website');

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title || 'Tienda de Moda Premium');
    setMetaTag('twitter:description', description || 'Descubre nuestra colección premium de sneakers auténticas, bolsos de lujo y ropa de moda.');
    setMetaTag('twitter:image', image || 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=630&fit=crop');

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [title, description, image, url]);

  return null;
}
