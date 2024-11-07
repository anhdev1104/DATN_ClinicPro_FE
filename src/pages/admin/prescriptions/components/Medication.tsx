import Label from '@/components/label';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { IMedication } from '@/types/prescription.type';
import { Box, Checkbox, Stack, styled, TextField } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';

type TMedication = {
  id: string;
  name: string;
  index: number;
};

const CustomeInput = styled(TextField)(() => ({
  '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
    width: '23px',
    padding: '4px 10px',
    fontSize: '14px',
  },
}));

const Medication: React.FC<TMedication> = ({ id, name, index }) => {
  const {
    form: { control, setValue },
  } = usePrescriptionContextForm();
  const medications = useWatch({ control, name: 'medications' }) || [];
  const flatMedications = new Map<string | undefined, any>();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    medications.forEach(med => {
      flatMedications.set(med.medication_id, med as IMedication);
    });
    flatMedications.delete(undefined);
    const isCheckedArr = Array.from(flatMedications.values());

    if (isSelected) {
      setValue('medications', [
        ...isCheckedArr,
        {
          medication_id: id,
          quantity: '',
          duration: '',
          instructions: '',
        } as any,
      ]);
    } else {
      setValue(
        'medications',
        medications.filter((med: any) => med.medication_id !== id),
      );
    }
  };

  const indexMedication = medications.findIndex(item => item?.medication_id === id);
  const idMedication = medications.find(item => item?.medication_id === id);
  const isChecked = medications.some((med: { medication_id: string }) => med.medication_id === id);

  return (
    <>
      <Label className="!mb-0 !block" htmlFor={name}>
        <div className="py-1 px-2 gap-2 flex items-center rounded-lg border border-borderColor hover:bg-slate-200 cursor-pointer">
          <Controller
            control={control}
            name={`medications.${index}.medication_id`}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { onChange, ...props } }) => (
              <Checkbox id={name} checked={isChecked} onChange={handleCheckboxChange} {...props} />
            )}
          />
          <span>{name}</span>
        </div>
      </Label>

      {isChecked && (
        <div className="px-5 flex items-center">
          <Stack flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <Controller
              name={`medications.${indexMedication}.quantity`}
              control={control}
              render={({ field }) => (
                <CustomeInput
                  value={
                    !!idMedication
                      ? medications.find(item => item?.medication_id === id && item.quantity)?.quantity
                      : ''
                  }
                  onChange={field.onChange}
                />
              )}
            />
            <Box sx={{ margin: '0px !important', fontSize: 12 }}>Số lượng</Box>
          </Stack>
          <Box
            sx={{
              width: '1px',
              height: '20px',
              border: '1px solid #dbdbdbcd',
              mx: '50px',
            }}
          ></Box>
          <Stack flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <Controller
              name={`medications.${indexMedication}.duration`}
              control={control}
              render={({ field }) => (
                <CustomeInput
                  value={
                    !!idMedication
                      ? medications.find(item => item?.medication_id === id && item.duration)?.duration
                      : ''
                  }
                  onChange={field.onChange}
                />
              )}
            />
            <Box sx={{ margin: '0px !important', fontSize: 12 }}>Ngày</Box>
          </Stack>
          <Box
            sx={{
              width: '1px',
              height: '20px',
              border: '1px solid #dbdbdbcd',
              mx: '50px',
            }}
          ></Box>
          <Stack flexDirection={'row'} alignItems={'center'} gap={'10px'}>
            <Controller
              name={`medications.${indexMedication}.instructions`}
              control={control}
              render={({ field }) => (
                <CustomeInput
                  value={
                    !!idMedication
                      ? medications.find(item => item?.medication_id === id && item.instructions)?.instructions
                      : ''
                  }
                  onChange={field.onChange}
                  sx={{
                    width: '300px',
                    '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
                      width: '100%',
                    },
                  }}
                />
              )}
            />
            <Box sx={{ margin: '0px !important', fontSize: 12 }}>Hướng dẫn dùng thuốc</Box>
          </Stack>
        </div>
      )}
    </>
  );
};

export default Medication;
