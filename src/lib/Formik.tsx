import { forwardRef, useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import yup from '@/helpers/locate';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/helpers/utils';
import { useSelector } from '@/hooks/redux';
import { CreateNestedElement } from './Form';

/**
 * @idea Formik library
 * @example
 * <Formik
 * schema={Schema}
 * onSubmit={onSubmit}
 * options={{defaultValues}}
 * >
 * {({formState,...methods}) => (
 *  <div>
 *  </div>
 * )}
 * </Formik>
 */
export type FormikHandler<TFieldValues extends FieldValues> = (
  data: TFieldValues,
  form: UseFormReturn<TFieldValues>,
  event?: React.BaseSyntheticEvent,
) => unknown | Promise<unknown>;

interface FormikProps<T extends FieldValues, Schema>
  extends Omit<React.HTMLProps<HTMLFormElement>, 'children' | 'onSubmit'> {
  onSubmit: FormikHandler<T>;
  schema?: Schema;
  children: (props: UseFormReturn<T>) => React.ReactNode;
  options?: UseFormProps<T>;
  withAutoValidate?: boolean;
}

const Formik = <Schema extends yup.AnyObjectSchema, T extends FieldValues = yup.InferType<Schema>>(
  { children, className, options, onSubmit, schema, withAutoValidate, ...props }: FormikProps<T, Schema>,
  ref: React.Ref<HTMLFormElement>,
) => {
  const { loading } = useSelector(state => state.global);
  const [disabled, setDisabled] = useState(false);
  const form = useForm({
    disabled,
    ...options,
    resolver: schema && yupResolver(schema),
  });

  useEffect(() => {
    if (form.formState.isSubmitting) setDisabled(!disabled);
  }, [loading]);

  return (
    <FormProvider {...form}>
      <form
        ref={ref}
        onSubmit={form.handleSubmit((data, event) => onSubmit(data, form, event))}
        className={cn('space-y-6', className)}
        {...props}
      >
        {withAutoValidate ? <CreateNestedElement children={children(form)} /> : children(form)}
      </form>
    </FormProvider>
  );
};
export default forwardRef(Formik) as <
  Schema extends yup.AnyObjectSchema,
  T extends FieldValues = yup.InferType<Schema>,
>(
  props: FormikProps<T, Schema> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;
