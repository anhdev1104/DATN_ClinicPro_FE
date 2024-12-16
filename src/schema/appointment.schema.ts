import { emailRegex } from '@/constants/regex';
import * as yup from 'yup';

export const appointmentSchema = yup.object({
  fullname: yup.string().trim().required('Họ và tên là trường bắt buộc.'),
  email: yup
    .string()
    .trim()
    .required('Vui lòng điền email của bạn !')
    .matches(emailRegex, { message: 'Email không dúng định dạng.' }),
  phone_number: yup
    .string()
    .trim()
    .required('Vui lòng nhập số điện thoại.')
    .matches(/^\d+$/, 'Số điện thoại chỉ được chứa ký tự số.')
    .length(10, 'Số điện thoại phải gồm 10 chữ số.'),
  address: yup.string().trim().required('Vui lòng điền vào địa chỉ.'),
  gender: yup.string().default('male'),
  description: yup.string(),
  dob: yup.string().required('Vui lòng điền ngày sinh.'),
  appointment_date: yup.string().required('Vui lòng chọn ngày và giờ khám bệnh.'),
  specialty_id: yup
    .string()
    .test('specialty_id', 'Vui lòng chọn chuyên khoa.', val => val !== '0')
    .required('Vui lòng chọn chuyên khoa.'),
  package_id: yup
    .string()
    .test('package_id', 'Vui lòng chọn gói khám.', val => val !== '0')
    .required('Vui lòng chọn gói khám.'),
});
