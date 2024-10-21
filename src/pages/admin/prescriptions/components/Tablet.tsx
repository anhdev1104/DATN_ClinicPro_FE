import { FC } from 'react';
import { ITablet } from '@/types/Tablet.type';

interface ICPtablet {
  tablet: ITablet;
  value: number;
  checked: boolean;
  // Kiểu hàm xử lý sự kiện
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Tablet: FC<ICPtablet> = ({ tablet, value, checked, onChange }) => {
  return (
    <div>
      <label className="flex items-center">
        <input type="checkbox" value={value} checked={checked} onChange={onChange} />
        <span className="ml-2">{tablet.name}</span>
      </label>
    </div>
  );
};

export default Tablet;
