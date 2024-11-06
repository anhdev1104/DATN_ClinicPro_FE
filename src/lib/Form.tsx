import React, { forwardRef, memo, useMemo } from 'react';
import { useController } from 'react-hook-form';
/**
 * @author https://github.com/seaesa
 * @warning during testing phase, avoid!!
 * @description this is component remove Controller component, usage with former hocs
 * @important name of each input field must have required or aria-required to be work
 * @example instead this: 
 *  <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => {
        return (
          <BaseInput.Password
            radius="md"
            className="w-full"
            label="mật khẩu hiện tại"
            error={fieldState.error?.message}
            type="password"
            autoComplete="password"
            {...field}
          />
        );
      }}
    />
  to this: 
    <BaseInput.Password
    required
    name="password"
    radius="md"
    className="w-full"
    label="mật khẩu hiện tại" 
    type="password"
    autoComplete="password" 
  /> 
 */

const InputWithController = ({
  child,
}: {
  child: React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}) => {
  if (!child.props.name) throw 'Field name is required!';
  const { fieldState, field } = useController({ name: child.props.name });
  const error = useMemo(
    () =>
      typeof child.type !== 'string' &&
      (child.type as any)?.displayName &&
      (child.type as any).displayName.startsWith('@mantine')
        ? 'error'
        : 'aria-invalid',
    [child],
  );
  return React.createElement(
    child.type,
    {
      ...child.props,
      ...field,
      [error]: fieldState.error?.message || fieldState.invalid,
    },
    child.props?.children,
  );
};

const CreateNestedElement = ({ children }: { children: React.ReactNode }) => {
  return React.Children.map(children, child => {
    return React.isValidElement(child) ? (
      child.props?.name && (child.type === 'input' || child.props?.autoComplete === child.props?.name) ? (
        <InputWithController child={child} key={child.props.nanme} />
      ) : (
        React.createElement(
          child.type,
          child.props,
          Array.isArray(child.props?.children) ? (
            <CreateNestedElement children={child.props.children} />
          ) : (
            child.props?.children
          ),
        )
      )
    ) : (
      child
    );
  });
};
interface FormProps extends React.HTMLProps<HTMLFormElement> {
  children?: React.ReactNode;
}
const Form = forwardRef<HTMLFormElement, FormProps>(({ children, ...props }, ref) => {
  return (
    <form {...props} ref={ref}>
      <CreateNestedElement children={children} />
    </form>
  );
});

export default memo(Form);
