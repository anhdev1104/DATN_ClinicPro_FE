import { FC } from 'react';
import { SearchIcon } from '../icons';

interface IInput {
  identifier?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  isGlass?: boolean;
}

const Input: FC<IInput> = ({ identifier = '', type = 'text', className = '', isGlass = false, ...props }) => {
  return (
    <div className="relative flex-1">
      {isGlass && <SearchIcon className="text-primary absolute top-[12.5px] left-[12.5px]" />}
      <input
        name={identifier}
        id={identifier}
        type={type}
        className={`${className} w-full h-12 rounded-[9px] border border-borderColor text-primary font-medium bg-[#f3f4f7] outline-none ${isGlass ? 'pl-[55px]' : 'px-5'}`}
        {...props}
      />
    </div>
  );
};

export default Input;
