import { factory, PinInput, PinInputFactory, PinInputProps } from '@mantine/core';
import { DatePickerInput, DatePickerInputFactory, DatePickerInputProps } from '@mantine/dates';

interface BasePinInputProps extends PinInputFactory {
  props: PinInputProps & Omit<React.InputHTMLAttributes<React.HTMLInputAutoCompleteAttribute>, keyof PinInputProps>;
}
export const BasePinInput = factory<BasePinInputProps>(({ ...props }, ref) => {
  return <PinInput {...props} ref={ref} />;
});
BasePinInput.displayName = '@mantine/core/PinInput';

interface BaseDateInputProps extends DatePickerInputFactory {
  props: DatePickerInputProps & React.InputHTMLAttributes<React.HTMLInputAutoCompleteAttribute>;
}
export const BaseDateInput = factory<BaseDateInputProps>((props, ref) => {
  return <DatePickerInput ref={ref} {...(props as any)} />;
});
BaseDateInput.displayName = '@mantine/core/DatePickerInput';
