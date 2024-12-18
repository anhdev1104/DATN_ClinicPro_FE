import * as yup from 'yup';

const medicationSchema = yup.object().shape({
  medication_id: yup.string(),
  instructions: yup.string(),
  quantity: yup.number(),
  duration: yup.number(),
});

export const prescriptionSchema = yup.object().shape({
  patient_id: yup.string().required('Bệnh nhân là trường bắt buộc'),
  user_id: yup.string(),
  name: yup.string().required('Tên đơn thuốc là bắt buộc'),
  description: yup.string(),
  medications: yup.array().of(medicationSchema),
  medical_histories_id: yup.string().required('Bệnh án là bắt buộc'),
  isCategory: yup.string().required('Cần có ít nhất một thuốc trong đơn thuốc'),
});

export const updatePrescriptionSchema = yup.object().shape({
  name: yup.string().required('Tên đơn thuốc là bắt buộc'),
  description: yup.string(),
  medications: yup.array().of(medicationSchema),
  isCategory: yup.string(),
});
