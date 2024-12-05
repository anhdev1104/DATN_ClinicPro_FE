import { Children, createElement, isValidElement } from 'react';
import { useController } from 'react-hook-form';

const InputWithController = ({
  child,
}: {
  child: React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}) => {
  if (!child.props?.name) throw new TypeError('Field name of input expected a string!');
  const { fieldState, field } = useController({ name: child.props.name });

  const error = (child.type as React.ComponentType).displayName?.startsWith('@mantine') ? 'error' : 'aria-errormessage';

  return createElement(child.type, {
    [error]: fieldState.error?.message || fieldState.invalid,
    'aria-invalid': fieldState.invalid,
    ...field,
    ...child.props,
  });
};

export const CreateNestedElement = ({ children }: { children: React.ReactNode }) => {
  return Children.map(children, child => {
    return isValidElement(child) ? (
      child.props?.name && child.props.name.includes(child.props?.autoComplete) ? (
        <InputWithController child={child} key={child.props.nanme} />
      ) : child.props?.children && typeof child.props.children !== 'function' ? (
        createElement(child.type, child.props, <CreateNestedElement children={child.props.children} />)
      ) : (
        child
      )
    ) : (
      child
    );
  });
};
