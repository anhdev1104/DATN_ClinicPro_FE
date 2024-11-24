import { GENDER, STATUS } from '@/constants/define';
import yup from '@/helpers/locate';

export const createUserSChema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  status: yup
    .string()
    .oneOf(Object.values(STATUS) as `${STATUS}`[])
    .default(STATUS.inactive),
  role_id: yup.string().required(),
  user_info: yup.object({
    fullname: yup.string().required(),
    address: yup.string().nullable(),
    phone_number: yup.string().nullable(),
    avatar: yup.string().url(),
    gender: yup
      .string()
      .oneOf(Object.values(GENDER) as `${GENDER}`[])
      .default(GENDER.OTHER),
    dob: yup.date().nullable().optional(),
    department_id: yup.string().nullable(),
    identity_card: yup
      .object({
        type_name: yup.string().nullable(),
        type_namez: yup.string().nullable(),
        identity_card_number: yup.string().nullable(),
      })
      .nullable(),
    identity_card_id: yup.string(),
  }),
  doctor: yup.object({
    specialty_id: yup.string(),
  }),
});
export const updateUserSchema = createUserSChema.concat(
  yup.object({
    id: yup.string().required(),
    password: yup.string(),
    user_info: yup.object({
      fullname: yup.string().required(),
      address: yup.string().nullable(),
      phone_number: yup.string().nullable(),
      gender: yup
        .string()
        .oneOf(Object.values(GENDER) as `${GENDER}`[])
        .default(GENDER.OTHER),
      dob: yup.string().nullable().optional(),
      department_id: yup.string().nullable(),
      identity_card: yup
        .object({
          type_name: yup.string().nullable(),
          type_namez: yup.string().nullable(),
          identity_card_number: yup.string().nullable(),
        })
        .nullable(),
      identity_card_id: yup.string(),
      avatar: yup.mixed(),
    }),
    doctor: yup
      .object({
        specialty: yup.string().nullable(),
        description: yup.string().nullable(),
      })
      .nullable(),
  }),
);

export type CreateUserProps = yup.InferType<typeof createUserSChema>;
export type UpdateUserProps = yup.InferType<typeof updateUserSchema>;
