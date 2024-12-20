import {
  Autocomplete,
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  Fieldset,
  FileInput,
  Input,
  InputFactory,
  JsonInput,
  MultiSelect,
  NativeSelect,
  NumberInput,
  PasswordInput,
  PillsInput,
  polymorphicFactory,
  Radio,
  Rating,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import { BaseDateInput, BasePinInput } from './Input';

interface InputProps extends InputFactory {
  staticComponents: InputFactory['staticComponents'] & {
    Password: typeof PasswordInput;
    Group: typeof TextInput;
    Pin: typeof BasePinInput;
    Checkbox: typeof Checkbox;
    Chip: typeof Chip;
    Color: typeof ColorInput;
    ColorPicker: typeof ColorPicker;
    Form: typeof Fieldset;
    File: typeof FileInput;
    Json: typeof JsonInput;
    NativeSelect: typeof NativeSelect;
    Select: typeof Select;
    Number: typeof NumberInput;
    Radio: typeof Radio;
    Rating: typeof Rating;
    Tab: typeof SegmentedControl;
    Slider: typeof Slider;
    Switch: typeof Switch;
    Textarea: typeof Textarea;
    AutoComplete: typeof Autocomplete;
    MultiSelect: typeof MultiSelect;
    Tag: typeof TagsInput;
    Pill: typeof PillsInput;
    Date: typeof BaseDateInput;
  };
}

const BaseInput = polymorphicFactory<InputProps>(({ ...props }, ref) => {
  return <Input {...props} ref={ref} />;
});

BaseInput.Password = PasswordInput;
BaseInput.Group = TextInput;
BaseInput.Pin = BasePinInput;
BaseInput.Checkbox = Checkbox;
BaseInput.Chip = Chip;
BaseInput.Color = ColorInput;
BaseInput.ColorPicker = ColorPicker;
BaseInput.Form = Fieldset;
BaseInput.File = FileInput;
BaseInput.Json = JsonInput;
BaseInput.NativeSelect = NativeSelect;
BaseInput.Select = Select;
BaseInput.Radio = Radio;
BaseInput.Rating = Rating;
BaseInput.Tab = SegmentedControl;
BaseInput.Slider = Slider;
BaseInput.Switch = Switch;
BaseInput.Textarea = Textarea;
BaseInput.AutoComplete = Autocomplete;
BaseInput.MultiSelect = MultiSelect;
BaseInput.Tag = TagsInput;
BaseInput.Pill = PillsInput;
BaseInput.Date = BaseDateInput;
BaseInput.Number = NumberInput;
BaseInput.displayName = '@mantine/core/Input';

export default BaseInput;
