import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;