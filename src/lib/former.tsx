import yup from '@/utils/locate';
import { useSelector } from '@/hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentType, FormEventHandler, useEffect, useState } from 'react';
import { FieldValues, SubmitErrorHandler, SubmitHandler, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';

/**
 * @description: this is HOCS for form, serves logic reuse, this partern use react hook form combine with yup validation
 * @warning :second parameter is yup object schema and each field must have .default('') or .ensure() to ensure the correctness of the data
 * if you dont want use recommented below you can custom form defaultValues with three parameter
 * @note : don't wrap memo outside former, to use memo wrap it inside former like: former(memo(Component),schema,ontions)
 * @author: https://github.com/seaesa
 */

export interface HocFormProps extends Omit<UseFormReturn, 'handleSubmit'>, OptionsWithForm {
  loading: boolean;
  handleSubmit: <T extends FieldValues>(
    onvalid: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T>
  ) => FormEventHandler<HTMLFormElement>;
}

export type OptionsWithForm = Partial<Omit<UseFormProps, 'resolver' | 'disabled'>>;

const former = <T extends HocFormProps>(
  WrappedComponent: ComponentType<T>,
  Schema: yup.AnyObjectSchema,
  options?: OptionsWithForm
) => {
  const Component: React.FC<Omit<T, keyof Omit<HocFormProps, keyof OptionsWithForm>>> = ({
    mode,
    defaultValues,
    ...props
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { loading } = useSelector(state => state.global);
    const form = useForm({
      resolver: yupResolver(Schema),
      mode: options?.mode || mode,
      disabled: loading,
      defaultValues: options?.defaultValues || defaultValues || Schema.cast({}),
      ...options
    });

    useEffect(() => {
      setIsLoading(loading);
    }, [form.formState.disabled]);

    return <WrappedComponent {...(props as T)} {...form} loading={isLoading} />;
  };

  Component.displayName = 'HOCWithForm';
  return Component;
};

export default former;
