import Label from '@/components/label';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { Checkbox } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';

type TMedication = {
  id: string;
  name: string;
  index: number;
};

const Medication: React.FC<TMedication> = ({ id, name, index }) => {
  const {
    form: { control, getValues, setValue },
  } = usePrescriptionContextForm();

  const medications = useWatch({ control, name: 'medications' }) || [];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    const currentMedications = getValues('medications') || [];

    if (isSelected) {
      const isCheckedArr = currentMedications.filter(med => med.medication_id !== undefined);
      setValue('medications', [
        ...isCheckedArr,
        {
          medication_id: id,
        } as any,
      ]);
    } else {
      setValue(
        'medications',
        currentMedications.filter((med: any) => med.medication_id !== id),
      );
    }
  };

  return (
    <>
      <Label className="!mb-0 !block" htmlFor={name}>
        <div className="py-3 px-2 gap-2 flex items-center rounded-lg border border-borderColor hover:bg-slate-300 cursor-pointer">
          <Controller
            control={control}
            name={`medications.${index}.medication_id`}
            render={({ field }) => (
              <Checkbox
                id={name}
                checked={!!medications.find((med: { medication_id: string }) => med?.medication_id === id)}
                onChange={e => {
                  handleCheckboxChange(e);
                  field.onChange(e.target.value ? id : undefined);
                }}
              />
            )}
          />
          <span>{name}</span>
        </div>
      </Label>

      <div>
        <Controller
          name={`medications.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <input placeholder="Liều lượng..." className="border" value={field.value || ''} onChange={field.onChange} />
          )}
        />
        <Controller
          name={`medications.${index}.duration`}
          control={control}
          render={({ field }) => (
            <input
              placeholder="Thời gian sử dụng..."
              className="border"
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name={`medications.${index}.instructions`}
          control={control}
          render={({ field }) => (
            <input
              placeholder="Hướng dẫn sử dụng..."
              className="border"
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </>
  );
};

export default Medication;
