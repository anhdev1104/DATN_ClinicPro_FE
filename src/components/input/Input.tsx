import { FC } from 'react';
import { SearchIcon } from '../icons';
import { useController } from 'react-hook-form';

interface IInput {
  control?: any;
  name?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  isGlass?: boolean;
}

const Input: FC<IInput> = ({ name = '', type = 'text', className = '', isGlass = false, control, ...props }) => {
  const { field } = useController({ control, name, defaultValue: '' });
  return (
    <div className="relative flex-1">
      {isGlass && <SearchIcon className="text-primary absolute top-[12.5px] left-[12.5px]" />}
      <input
        {...field}
        id={field.name}
        type={type}
        className={`${className} transition-all w-full h-12 rounded-[9px] border border-borderColor text-primary font-medium bg-[#f3f4f7] outline-none ${isGlass ? 'pl-[55px]' : 'px-5'}`}
        {...props}
      />
    </div>
  );
};

export default Input;
