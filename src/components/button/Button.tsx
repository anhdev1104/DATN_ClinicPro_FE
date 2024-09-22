import React, { FC } from 'react';
import LoadingSpin from '../loading/LoadingSpin';

type ButtonType = 'submit' | 'button';

interface IButton {
  type: ButtonType;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<IButton> = ({
  type,
  className = '',
  isLoading = false,
  disabled = false,
  onClick = () => {},
  children,
  ...props
}) => {
  const child = isLoading ? <LoadingSpin /> : children;

  return (
    <button
      type={type}
      className={`capitalize text-base px-5 py-[5px] bg-primary rounded-[18px] text-white hover:scale- transition-all duration-300 ease-linear disabled:bg-gray-300/60 disabled:pointer-events-none hover:scale-105 hover:bg-primary ${
        disabled && 'opacity-50 pointer-events-none'
      } ${className}`}
      {...props}
      onClick={onClick}
    >
      {child}
    </button>
  );
};

export default Button;
