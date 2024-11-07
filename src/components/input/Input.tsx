import { FC } from 'react';
import { SearchIcon } from '../icons';
import { useController } from 'react-hook-form';

interface IInput {
  control: any;
  name?: string;
  type?: string;
  className?: string;
  placeholder: string;
  isGlass?: boolean;
  disabled?: boolean;
  colorGlass?: string;
}

const Input: FC<IInput> = ({
  name = '',
  type = 'text',
  className = '',
  isGlass = false,
  colorGlass = 'text-primary',
  control,
  ...props
}) => {
  const { field } = useController({ control, name });
  return (
    <div className="relative flex-1">
      {isGlass && <SearchIcon className={`absolute top-2/4 -translate-y-2/4 left-[12.5px] ${colorGlass}`} />}
      <input
        {...field}
        id={field.name}
        type={type}
        className={`${className} transition-all w-full h-12 rounded-[9px] border border-borderColor text-primary font-medium bg-[#f3f4f7] outline-none ${isGlass ? 'pl-[55px] pr-5' : 'px-5'}`}
        {...props}
      />
    </div>
  );
};

export default Input;
