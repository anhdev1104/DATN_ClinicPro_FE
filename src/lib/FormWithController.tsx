/**
 * @warning during development, don't use!!
 * @description this is component reduce Controller everywhere
 * @example instead this: 
 *  <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <BaseInput.Password
                      radius="md"
                      className="w-full"
                      label="mật khẩu hiện tại"
                      error={fieldState.error?.message}
                      type="password"
                      autoComplete="password"
                      {...field}
                    />
                  );
                }}
              />
  to this: 
    <BaseInput.Password
    name="password"
    radius="md"
    className="w-full"
    label="mật khẩu hiện tại" 
    type="password"
    autoComplete="password" 
  />
    @important name of each input field is required
 */

import React, { forwardRef, memo } from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormProps extends React.HTMLProps<HTMLFormElement> {
  children: React.ReactNode;
  control: Control<any>;
}

const FormWithController = forwardRef<HTMLFormElement, FormProps>(({ children, control, ...props }, ref) => {
  return (
    <form {...props} ref={ref}>
      {React.Children.map(children, child => {
        console.log(child);
        return React.isValidElement(child) && child.type === 'input' ? (
          <Controller
            key={child.props.name}
            control={control}
            name={child.props.name}
            render={({ field, fieldState }) =>
              React.createElement(child.type, {
                ...child.props,
                ...field,
                error: fieldState.error?.message || fieldState.invalid,
              })
            }
          />
        ) : (
          child
        );
      })}
    </form>
  );
});
FormWithController.displayName = 'Form';
export default memo(FormWithController);
