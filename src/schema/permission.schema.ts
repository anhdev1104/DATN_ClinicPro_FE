import * as yup from 'yup';

export const actionSchema = yup.object({
  name: yup.string().required('Tên hành động là bắt buộc'),
  value: yup.string().required('Giá trị của hành động là bắt buộc'),
  // permissions: yup
  //   .array()
  //   .of(
  //     yup.object({
  //       permission_id: yup.string().uuid('permission_id phải là UUID hợp lệ').required('permission_id là bắt buộc'),
  //     }),
  //   )
  //   .min(1, 'Danh sách permissions không được rỗng')
  //   .required('Danh sách permissions là bắt buộc'),
});
