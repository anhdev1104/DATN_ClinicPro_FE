import { GENDER, STATUS } from '@/constants/define';
import yup from '@/helpers/locate';

export const managerSchema = yup
  .object({
    id: yup.string().uuid().required(),
    email: yup.string().email(),
    fullname: yup.string().ensure(),
    role_id: yup.string().required(),
    status: yup
      .string()
      .oneOf(Object.values(STATUS) as `${STATUS}`[])
      .default(STATUS.inactive),
    user_info: yup.object({}),
    avatar: yup.string().url(),
    address: yup.string().ensure().optional(),
    phone_number: yup.number().nullable(),
    gender: yup.string().oneOf(['male', 'female', 'other']),
    dob: yup.string().datetime(),
  })
  .nullable()
  .default(null);

export const departmentSchema = yup.object({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  description: yup.string(),
  created_at: yup.string().datetime().default(new Date().toLocaleDateString()),
  updated_at: yup.string().datetime().default(new Date().toLocaleDateString()),
  users_count: yup.number().default(0),
  manager: managerSchema,
});

export const userDepartmentSchema = yup.object({
  id: yup.number().required(),
  email: yup.string().email().optional(),
  status: yup.string().oneOf(Object.values(STATUS)).required(),
  fullname: yup.string().required(),
  avatar: yup.string().url().optional(),
  address: yup.string().optional(),
  phone_number: yup.string().optional(),
  gender: yup.string().oneOf(Object.values(GENDER)).optional(),
  dob: yup.string().datetime(),
  doctor: yup.object({
    id: yup.number().required(),
    specialty: yup.string().required(),
    description: yup.string().required(),
  }),
});

export const departmentDetailSchema = yup
  .object({
    users: yup.array().of(userDepartmentSchema).required().default([]),
  })
  .concat(departmentSchema);

export const newDepartmentSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  manager_id: yup.string().nullable().optional().default(null),
});
export const newDepartmentSchemaResponse = yup.object({
  data: yup.object().concat(departmentSchema),
  message: yup.string(),
});

export const updateDepartmentSchema = newDepartmentSchema;
