/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { IPrescription } from '@/types/prescription.type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MedicalRecord } from '@/types/medicalHistories.type';
import { prescriptionSchema, updatePrescriptionSchema } from '@/schema/prescriptions.schema';

type Schema = yup.InferType<typeof prescriptionSchema>;
export type SchemaUpdate = yup.InferType<typeof updatePrescriptionSchema>;

type TPrescriptionContext = {
  form: UseFormReturn<Schema>;
  medicalRecord: MedicalRecord;
  setMedicalRecord: React.Dispatch<React.SetStateAction<MedicalRecord>>;
};
type TUpdatePrescriptionContext = {
  form: UseFormReturn<SchemaUpdate>;
};

const PrescriptionContext = createContext<TPrescriptionContext>({} as TPrescriptionContext);
const UpdatePrescriptionContext = createContext<TUpdatePrescriptionContext>({} as TUpdatePrescriptionContext);

const initialMedicationData = {} as IPrescription;
export const usePrescriptionContextForm = () => useContext(PrescriptionContext);
export const useUpdatePrescriptionContextForm = () => useContext(UpdatePrescriptionContext);

export default function PrescriptionProvider({ children }: { children: ReactNode }) {
  const form = useForm<Schema>({
    resolver: yupResolver(prescriptionSchema),
    mode: 'onChange',
    defaultValues: initialMedicationData,
  });
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord>({} as MedicalRecord);

  const formUpdate = useForm<SchemaUpdate>({
    resolver: yupResolver(updatePrescriptionSchema),
    mode: 'onChange',
  });

  return (
    <PrescriptionContext.Provider
      value={{
        form,
        medicalRecord,
        setMedicalRecord,
      }}
    >
      <UpdatePrescriptionContext.Provider
        value={{
          form: formUpdate,
        }}
      >
        {children}
      </UpdatePrescriptionContext.Provider>
    </PrescriptionContext.Provider>
  );
}
