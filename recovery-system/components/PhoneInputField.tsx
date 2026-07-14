'use client';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  className?: string;
}

export default function PhoneInputField({ value, onChange, onBlur, required, className }: Props) {
  return (
    <div className={`phone-input-wrapper ${className || ''}`}>
      <PhoneInput
        international
        defaultCountry="ES"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder="+34 600 000 000"
      />
    </div>
  );
}
