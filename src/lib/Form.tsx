import { cn } from '@/helpers/utils';
import { Children, createElement, forwardRef, isValidElement, useMemo } from 'react';
import { SubmitHandler, useController, useFormContext, useFormState } from 'react-hook-form';

const InputWithController = ({
  child,
}: {
  child: React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}) => {
  if (!child.props.name) throw new TypeError('Field name of input expected a string!');
  const { defaultValues } = useFormState();
  const { fieldState, field } = useController({
    name: child.props.name,
    defaultValue: defaultValues?.[child.props.name] || '',
  });

  const error = useMemo(
    () =>
      typeof child.type !== 'string' && (child.type as React.ComponentType).displayName?.startsWith('@mantine')
        ? 'error'
        : 'aria-errormessage',
    [child.type],
  );
  return createElement(
    child.type,
    {
      [error]: fieldState.error?.message || fieldState.invalid,
      'aria-invalid': fieldState.invalid,
      'aria-selected': fieldState.isTouched,
      'aria-busy': fieldState.isValidating,
      ...field,
      ...child.props,
    },
    child.props?.children,
  );
};

export const CreateNestedElement = ({ children }: { children: React.ReactNode }) => {
  return Children.map(children, child => {
    return isValidElement(child) ? (
      child.props?.name && child.props.name.includes(child.props?.autoComplete) ? (
        <InputWithController child={child} key={child.props.nanme} />
      ) : child.props?.children ? (
        createElement(child.type, child.props, <CreateNestedElement children={child.props.children} />)
      ) : (
        child
      )
    ) : (
      child
    );
  });
};

interface FormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> {
  children?: React.ReactNode;
  onSubmit: SubmitHandler<any>;
}

const Form = forwardRef<HTMLFormElement, FormProps>(({ children, onSubmit, className, ...props }, ref) => {
  const { handleSubmit } = useFormContext();
  return (
    <form ref={ref} className={cn('space-y-6', className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <CreateNestedElement children={children} />
    </form>
  );
});
export default Form;

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
