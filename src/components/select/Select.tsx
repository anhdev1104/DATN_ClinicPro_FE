import { cn, convertStringToASCII } from '@/lib/utils';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { forwardRef, useState } from 'react';
import { v4 } from 'uuid';

type DataProps = {
  name: string;
};
interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  data: DataProps[];
}
const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ placeholder = '', className, type = 'text', autoComplete = '', data, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState(data);
    const [value, setValue] = useState('');
    const handleFocusInput = () => {
      setVisible(true);
    };

    const handleBlurInput = () => {
      setVisible(false);
    };
    const handleSearchValue = (value: string) => {
      const option = data.filter(option => {
        return convertStringToASCII(option.name).includes(convertStringToASCII(value));
      });
      setOptions(option);
    };
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      handleSearchValue(e.target.value);
    };
    const handleSetValue = (_: React.MouseEvent, data: DataProps) => {
      setValue(data.name);
      setVisible(false);
    };
    return (
      <>
        <div className="relative">
          <div className="cursor-pointer w-full flex justify-between items-center px-2 rounded-lg border-[#ececed] border border-solid bg-[#f3f4f7] h-12">
            <input
              ref={ref}
              value={value}
              onChange={handleChangeValue}
              onClick={handleFocusInput}
              onBlur={handleBlurInput}
              className={cn(
                'cursor-pointer flex-1 h-full w-full bg-transparent outline-none text-base text-[#cecece]',
                className,
              )}
              placeholder={placeholder}
              type={type}
              autoComplete={autoComplete}
              {...props}
            />
            <div className="text-3xl h-full flex items-center text-primary">
              <KeyboardArrowDownRoundedIcon fontSize="inherit" />
            </div>
          </div>
          <div
            className={cn(
              'z-10 bg-white absolute top-full w-full cursor-pointer hidden flex-col border shadow-xl overflow-y-auto max-h-72',
              {
                flex: visible,
              },
            )}
          >
            <span
              className={cn('py-2 px-4 text-[13px] hover:bg-[#f4f4f8] hover:font-semibold text-primary font-semibold', {
                hidden: options.length <= 0,
              })}
            >
              {placeholder}
            </span>
            {options.length > 0 ? (
              options.map(data => (
                <span
                  onMouseDown={e => handleSetValue(e, data)}
                  className="py-2 px-4 text-[13px] hover:bg-[#f4f4f8] hover:font-semibold"
                  key={v4()}
                >
                  {data.name}
                </span>
              ))
            ) : (
              <span className="py-2 px-4 text-[13px] hover:bg-[#f4f4f8] hover:font-semibold">
                không có kết quả hiển thị
              </span>
            )}
          </div>
        </div>
      </>
    );
  },
);

export default Select;
