import {
  ActionIcon,
  Button,
  ButtonFactory,
  ButtonGroup,
  CloseButton,
  CopyButton,
  FileButton,
  polymorphicFactory,
  UnstyledButton,
} from '@mantine/core';

export interface ButtonProps extends ButtonFactory {
  staticComponents: {
    Group: typeof ButtonGroup;
    Icon: typeof ActionIcon;
    Close: typeof CloseButton;
    Copy: typeof CopyButton;
    File: typeof FileButton;
    Unstyled: typeof UnstyledButton;
  };
}
const BaseButton = polymorphicFactory<ButtonProps>((props, ref) => {
  return <Button {...props} ref={ref} />;
});

BaseButton.Group = ButtonGroup;
BaseButton.Icon = ActionIcon;
BaseButton.Close = CloseButton;
BaseButton.Copy = CopyButton;
BaseButton.File = FileButton;
BaseButton.Unstyled = UnstyledButton;
BaseButton.displayName = 'Button';

export default BaseButton;
