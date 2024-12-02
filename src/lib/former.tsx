import yup from '@/helpers/locate';
import { useSelector } from '@/hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ComponentType, useEffect, useState } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

export type OptionsWithForm = Omit<UseFormProps, 'resolver' | 'disabled'>;

/**
 * @description this is HOCS for form, reduce code using react hook form
 * @usage wrap former to your component: former(YourComponent,YupSchema?,Option?)
 * and use hook useFormContext provided by react hook form recived data
 * @example
 * import Form from '@/lib/Form'
 * function App() {
 *  const {handleSubmit} = useFormContext<Types>()
 * return (
 *  <Form onSubmit={(handleSubmit(YourlogicFunc))}>
 *  </Form>
 * )
 * }
 * export default former(App,SChema?,config?)
 */
const former = <T extends object>(
  WrappedComponent: ComponentType<T>,
  Schema?: yup.AnyObjectSchema,
  options?: OptionsWithForm,
) => {
  const Component: React.FC<T> = props => {
    const { loading } = useSelector(state => state.global);
    const [disabled, setDisabled] = useState(false);
    const form = useForm({
      ...options,
      disabled,
      resolver: Schema && yupResolver(Schema),
      defaultValues: Schema ? options?.defaultValues || Schema.getDefault() : options?.defaultValues,
    });

    useEffect(() => {
      if (form.formState.isSubmitting || form.formState.isSubmitted) setDisabled(loading);
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
