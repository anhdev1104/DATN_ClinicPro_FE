import { cn } from '@/utils/utils';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { forwardRef, useState } from 'react';
import styled from '@emotion/styled';
import { SearchIcon } from '@/components/icons';

type MuiInputProps = TextFieldProps & {
  type: React.InputHTMLAttributes<unknown>['type'] | 'search';
};
const MuiInput = forwardRef<HTMLInputElement, MuiInputProps>(
  ({ type = 'text', variant = 'outlined', className, size = 'small', slotProps, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [types] = useState(type === 'search' ? 'text' : type);

    const handleClickShowPassword = () => {
      setShowPassword(show => !show);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    return (
      <>
        <StylesInput
          variant={variant}
          type={types === 'password' ? (showPassword ? 'text' : 'password') : types}
          className={cn('w-full mb-6 relative', className)}
          size={size}
          slotProps={{
            input: {
              endAdornment: type === 'password' && (
                <>
                  <InputAdornment position="start">
                    <IconButton
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge={variant === 'standard' ? 'start' : 'end'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                </>
              ),
              startAdornment: type === 'search' && (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              ...slotProps?.input
            },
            ...slotProps
          }}
          {...props}
          ref={ref}
        />
      </>
    );
  }
);

const StylesInput = styled(TextField)`
  & .MuiFormHelperText-root {
    position: absolute;
    bottom: -24px;
  }
`;
export default MuiInput;
