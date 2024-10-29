import BaseInput from '@/components/base/input';
import { useSelector } from '@/hooks/redux';
import { changePassword } from '@/services/auth.service';
import { ChangePasswordErrorResponse, ChangePasswordResponse } from '@/types/auth.type';
import yup from '@/utils/locate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Paper, Stack, Title } from '@mantine/core';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const passwordSchema = yup
  .object({
    password: yup.string().default('').required(),
    newPassword: yup.string().default('').required(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'mật khẩu không khớp!')
      .default('')
      .required()
  })
  .required();
export type PasswordProps = yup.InferType<typeof passwordSchema>;

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useSelector(state => state.global);
  const { control, handleSubmit, setError, reset, formState } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
    disabled: loading,
    defaultValues: passwordSchema.cast({})
  });

  const handleChangePassword = async <T extends Array<keyof PasswordProps>>(data: PasswordProps) => {
    const listName = Object.keys(data);
    const errorName = Object.keys(formState.errors) as T;
    if (listName.includes(errorName[0])) {
      setError(errorName[0], { message: formState.errors[errorName[0]]?.message });
      return;
    }
    try {
      setIsLoading(true);
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
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
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
              <Controller
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
              <Controller
                name="newPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseInput.Password
                    radius="md"
                    className="w-full"
                    label="mật khẩu mới"
                    error={fieldState.error?.message}
                    type="password"
                    autoComplete="newPassword"
                    {...field}
                  />
                )}
              />
              <Controller
                name="confirmNewPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <BaseInput.Password
                    radius="md"
                    className="w-full"
                    label="xác nhận mật khẩu mới"
                    error={fieldState.error?.message}
                    type="password"
                    autoComplete="confirmNewPassword"
                    {...field}
                  />
                )}
              />
              <Button fullWidth loading={isLoading} disabled={isLoading} className="my-4" type="submit">
                Gửi
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
