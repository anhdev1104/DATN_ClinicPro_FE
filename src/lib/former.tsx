import yup from '@/helpers/locate';
import { useSelector } from '@/hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ComponentType } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

export type OptionsWithForm = Omit<UseFormProps, 'resolver' | 'disabled'>;

const former = <T extends object>(
  WrappedComponent: ComponentType<T>,
  Schema?: yup.AnyObjectSchema,
  options?: OptionsWithForm,
) => {
  const Component: React.FC<T> = props => {
    const { loading: disabled } = useSelector(state => state.global);
    const form = useForm({
      disabled,
      resolver: Schema && yupResolver(Schema),
      defaultValues: Schema ? options?.defaultValues || Schema.getDefault() : options?.defaultValues,
      ...options,
    });

    return (
      <FormProvider {...form}>
        <WrappedComponent {...props} />
      </FormProvider>
    );
  };

  Component.displayName = 'HOCWithForm';
  return Component;
};

export default former;
