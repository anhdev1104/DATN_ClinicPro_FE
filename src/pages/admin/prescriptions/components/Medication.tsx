import Input from '@/components/input';
import Label from '@/components/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Medication {
  name: string;
  id: string;
}

const Medication = ({ name, id }: Medication) => {
  const [active, setActives] = useState(false);
  const { control } = useForm({
    mode: 'onChange'
  });

  const handleActive = () => {
    setActives(!active);
  };

  return (
    <div>
      <div onClick={handleActive}>
        <div className="py-3 gap-2 px-2 rounded-lg flex items-center border border-borderColor hover:bg-slate-300 cursor-pointer">
          <input type="checkbox" value={id} name={name} id={name} />
          <Label className="!mb-0" htmlFor={name} children={name} />
        </div>
        <div></div>
      </div>
      <div>
        {active && (
          <div>
            <Input control={control} placeholder="Nhập liều lượng ..." type="text" name="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Medication;
