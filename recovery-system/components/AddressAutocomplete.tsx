'use client';

import { useEffect, useRef, useState } from 'react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: {
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  }) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

function extractAddressComponents(components: any[]) {
  const get = (type: string) =>
    components?.find((c: any) => c.types?.includes(type))?.long_name || '';

  return {
    line1: [get('street_number'), get('route')].filter(Boolean).join(' ') || '',
    city: get('locality') || get('administrative_area_level_2') || '',
    postalCode: get('postal_code') || '',
    country: get('country') ? get('country').substring(0, 2).toUpperCase() : 'ES',
  };
}

export default function AddressAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder,
  className,
  required,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !inputRef.current) return;

    function initAutocomplete() {
      if (!inputRef.current || !(window as any).google?.maps?.places) return;
      if (autocompleteRef.current) return;

      const autocomplete = new (window as any).google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
          const addr = extractAddressComponents(place.address_components);
          onChange(addr.line1);
          onAddressSelect?.(addr);
        }
      });

      autocompleteRef.current = autocomplete;
      setLoaded(true);
    }

    if (!(window as any).google?.maps?.places) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=es`;
      script.async = true;
      script.defer = true;
      script.onload = () => initAutocomplete();
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, [onChange, onAddressSelect]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Calle, número, ciudad...'}
        className={className || 'input-premium'}
        autoComplete="street-address"
      />
      {!loaded && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8791a1] border-t-transparent" />
        </div>
      )}
    </div>
  );
}
