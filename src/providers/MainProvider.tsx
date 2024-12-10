import { createTheme, MantineProvider, Menu, MultiSelect, Popover, Select, Textarea, Tooltip } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider, ModalsProviderProps } from '@mantine/modals';

const modalsProviderProps: ModalsProviderProps = {
  modalProps: {
    classNames: {
      title: 'text-xl',
      content: 'rounded-md scrollbar-none',
      overlay: 'backdrop-blur-sm bg-black/55',
    },
    transitionProps: {
      transition: 'fade',
    },
    centered: true,
    size: 'xl',
  },
};
const theme = createTheme({
  cursorType: 'pointer',
  components: {
    Popover: Popover.extend({ defaultProps: { withinPortal: false } }),
    Tooltip: Tooltip.extend({ defaultProps: { withinPortal: false } }),
    Menu: Menu.extend({ defaultProps: { withinPortal: false } }),
    MultiSelect: MultiSelect.extend({
      defaultProps: {
        comboboxProps: {
          transitionProps: { transition: 'fade' },
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        comboboxProps: {
          transitionProps: { transition: 'fade' },
        },
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        classNames: {
          input: 'scrollbar-none',
        },
      },
    }),
  },
  defaultRadius: 'md',
  fontSmoothing: true,
  activeClassName: 'transition duration-[50ms] ease-in-out active:scale-[.97]',
});
export default function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ModalsProvider {...modalsProviderProps}>
        <DatesProvider settings={{}}>{children}</DatesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
