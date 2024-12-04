import { cn } from '@/helpers/utils';
import { forwardRef } from 'react';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import { CreateNestedElement } from './controller';

interface FormProps<T extends FieldValues> extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit' | 'children'> {
  children?: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  withAutoValidate?: boolean;
}

const Form = <T extends FieldValues>(
  { children, onSubmit, className, withAutoValidate, ...props }: FormProps<T>,
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
      {withAutoValidate ? <CreateNestedElement children={children} /> : children}
    </form>
  );
};
export default forwardRef(Form) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;
