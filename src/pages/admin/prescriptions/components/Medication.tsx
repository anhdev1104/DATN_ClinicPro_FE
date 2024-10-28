import Label from '@/components/label';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { Checkbox } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';

type TMedication = {
  id: number;
  name: string;
  index: number;
};

const Medication: React.FC<TMedication> = ({ id, name, index }) => {
  const {
    form: { control, getValues, setValue },
  } = usePrescriptionContextForm();
  console.log(getValues());

  const medications = useWatch({ control, name: 'medications' }) || [];
  const quantity = getValues(`medications.${index}.quantity`) || '';
  const duration = getValues(`medications.${index}.duration`) || '';
  const instructions = getValues(`medications.${index}.instructions`) || '';

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    const currentMedications = getValues('medications') || [];

    if (isSelected) {
      const isCheckedArr = currentMedications.filter(med => med.medication_id !== undefined);
      setValue('medications', [
        ...isCheckedArr,
        {
          medication_id: id,
          quantity: quantity as number,
          duration: duration as number,
          instructions,
        },
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
            render={() => (
              <Checkbox
                id={name}
                checked={!!medications.find((med: { medication_id: number }) => med.medication_id === id)}
                onChange={e => {
                  handleCheckboxChange(e);
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
          render={({ field }) => <input placeholder="Liều lượng..." className="border" {...field} />}
        />
        <Controller
          name={`medications.${index}.duration`}
          control={control}
          render={({ field }) => <input placeholder="Thời gian sử dụng..." className="border" {...field} />}
        />
        <Controller
          name={`medications.${index}.instructions`}
          control={control}
          render={({ field }) => <input placeholder="Hướng dẫn sử dụng..." className="border" {...field} />}
        />
      </div>
    </>
  );
};

export default Medication;
