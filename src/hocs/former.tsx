import yup from '@/utils/locate';
import { useSelector } from '@/hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ComponentType } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

/**
 * @description: this is HOCS for form, serves logic reuse, this partern use react hook form combine with yup validation
 * @warning :second parameter is yup object schema, each field of schema must have .default('') or .ensure() to ensure the correctness of the data
 * if you dont want use recommented below you can custom defaultValues of useForm in three parameter
 * @package using useFormContext provide by react-hook-form to recived data
 * @example:
 * function App() {
 *  const {handleSubmit} = useFormContext<Types>()
 * return <form onSubmit(handleSubmit(YourlogicFunc))>
 *  </form>
 * }
 * export default former(App,SChema?,config?)
 */

export type OptionsWithForm = Omit<UseFormProps, 'resolver' | 'disabled'>;
const former = <T extends object>(
  WrappedComponent: ComponentType<T>,
  Schema?: yup.AnyObjectSchema,
  options?: OptionsWithForm,
) => {
  const Component: React.FC<T> = props => {
    const { loading } = useSelector(state => state.global);

    const methods = useForm({
      ...options,
      resolver: Schema && yupResolver(Schema),
      disabled: loading,
      defaultValues: Schema ? Schema.getDefault() : options?.defaultValues,
    });

    return (
      <FormProvider {...methods}>
        <WrappedComponent {...props} />
      </FormProvider>
    );
  };

  Component.displayName = 'HOCWithForm';
  return Component;
};

export default former;
