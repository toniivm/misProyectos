import React from 'react';

export default function Button({ as: Tag = 'button', variant = 'primary', size = 'md', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-900 focus-visible:ring-black',
    secondary: 'bg-white text-black border border-gray-300 hover:bg-gray-100 focus-visible:ring-black',
    ghost: 'bg-transparent text-black hover:bg-gray-100',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;
  return (
    <Tag className={cls} {...props}>
      {children}
    </Tag>
  );
}
