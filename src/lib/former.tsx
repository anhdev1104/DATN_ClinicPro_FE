import yup from '@/utils/locate';
import { useSelector } from '@/hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { ComponentType } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

/**
 * @author: https://github.com/seaesa
 * @description: this is HOCS for form, serves logic reuse, this partern use react hook form combine with yup validation
 * @recomented : I highly recommented use yup at second parameter to handling error
 * @warning :second parameter is yup object schema, each field of schema must have .default('') or .ensure() to ensure the correctness of the data
 * if you dont want use recommented below you can custom defaultValues of useForm in three parameter
 * @note : don't wrap memo outside former, to use memo wrap it inside former like: former(memo(Component),schema,ontions)
 * @package: using useFormContext provide by react-hook-form to recived data
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

    const form = useForm({
      ...options,
      resolver: Schema && yupResolver(Schema),
      mode: options?.mode,
      disabled: loading,
      defaultValues: Schema ? Schema.getDefault() : options?.defaultValues,
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
