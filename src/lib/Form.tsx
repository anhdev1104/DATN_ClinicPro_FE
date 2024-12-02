import { cn } from '@/helpers/utils';
import { forwardRef } from 'react';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { CreateNestedElement } from './controller';

interface FormProps<T extends FieldValues> extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit' | 'children'> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>(
  { children, onSubmit, className, ...props }: FormProps<T>,
  ref: React.Ref<HTMLFormElement>,
) => {
  const { handleSubmit } = useFormContext();
  return (
    <form
      ref={ref}
      className={cn('space-y-6', className)}
      onSubmit={handleSubmit(onSubmit as SubmitHandler<any>)}
      {...props}
    >
      <CreateNestedElement children={children} />
    </form>
  );
};
export default forwardRef(Form) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;

/**
 * @author https://github.com/seaesa 
 * @description this is lib remove Controller component in your code, usage with former hocs
 * @important name of each input field must have [autoComplete and name] with the same value to be work
 * @validation if you use mantine input component in base folder you don't wories about validate
 * if you use other input Component, you can check validate from [aria-invalid,aria-errormessage] props when error occur
 * @example instead this: 
 * <form onSubmit={handleSubmit(...)}>
 * <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => {
        return (
          <input 
            type="password"
            {...field}
          />
        );
      }}
    />
 * <form/>
  to this: 
  import Form from '@/lib/Form';
  <Form onSubmit={handleSubmit(...)}>
  <input
    type="password"
    autoComplete='password'
    name="password"
    />
  <Form/> 
  /> 
 */
