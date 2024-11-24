import React, { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import yup from '@/helpers/locate';
import { yupResolver } from '@hookform/resolvers/yup';
import { cn } from '@/helpers/utils';
import { useSelector } from '@/hooks/redux';

/**
 * @idea Formik library
 * @example
 * <Formik
 * schema={Schema}
 * onSubmit={onSubmit}
 * options={{defaultValues}}
 * >
 * {(form) => (
 *  <div>
 *  </div>
 * )}
 * </Formik>
 */

export type SubmitHandler<S extends FieldValues> = (
  data: S,
  form: UseFormReturn<S>,
  event?: React.BaseSyntheticEvent,
) => unknown | Promise<unknown>;

interface FormikProps<T extends FieldValues, Schema>
  extends Omit<React.HTMLProps<HTMLFormElement>, 'children' | 'onSubmit'> {
  onSubmit: SubmitHandler<T>;
  schema?: Schema;
  children: (props: UseFormReturn<T>) => React.ReactNode;
  options?: UseFormProps<T>;
}

export const Formik = <Schema extends yup.AnyObjectSchema, T extends FieldValues = yup.InferType<Schema>>({
  children,
  className,
  options,
  onSubmit,
  schema,
  ...props
}: FormikProps<T, Schema>) => {
  const { loading } = useSelector(state => state.global);
  const [disabled, setDisabled] = useState(false);
  const form = useForm({ ...options, disabled, resolver: schema && yupResolver(schema) });

  useEffect(() => {
    if (form.formState.isSubmitting) setDisabled(!disabled);
    return () => setDisabled(false);
  }, [loading]);

  return (
    <FormProvider {...form}>
      <form
        className={cn('space-y-6', className)}
        onSubmit={form.handleSubmit((data, event) => onSubmit(data, form, event))}
        {...props}
      >
        {children(form)}
      </form>
    </FormProvider>
  );
};
