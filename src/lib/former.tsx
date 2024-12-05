import yup from '@/helpers/locate';
import { useSelector } from '@/hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ComponentType, useEffect, useState } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

export type OptionsWithForm = Omit<UseFormProps, 'resolver' | 'disabled'>;

const former = <T extends object>(
  WrappedComponent: ComponentType<T>,
  Schema?: yup.AnyObjectSchema,
  options?: OptionsWithForm,
) => {
  const Component: React.FC<T> = props => {
    const { loading } = useSelector(state => state.global);
    const [disabled, setDisabled] = useState(false);
    const form = useForm({
      disabled,
      resolver: Schema && yupResolver(Schema),
      defaultValues: Schema ? options?.defaultValues || Schema.getDefault() : options?.defaultValues,
      ...options,
    });

    useEffect(() => {
      if (form.formState.isSubmitting || form.formState.isSubmitSuccessful) {
        setDisabled(loading);
      }
    }, [loading]);

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
