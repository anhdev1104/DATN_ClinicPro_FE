import * as yup from 'yup';

export const actionSchema = yup.object({
  name: yup.string().required('Tên hành động là bắt buộc'),
  value: yup.string().required('Giá trị của hành động là bắt buộc'),
  permissions: yup.array().of(
    yup.object({
      permission_id: yup.string(),
    }),
  ),
});

export const permissionSchema = yup.object({
  name: yup.string().required('Tên quyền là bắt buộc'),
  description: yup.string().required('Giá trị của quyền là bắt buộc'),
  actions: yup.array().of(
    yup.object({
      action_id: yup.string(),
    }),
  ),
});

export const rolesSchema = yup.object({
  name: yup.string().required('Tên role là bắt buộc'),
  description: yup.string().required('Giá trị của role là bắt buộc'),
  permissions: yup.array().of(
    yup.object({
      id: yup.string(),
      actions: yup.array().of(
        yup.object({
          id: yup.string(),
        }),
      ),
    }),
  ),
});
