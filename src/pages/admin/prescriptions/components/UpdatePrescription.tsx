import { ChangeCircleIcon, CloseIcon } from '@/components/icons';
import renderMessageError from '@/helpers/renderMessageErrror';
import { SchemaUpdate, useUpdatePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import {
  getCategoryMedication,
  getMedication,
  getPrescriptionDetails,
  updatePrescription,
} from '@/services/prescriptions.service';
import { IMedications, IPrescriptions, IPrescriptionUpdate, TMedicationsType } from '@/types/prescription.type';

import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ModalMedication } from '@/components/modal';
import convertToOptions from '@/helpers/convertToOptions';
import { Button } from '@/components/button';

type TUpdatePrescription = {
  open: boolean;
  onClose: () => void;
  idPrescription: string | undefined;
};

const UpdatePrescription: React.FC<TUpdatePrescription> = ({ open, onClose, idPrescription }) => {
  const [prescription, setPrescription] = useState<IPrescriptions>({} as IPrescriptions);
  const [medicationCategory, setMedicationCategory] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [medications, setMedications] = useState<IMedications[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const {
    form: {
      control,
      formState: { isDirty, isSubmitting },
      handleSubmit,
      reset,
      setValue,
      getValues,
    },
  } = useUpdatePrescriptionContextForm();

  const selectedCategoryId = useWatch({
    control,
    name: 'isCategory',
  }) as string;

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setValue('isCategory', '');
    setValue('medications', prescription.medications);
  };

  const medication = getValues('medications') as TMedicationsType[];

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
      if (res.success === false) {
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
        isCategory: getValues('isCategory'),
      });
    }
  }, [prescription]);

  useEffect(() => {
    (async () => {
      const res = await getCategoryMedication();
      const data = convertToOptions(res.data);
      setMedicationCategory(data);
    })();
  }, []);

  const handleUpdatePrescription: SubmitHandler<SchemaUpdate> = async data => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isCategory, medications, ...updateData } = data;
    const medicationsData =
      medications &&
      medications
        .map(item => ({
          medication_id: item.medication_id,
          quantity: item.quantity,
          duration: item.duration,
          instructions: item.instructions,
        }))
        .filter(elm => elm.medication_id !== undefined);
    const initMedicationData = prescription.medications.map(item => ({
      medication_id: item.medication.id,
      quantity: item.quantity,
      duration: item.duration,
      instructions: item.instructions,
    }));
    const newData = {
      ...updateData,
      medications: medicationsData && medicationsData?.length > 0 ? medicationsData : initMedicationData,
    };
    const res = idPrescription && (await updatePrescription(idPrescription, newData as IPrescriptionUpdate));
    if (res.success === false) {
      return toast.error(renderMessageError(res.errors));
    }
    toast.success('Cập nhập đơn thuốc thành công.');
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          reset({
            name: prescription.name,
            description: prescription.description,
            medications: prescription.medications,
            isCategory: '',
          });
          onClose();
        }}
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
                  onChange={e => {
                    field.onChange(e);
                    if (e.target.value.trim().length <= 0) {
                      setDisabled(true);
                    } else {
                      setDisabled(false);
                    }
                  }}
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
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography
              component={'h4'}
              sx={{
                fontWeight: 600,
                fontSize: '14px',
                mt: '15px',
              }}
            >
              Thuốc kê đơn
            </Typography>
            <Typography
              component={'span'}
              sx={{
                fontSize: '14px',
                mt: '15px',
                cursor: 'pointer',
              }}
              className="text-primaryAdmin"
              onClick={() => setIsDialogOpen(true)}
            >
              <ChangeCircleIcon className="mr-1 mb-1" />
              Thay đổi
            </Typography>
          </Stack>
          <DialogContent sx={{ height: '130px', overflowY: 'auto', pt: 0, mt: '20px' }} className="scroll-select pl-5">
            {medication &&
              medication?.map((med, index) => (
                <Stack direction="row" justifyContent="space-between" marginBottom={'8px'} key={med?.id}>
                  <Box sx={{ maxWidth: '68%' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'black' }}>
                      {index + 1}/. {med?.medication?.name}
                    </Typography>

                    <Typography sx={{ fontSize: '13px', fontStyle: 'italic', color: '#666' }}>
                      HDSD: {med?.instructions}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '13px', maxWidth: '65%' }}>
                    {med?.quantity} viên / {med?.duration} lần
                  </Typography>
                </Stack>
              ))}
          </DialogContent>
        </DialogContent>
        <Button
          type="submit"
          styled="normal"
          className="bg-yellow-500 text-white disabled:bg-gray-300 mt-10 w-fit ml-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting || !isDirty || disabled}
        >
          Cập nhật
        </Button>
      </Dialog>
      <ModalMedication
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleCloseDialog={handleCloseDialog}
        medications={medications}
        medicationCategory={medicationCategory}
        loading={loading}
        isUpdate
      />
    </>
  );
};

export default UpdatePrescription;
