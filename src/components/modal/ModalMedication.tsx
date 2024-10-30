import { Dialog } from '@mui/material';
import Label from '../label';
import Select from '../select';
import Input from '../input';
import { SearchIcon } from '../icons';
import Medication from '@/pages/admin/prescriptions/components/Medication';
import { FC } from 'react';
import { IMedications } from '@/types/prescription.type';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { Option } from '../select/Select';

interface IModalMedication {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  medications: IMedications[];
  medicationCategory: Option[];
}

const ModalMedication: FC<IModalMedication> = ({
  isDialogOpen,
  handleCloseDialog,
  medications,
  medicationCategory,
}) => {
  const {
    form: { control },
  } = usePrescriptionContextForm();

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: '#fff',
          padding: '20px',
          width: '1000px',
          height: '800px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'none',
        },
      }}
      open={isDialogOpen}
      onClose={handleCloseDialog}
    >
      <div className="flex justify-between items-end mb-6">
        <div className="flex justify-center items-start flex-col gap-2">
          <Label htmlFor="categoryId">Danh mục thuốc</Label>
          <Select placeholder="Đơn thuốc chỉ định" name="isCategory" control={control} options={medicationCategory} />
        </div>
        <div className="flex-[0_0_50%] flex justify-end items-center gap-3">
          <Input
            colorGlass="text-primaryAdmin"
            className="placeholder:text-sm text-sm text-primaryAdmin h-[40px] "
            control={control}
            name="search"
            placeholder="Tìm thuốc ..."
          />
          <button
            type="submit"
            className={`w-[53px] h-[40px] flex items-center justify-center bg-primaryAdmin rounded-[9px] transition-all duration-300 ease-linear`}
          >
            <SearchIcon className="text-white" />
          </button>
        </div>
      </div>

      <div>
        {medications.length > 0 ? (
          <ul className="space-y-2">
            {medications.map((medication: any, index: number) => (
              <Medication key={medication.id} name={medication.name} id={medication.id} index={index} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">Không có thuốc nào cho danh mục này.</p>
        )}
      </div>
    </Dialog>
  );
};

export default ModalMedication;
