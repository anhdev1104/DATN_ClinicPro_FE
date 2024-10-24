import Input from '@/components/input';
import Label from '@/components/label';
import { Checkbox } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IMedication } from './AddPrescriptions';

const Medication = ({
  name,
  id,
  setMedication,
  handleChange,
}: {
  name: string;
  id: number;
  setMedication: React.Dispatch<React.SetStateAction<IMedication[]>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [active, setActives] = useState(false);

  const { control } = useForm({
    mode: 'onChange',
  });

  const handleActive = () => {
    setActives(!active);
  };

  return (
    <div>
      <div onClick={handleActive}>
        <div className="py-3 gap-2 px-2 rounded-lg flex items-center border border-borderColor hover:bg-slate-300 cursor-pointer">
          {/* <input type="checkbox" value={id} name={name} id={name} /> */}
          <Checkbox name="medication_id" id={name} value={id} onChange={handleChange} />
          <Label className="!mb-0" htmlFor={name} children={name} />
        </div>
        <div></div>
      </div>
      <div>
        {active && (
          <div>
            <input placeholder="Liều lượng ..." name="quantity" value={} onChange={handleChange} />
            <input placeholder="Số ngày ..." name="duration" onChange={handleChange} />
            <input placeholder="Hướng dẫn ..." name="instructions" onChange={handleChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Medication;
