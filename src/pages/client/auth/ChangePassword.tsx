import BaseInput from '@/components/base/input';
import former, { OptionsWithForm } from '@/hocs/former';
import { changePassword } from '@/services/auth.service';
import { ChangePasswordErrorResponse, ChangePasswordResponse } from '@/types/auth.type';
import yup from '@/utils/locate';
import { Box, Button, Container, Paper, Stack, Title } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

export const passwordSchema = yup
  .object({
    password: yup.string().default('').required(),
    newPassword: yup.string().default('').required(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'mật khẩu không khớp!')
      .default('')
      .required(),
  })
  .required();
export type PasswordProps = yup.InferType<typeof passwordSchema>;

const formData = [
  {
    label: 'mật khẩu hiện tại',
    name: 'password',
  },
  {
    label: 'mật khẩu mới',
    name: 'newPassword',
  },
  {
    label: 'xác nhận mật khẩu mới',
    name: 'confirmNewPassword',
  },
];

const ChangePassword = () => {
  const {
    formState: { isValid, errors, disabled },
    reset,
    setError,
    handleSubmit,
  } = useFormContext<PasswordProps>();

  const handleChangePassword = async <T extends Array<keyof PasswordProps>>(data: PasswordProps) => {
    if (!isValid) {
      const errorName = Object.keys(errors) as T;
      setError(errorName[0], { message: errors[errorName[0]]?.message });
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmNewPassword, ...formData } = yup.object().snakeCase().cast(data) as PasswordProps;
      const response = await changePassword<ChangePasswordResponse>(formData);
      toast.success(response.message);
      reset();
    } catch (error) {
      const { errors, message } = error as ChangePasswordErrorResponse;
      if (errors) {
        const errorName = Object.keys(yup.object().camelCase().cast(errors)) as T;
        const errorPure = Object.keys(errors) as Array<keyof typeof errors>;
        setError(errorName[0], { message: errors[errorPure[0]][0] });
      } else if (message) {
        toast.error(message);
      } else {
        toast.error('lỗi server vui lòng đợi trong giây lát');
      }
    }
  };

  return (
    <>
      <Container className="min-h-dvh flex justify-center">
        <Paper shadow="md" radius="lg" p="xl" className="w-full lg:w-3/4">
          <Title order={1} lineClamp={1} className="capitalize text-center">
            thay đổi mật khẩu
          </Title>
          <Box
            onSubmit={handleSubmit(handleChangePassword)}
            component="form"
            className="space-y-2 flex flex-col my-10 justify-center items-center"
          >
            <Stack gap="md" justify="center" align="center" className="w-full lg:w-3/4">
              {formData.map(form => (
                <BaseInput.Password
                  key={form.name}
                  aria-controls={form.name}
                  name={form.name}
                  radius="md"
                  className="w-full"
                  label={form.label}
                  type="password"
                  autoComplete={form.name}
                />
              ))}
              <Button fullWidth loading={disabled} disabled={disabled} className="my-4" type="submit">
                Gửi
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

const optionsWithForm: OptionsWithForm = {
  mode: 'onChange',
};
export default former(ChangePassword, passwordSchema, optionsWithForm);
