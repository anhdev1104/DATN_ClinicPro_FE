import { factory, PinInput, PinInputFactory, PinInputProps } from '@mantine/core';
interface BasePinInputProps extends PinInputFactory {
  props: PinInputProps & Omit<React.InputHTMLAttributes<React.HTMLInputAutoCompleteAttribute>, keyof PinInputProps>;
}
export const BasePinInput = factory<BasePinInputProps>(({ ...props }, ref) => {
  return <PinInput {...props} ref={ref} />;
});
BasePinInput.displayName = '@mantine/core/PinInput';
