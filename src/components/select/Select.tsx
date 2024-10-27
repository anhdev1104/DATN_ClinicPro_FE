import useToggle from '@/hooks/useToggle';
import { FC } from 'react';
import { useController, Control } from 'react-hook-form';
import { ArrowDropDownIcon, ArrowDropUpIcon } from '../icons';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  control: Control<any>;
  options: Option[];
  name: string;
  placeholder: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ control, options, name, placeholder }) => {
  const { field } = useController({ name, control, defaultValue: '' });
  const { show, handleToggle } = useToggle();
  const selectedOption = options.find(option => option.value === field.value);

  const handleSelect = (value: string | number) => {
    field.onChange(value);
    handleToggle();
  };

  return (
    <div className="relative">
      <div
        className="h-10 min-w-[250px] px-4 bg-[#f3f4f7] flex items-center justify-between cursor-pointer rounded-md"
        onClick={handleToggle}
      >
        <span className="line-clamp-1">{selectedOption?.label || placeholder}</span>
        <span>{show ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
      </div>

      {show && (
        <ul className="absolute mt-1 bg-white shadow-lg rounded-md w-full z-20 max-h-60 overflow-y-auto scroll-select">
          {options.length > 0 &&
            options.map(option => (
              <li
                key={option.value}
                className={`py-2 px-3 cursor-pointer hover:bg-gray-200/70 ${field.value === option.value ? 'bg-gray-100/80' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
