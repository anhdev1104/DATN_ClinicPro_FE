import { GENDER, STATUS } from '@/constants/define';
import yup from '@/helpers/locate';

export const createUserSChema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  status: yup
    .string()
    .oneOf([`${STATUS}`])
    .optional(),
  role_id: yup.string().required(),
  user_info: yup.object({
    fullname: yup.string().required(),
    address: yup.string(),
    phone_number: yup.string(),
    avatar: yup.string().url(),
    gender: yup.string().oneOf([`${GENDER}`]),
    dob: yup.string().datetime(),
    department_id: yup.string(),
    identity_card: yup.object({
      type_name: yup.string(),
      identity_card_number: yup.string(),
    }),
  }),
  doctor: yup.object({
    specialty_id: yup.string(),
  }),
});

export const updateUserSchema = createUserSChema.concat(
  yup.object({
    password: yup.string(),
    doctor: yup.object({
      specialty: yup.string(),
      description: yup.string(),
    }),
  }),
);

export type CreateUserProps = yup.InferType<typeof createUserSChema>;
export type UpdateUserProps = yup.InferType<typeof updateUserSchema>;
