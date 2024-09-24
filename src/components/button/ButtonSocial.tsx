import React, { FC } from 'react';
import LoadingSpin from '../loading/LoadingSpin';
import { IButton } from './Button';

interface IButtonSocial extends IButton {
  image: string;
}

const ButtonSocial: FC<IButtonSocial> = ({
  type,
  image = '',
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
      className={`w-full p-2 h-[40px] border rounded-md text-black font-medium flex items-center justify-center mb-2 bg-gray-100 hover:bg-white transition-all duration-300 ease-linear ${
        disabled && 'opacity-50 pointer-events-none'
      } ${className}`}
      {...props}
      onClick={onClick}
    >
      <img className="w-[30px] object-cover mr-2" src={image} />
      <span className="text-[13px]">{child}</span>
    </button>
  );
};

export default ButtonSocial;
