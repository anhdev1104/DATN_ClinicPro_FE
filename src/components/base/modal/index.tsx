import { factory, Modal, ModalFactory } from '@mantine/core';

export interface BaseModalProps {
  opened?: boolean;
  close: () => void;
  open?: () => void;
  toggle?: () => void;
}

const BaseModal = factory<ModalFactory>(
  ({ children, opened, onClose, overlayProps, classNames, transitionProps, ...props }, ref) => {
    return (
      <Modal
        ref={ref}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
          ...overlayProps,
        }}
        classNames={{ title: 'text-xl', body: 'px-8', ...classNames }}
        transitionProps={{ transition: 'fade', duration: 300, ...transitionProps }}
        centered
        size="auto"
        opened={opened}
        onClose={onClose}
        {...props}
      >
        {children}
      </Modal>
    );
  },
);
export default BaseModal;
