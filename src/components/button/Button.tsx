import React from 'react';

const Button = ({ className, children }) => {
  return (
    <button
      className={`capitalize text-base px-5 py-[5px] bg-primary rounded-[18px] text-white hover:scale- transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
