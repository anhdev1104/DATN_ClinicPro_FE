import { FC, ReactNode } from 'react';

interface ILabel {
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

const Label: FC<ILabel> = ({ htmlFor = '', className = '', children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-medium cursor-pointer text-[#333] inline-block mb-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
