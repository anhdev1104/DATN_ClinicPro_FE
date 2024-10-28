import { FC, ReactNode } from 'react';

interface ILabel {
  htmlFor?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Label: FC<ILabel> = ({ htmlFor = '', className = '', onClick = () => {}, children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium cursor-pointer text-[#333] inline-block mb-1 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
