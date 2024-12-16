import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { Form, former } from '@/lib/form';
import { changePassword } from '@/services/auth.service';
import yup from '@/lib/utils/yup';
import { Container, Paper, Stack, Title } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { resolveErrorResponse } from '@/helpers/utils';
import toast from 'react-hot-toast';

export const passwordSchema = yup.object({
  password: yup.string().min(8).required(),
  new_password: yup.string().min(8).required(),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('new_password')], 'mật khẩu không khớp!')
    .required(),
});
export type PasswordProps = yup.InferType<typeof passwordSchema>;

const formElement = [
  {
    label: 'mật khẩu hiện tại',
    name: 'password',
  },
  {
    label: 'mật khẩu mới',
    name: 'new_password',
  },
  {
    label: 'xác nhận mật khẩu mới',
    name: 'confirmNewPassword',
  },
];

// eslint-disable-next-line react-refresh/only-export-components
const ChangePassword = () => {
  const {
    formState: { isSubmitting },
    reset,
    setError,
  } = useFormContext<PasswordProps>();

  const handleChangePassword = async (data: PasswordProps) => {
    try {
      const formData = passwordSchema.omit(['confirmNewPassword']).safeParse(data);
      const response = await changePassword<{ message: string }>(formData);
      toast.success(response?.message);
      reset();
    } catch (error) {
      resolveErrorResponse(error as ErrorResponse, setError);
    }
  };

  return (
    <Container className="min-h-dvh flex justify-center">
      <Paper shadow="md" radius="lg" p="xl" className="w-full lg:w-3/4">
        <Title order={1} lineClamp={1} className="capitalize text-center">
          thay đổi mật khẩu
        </Title>
        <Form
          withAutoValidate
          onSubmit={handleChangePassword}
          className="space-y-2 flex flex-col my-10 justify-center items-center"
        >
          <Stack gap="md" justify="center" align="center" className="w-full lg:w-3/4">
            {formElement.map(element => (
              <BaseInput.Password
                key={element.name}
                name={element.name}
                radius="md"
                className="w-full"
                label={element.label}
                type="password"
                autoComplete={element.name}
              />
            ))}
            <BaseButton fullWidth loading={isSubmitting} disabled={isSubmitting} className="my-4" type="submit">
              Gửi
            </BaseButton>
          </Stack>
        </Form>
      </Paper>
    </Container>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default former(ChangePassword, passwordSchema, {
  mode: 'onChange',
});
