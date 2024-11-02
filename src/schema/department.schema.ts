import { GENDER, STATUS } from '@/constants/define';
import yup from '@/utils/locate';

export const managerSchema = yup.object({
  id: yup.string().uuid().required(),
  email: yup.string().email(),
  fullname: yup.string().ensure(),
  avatar: yup.string().url(),
  address: yup.string().ensure().optional(),
  phone_number: yup.number().nullable(),
  gender: yup.string().oneOf(['male', 'female', 'other']),
  dob: yup.string().datetime(),
});
export const departmentSchema = yup.object({
  id: yup.string().uuid().ensure(),
  name: yup.string().ensure(),
  description: yup.string().ensure(),
  created_at: yup.string().datetime(),
  updated_at: yup.string().datetime(),
  users_count: yup.number().default(0),
  manager: managerSchema.optional(),
});

export const userDepartmentSchema = yup.object({
  id: yup.string().required(),
  email: yup.string().email().optional(),
  status: yup.string().oneOf(Object.values(STATUS)).required(),
  fullname: yup.string().required(),
  avatar: yup.string().url().optional(),
  address: yup.string().optional(),
  phone_number: yup.string().optional(),
  gender: yup.string().oneOf(Object.values(GENDER)).optional(),
  dob: yup.string().datetime(),
  doctor: yup.object({
    id: yup.string().required(),
    specialty: yup.string().required(),
    description: yup.string().required(),
  }),
});

export const departmentDetailSchema = yup
  .object({
    users: yup.array().of(userDepartmentSchema),
  })
  .concat(departmentSchema);
