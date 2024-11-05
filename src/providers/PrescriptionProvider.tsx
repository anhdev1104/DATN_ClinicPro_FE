import { createContext, ReactNode, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { IPrescription } from '@/types/prescription.type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const medicationSchema = yup.object().shape({
  medication_id: yup.string().required('ID thuốc là bắt buộc'),
  instructions: yup.string().required('Hướng dẫn sử dụng là bắt buộc'),
  quantity: yup
    .number()
    .required('Liều lượng là bắt buộc')
    .positive('Liều lượng phải là số dương')
    .integer('Liều lượng phải là số nguyên'),
  duration: yup
    .number()
    .required('Thời gian sử dụng là bắt buộc')
    .positive('Thời gian sử dụng phải là số dương')
    .integer('Thời gian sử dụng phải là số nguyên'),
});

const prescriptionSchema = yup.object().shape({
  patient_id: yup.string().required('ID bệnh nhân là bắt buộc'),
  user_id: yup.string().required('ID người dùng là bắt buộc'),
  name: yup.string().required('Tên đơn thuốc là bắt buộc'),
  description: yup.string(),
  medications: yup.array().of(medicationSchema).required('Danh sách thuốc là bắt buộc'),
  isCategory: yup.string(),
});

type Schema = yup.InferType<typeof prescriptionSchema>;

type TPrescriptionContext = {
  form: UseFormReturn<Schema>;
};

const PrescriptionContext = createContext<TPrescriptionContext>({} as TPrescriptionContext);

const initialMedicationData = {} as IPrescription;
export const usePrescriptionContextForm = () => useContext(PrescriptionContext);

export default function PrescriptionProvider({ children }: { children: ReactNode }) {
  const form = useForm<Schema>({
    resolver: yupResolver(prescriptionSchema),
    mode: 'onChange',
    defaultValues: initialMedicationData,
  });

  return (
    <PrescriptionContext.Provider
      value={{
        form,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
}
