'use client';

import PhoneInput from 'react-phone-number-input';

interface Props {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export default function PhoneInputField({ value, onChange, required, className }: Props) {
  return (
    <div className={`phone-input-wrapper ${className || ''}`}>
      <PhoneInput
        international
        defaultCountry="ES"
        value={value}
        onChange={onChange}
        required={required}
        placeholder="+34 600 000 000"
      />
    </div>
  );
}
