import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import { List } from '@/components/icons';
import Input from '@/components/input';
import Label from '@/components/label';
import Select from '@/components/select';
import convertToOptions from '@/helpers/convertToOptions';
import { useForm } from 'react-hook-form';

interface AddMedicalHistories {
  navigate: () => void;
}

const patients = [
  {
    id: '2106be70-9502-4c7a-944b-3367a0d203fd',
    name: 'Nguyễn Thành Đường cccc kkk12k3k123123',
  },
  {
    id: 'a349580b-3713-46ea-b51a-936fc70cfe63',
    name: 'Ngọc Hải',
  },
  {
    id: '13b50927-da93-47e7-9a4b-e1c14fc951e1',
    name: 'Lê Nguyễn Bảo Tâm',
  },
  {
    id: 'ee4c008f-4c3b-4c2c-b2d5-dd3ffaf60873',
    name: 'Nguyễn Văn Hậu',
  },
];
const AddMedicalHistories = ({ navigate }: AddMedicalHistories) => {
  const { control } = useForm();
  return (
    <div>
      <DirectRoute nav="Quản lý bệnh án" subnav="Bệnh án" targetnav="Tạo bệnh án" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 flex items-center justify-start gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Thêm bệnh án</h1>
          </div>
          <button
            onClick={navigate}
            className="text-[18px] font-medium gap-3 border-borderColor border p-2 rounded-lg bg-[#f3f4f7]"
          >
            <List className="text-primaryAdmin" />
          </button>
        </div>
        <form action="">
          <div className="flex gap-3">
            <Field className="flex gap-3 flex-col">
              <Label htmlFor="diagnosis">Bệnh chấn đoán:</Label>
              <Input placeholder="Chẩn đoán ..." name="diagnosis" type="text" control={control} />
            </Field>
            <Field className="flex gap-3 flex-col">
              <Label htmlFor="treatment">Phương pháp điều trị:</Label>
              <Input placeholder="Phương pháp ..." name="treatment" type="text" control={control} />
            </Field>
            <Field className="flex gap-3 flex-col">
              <Label htmlFor="description">Mô tả bệnh án:</Label>
              <Input placeholder="Mô tả ..." name="description" type="text" control={control} />
            </Field>
          </div>
          <Select
            placeholder="Danh sách bệnh nhân"
            control={control}
            name="patient_id"
            options={convertToOptions(patients)}
          />
        </form>
      </div>
    </div>
  );
};

export default AddMedicalHistories;
