import React from 'react';

export const Badge = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = 'inline-block px-2 py-1 text-xs font-semibold rounded-full';
  const variantStyles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    outline: 'border border-gray-500 text-gray-500',
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};