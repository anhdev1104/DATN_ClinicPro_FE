import inputer from '@/hocs/inputer';
import {
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  Fieldset,
  FileInput,
  Input,
  InputFactory,
  JsonInput,
  NativeSelect,
  NumberInput,
  PasswordInput,
  PinInput,
  polymorphicFactory,
  Radio,
  Rating,
  SegmentedControl,
  Slider,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useController } from 'react-hook-form';

interface InputProps extends InputFactory {
  staticComponents: InputFactory['staticComponents'] & {
    Password: typeof PasswordInput;
    Group: typeof TextInput;
    Pin: typeof PinInput;
    Checkbox: typeof Checkbox;
    Chip: typeof Chip;
    Color: typeof ColorInput;
    ColorPicker: typeof ColorPicker;
    Form: typeof Fieldset;
    File: typeof FileInput;
    Json: typeof JsonInput;
    Select: typeof NativeSelect;
    Number: typeof NumberInput;
    Radio: typeof Radio;
    Rating: typeof Rating;
    Tab: typeof SegmentedControl;
    Slider: typeof Slider;
    Switch: typeof Switch;
    Textarea: typeof Textarea;
  };
  props: InputFactory['props'] & {
    name: string;
    'aria-controls': string;
  };
}

const BaseInput = polymorphicFactory<InputProps>(({ name, ...props }, ref) => {
  if (typeof props['aria-controls'] === 'string') {
    if (!name) throw 'field name is Required!';
    const { field, fieldState } = useController({ name });
    return <Input error={fieldState.error?.message || fieldState.invalid} {...field} {...props} />;
  }
  return <Input {...props} ref={ref} />;
});

BaseInput.Password = inputer(PasswordInput);
BaseInput.Group = inputer(TextInput);
BaseInput.Pin = inputer(PinInput);
BaseInput.Checkbox = inputer(Checkbox);
BaseInput.Chip = inputer(Chip);
BaseInput.Color = inputer(ColorInput);
BaseInput.ColorPicker = inputer(ColorPicker);
BaseInput.Form = inputer(Fieldset);
BaseInput.Json = inputer(JsonInput);
BaseInput.Select = inputer(NativeSelect);
BaseInput.Radio = inputer(Radio);
BaseInput.Rating = inputer(Rating);
BaseInput.Tab = inputer(SegmentedControl);
BaseInput.Slider = inputer(Slider);
BaseInput.Switch = inputer(Switch);
BaseInput.Textarea = inputer(Textarea);
BaseInput.displayName = 'Input';

export default BaseInput;
