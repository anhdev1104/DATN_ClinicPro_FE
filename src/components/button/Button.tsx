import React, { FC } from 'react';
import LoadingSpin from '../loading/LoadingSpin';
import { cn } from '@/utils/utils';

type ButtonType = 'submit' | 'button';

export interface IButton {
  type: ButtonType;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  styled?: string;
}

const Button: FC<IButton> = ({
  type,
  className = '',
  isLoading = false,
  onClick = () => {},
  styled,
  children,
  ...props
}) => {
  const child = isLoading ? <LoadingSpin /> : children;
  let styledBtn;
  switch (styled) {
    case 'normal':
      styledBtn = 'text-sm px-5 h-[40px] min-w-fit bg-[#dadada] rounded-md min-w-[130px] hover:bg-opacity-70';
      break;

    default:
      styledBtn = `text-base px-5 py-[5px] bg-primary text-white hover:scale-105 hover:bg-primary rounded-[18px]`;
      break;
  }

  return (
    <button
      type={type}
      className={cn(
        'transition-all duration-300 ease-linear flex items-center justify-center outline-none select-none disabled:bg-gray-300/60 disabled:pointer-events-none',
        styledBtn,
        className,
      )}
      {...props}
      onClick={onClick}
    >
      {child}
    </button>
  );
};

export default Button;
