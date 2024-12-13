import { CloseIcon } from '@/components/icons';
import renderMessageError from '@/helpers/renderMessageErrror';
import { prescriptionSchema } from '@/providers/PrescriptionProvider';
import { getCategoryMedication, getMedication, getPrescriptionDetails } from '@/services/prescriptions.service';
import { IMedications, IPrescriptions } from '@/types/prescription.type';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ModalMedication } from '@/components/modal';
import convertToOptions from '@/helpers/convertToOptions';
import { Button } from '@/components/button';

type TUpdatePrescription = {
  open: boolean;
  onClose: () => void;
  idPrescription: string | undefined;
};

const updatePrescriptionSchema = prescriptionSchema.omit(['patient_id', 'user_id', 'medical_histories_id']);

type TUpdatePrescriptionForm = yup.InferType<typeof updatePrescriptionSchema>;

const UpdatePrescription: React.FC<TUpdatePrescription> = ({ open, onClose, idPrescription }) => {
  const [prescription, setPrescription] = useState<IPrescriptions>({} as IPrescriptions);
  const [medicationCategory, setMedicationCategory] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [medications, setMedications] = useState<IMedications[]>([]);
  const {
    control,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm<TUpdatePrescriptionForm>({
    resolver: yupResolver(updatePrescriptionSchema),
    mode: 'onSubmit',
  });
  const selectedCategoryId = useWatch({
    control,
    name: 'isCategory',
  }) as string;

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setValue('isCategory', '');
    setValue('medications', undefined);
  };

  useEffect(() => {
    if (!selectedCategoryId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await getMedication(selectedCategoryId);
        setMedications(res.data);
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedCategoryId]);

  useEffect(() => {
    if (!idPrescription) return;
    (async () => {
      const res = await getPrescriptionDetails(idPrescription);
      if (res.message === false) {
        return toast.error(renderMessageError(res.errors));
      }
      setPrescription(res.data);
    })();
  }, [idPrescription]);

  useEffect(() => {
    if (Object.keys(prescription).length > 0) {
      reset({
        name: prescription.name,
        description: prescription.description,
        medications: prescription.medications,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prescription]);

  useEffect(() => {
    (async () => {
      const res = await getCategoryMedication();
      const data = convertToOptions(res.data);
      setMedicationCategory(data);
    })();
  }, []);
  const handleUpdatePrescription: SubmitHandler<TUpdatePrescriptionForm> = async data => {
    console.log(data);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(handleUpdatePrescription),
          style: {
            borderRadius: '10px',
            maxWidth: '50%',
            width: '100%',
            padding: '20px 30px',
          },
        }}
      >
        <div
          className="flex justify-end mb-3 transition-all ease-linear hover:bg-primaryAdmin/5 cursor-pointer p-2 w-fit ml-auto rounded-full absolute right-3 top-2"
          onClick={onClose}
        >
          <CloseIcon />
        </div>
        <DialogTitle sx={{ fontWeight: 600, p: 0, mb: '20px' }}>Chỉnh sửa đơn thuốc</DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Typography
            component={'h4'}
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              mb: '4px',
            }}
          >
            Tên đơn thuốc
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="px-4 py-2 w-full border outline-none rounded-md truncate text-[#666] text-[14px] transition-all focus:border-third "
                  value={getValues('name')}
                />
              </>
            )}
          />
          <Typography
            component={'h4'}
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              mb: '4px',
              mt: '15px',
            }}
          >
            Lời dặn
          </Typography>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className="px-4 py-2 w-full border outline-none rounded-md truncate text-[#666] text-[14px] transition-all focus:border-third "
                  value={getValues('description')}
                />
              </>
            )}
          />
        </DialogContent>
        <Button
          type="submit"
          styled="normal"
          className="bg-yellow-500 text-white disabled:bg-gray-300 mt-10 w-fit ml-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting || isDirty}
        >
          Cập nhật
        </Button>
      </Dialog>
      <ModalMedication
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        medications={medications}
        medicationCategory={medicationCategory}
        loading={loading}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default UpdatePrescription;
