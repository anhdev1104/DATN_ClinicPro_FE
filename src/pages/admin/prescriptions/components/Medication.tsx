import Label from '@/components/label';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { IMedication } from '@/types/prescription.type';
import { Checkbox, TextField } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';

type TMedication = {
  id: string;
  name: string;
  index: number;
};

const Medication: React.FC<TMedication> = ({ id, name, index }) => {
  const {
    form: { control, setValue },
  } = usePrescriptionContextForm();
  const medications = useWatch({ control, name: 'medications' }) || [];
  console.log('🚀 ~ medications:', medications);
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
        <div className="py-3 px-2 gap-2 flex items-center rounded-lg border border-borderColor hover:bg-slate-300 cursor-pointer">
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
        <div>
          <Controller
            name={`medications.${indexMedication}.quantity`}
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="Liều lượng..."
                value={
                  !!idMedication ? medications.find(item => item?.medication_id === id && item.quantity)?.quantity : ''
                }
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name={`medications.${indexMedication}.duration`}
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="Thời gian ..."
                value={
                  !!idMedication ? medications.find(item => item?.medication_id === id && item.duration)?.duration : ''
                }
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name={`medications.${indexMedication}.instructions`}
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="Hướng dẫn sử dụng..."
                value={
                  !!idMedication
                    ? medications.find(item => item?.medication_id === id && item.instructions)?.instructions
                    : ''
                }
                onChange={field.onChange}
              />
            )}
          />
        </div>
      )}
    </>
  );
};

export default Medication;
