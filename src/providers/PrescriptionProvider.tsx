import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { IPrescription } from '@/types/prescription.type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MedicalRecord } from '@/types/medicalHistories.type';

const medicationSchema = yup.object().shape({
  medication_id: yup.string(),
  instructions: yup.string(),
  quantity: yup.number(),
  duration: yup.number(),
});

const prescriptionSchema = yup.object().shape({
  patient_id: yup.string().required('Bệnh nhân là trường bắt buộc'),
  user_id: yup.string(),
  name: yup.string().required('Tên đơn thuốc là bắt buộc'),
  description: yup.string(),
  medications: yup.array().of(medicationSchema),
  medical_histories_id: yup.string().required('Bệnh án là bắt buộc'),
  isCategory: yup.string().required('Cần có ít nhất một thuốc trong đơn thuốc'),
});

type Schema = yup.InferType<typeof prescriptionSchema>;

type TPrescriptionContext = {
  form: UseFormReturn<Schema>;
  medicalRecord: MedicalRecord;
  setMedicalRecord: React.Dispatch<React.SetStateAction<MedicalRecord>>;
};

const PrescriptionContext = createContext<TPrescriptionContext>({} as TPrescriptionContext);

const initialMedicationData = {} as IPrescription;
// eslint-disable-next-line react-refresh/only-export-components
export const usePrescriptionContextForm = () => useContext(PrescriptionContext);

export default function PrescriptionProvider({ children }: { children: ReactNode }) {
  const form = useForm<Schema>({
    resolver: yupResolver(prescriptionSchema),
    mode: 'onChange',
    defaultValues: initialMedicationData,
  });
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord>({} as MedicalRecord);

  return (
    <PrescriptionContext.Provider
      value={{
        form,
        medicalRecord,
        setMedicalRecord,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
}
