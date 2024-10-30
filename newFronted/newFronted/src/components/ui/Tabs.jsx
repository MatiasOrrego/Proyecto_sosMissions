import React, { useState } from 'react';

export const Tabs = ({ children, className, ...props }) => {
  return (
    <div className={`tabs ${className}`} {...props}>
      {children}
    </div>
  );
};

export const TabsList = ({ children, className, ...props }) => {
  return (
    <div className={`flex border-b ${className}`} {...props}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ children, className, isActive, onClick, ...props }) => {
  return (
    <button
      className={`p-2 ${isActive ? 'border-b-2 border-blue-500' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, className, isActive, ...props }) => {
  return (
    <div className={`p-4 ${isActive ? 'block' : 'hidden'} ${className}`} {...props}>
      {children}
    </div>
  );
};