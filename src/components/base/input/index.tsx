import {
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  Fieldset,
  Input,
  InputDescription,
  InputError,
  InputFactory,
  InputLabel,
  InputPlaceholder,
  InputWrapper,
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
  TextInput
} from '@mantine/core';
import { FileInput } from 'lucide-react';

interface InputProps extends InputFactory {
  staticComponents: {
    Label: typeof InputLabel;
    Error: typeof InputError;
    Description: typeof InputDescription;
    Placeholder: typeof InputPlaceholder;
    Wrapper: typeof InputWrapper;
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
}
const BaseInput = polymorphicFactory<InputProps>(({ ...props }, ref) => {
  return <Input {...props} ref={ref} />;
});
BaseInput.Password = PasswordInput;
BaseInput.Group = TextInput;
BaseInput.Pin = PinInput;
BaseInput.Checkbox = Checkbox;
BaseInput.Chip = Chip;
BaseInput.Color = ColorInput;
BaseInput.ColorPicker = ColorPicker;
BaseInput.Form = Fieldset;
BaseInput.Json = JsonInput;
BaseInput.Select = NativeSelect;
BaseInput.Radio = Radio;
BaseInput.Rating = Rating;
BaseInput.Tab = SegmentedControl;
BaseInput.Slider = Slider;
BaseInput.Switch = Switch;
BaseInput.Textarea = Textarea;
BaseInput.displayName = 'Input';

export default BaseInput;
