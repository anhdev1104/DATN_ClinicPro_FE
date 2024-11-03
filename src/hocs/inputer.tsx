import { factory, FactoryPayload, MantineComponent } from '@mantine/core';
import { useController } from 'react-hook-form';

/**
 * @description this is hoc wrap in input from @/components/base/input combine with former to avoid component unnecsessary
 * @warning only for mantive input component
 * @required wrap former to your component, aria-controls, name must have in mantive input component
 * @example @/pages/client/ForgotPassword
 */

const inputer = <T extends FactoryPayload>(ComponentWrapped: MantineComponent<T>) => {
  const Component = factory<T>(({ name, ...props }, ref) => {
    if (typeof props['aria-controls'] === 'string') {
      if (!name) throw 'field name is Required!';

      const { field, fieldState } = useController({ name });
      return (
        <ComponentWrapped
          {...(props as any)}
          {...field}
          error={fieldState.error?.message || fieldState.invalid}
          ref={ref}
        />
      );
    }

    return <ComponentWrapped {...(props as any)} ref={ref} />;
  });
  return Component;
};
export default inputer;
