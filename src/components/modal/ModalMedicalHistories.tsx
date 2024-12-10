import { Dialog, DialogContent } from '@mui/material';
import { FC } from 'react';
import { CloseIcon, SearchIcon } from '../icons';
import Label from '../label';
import Input from '../input';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import MedicalRecords from '@/pages/admin/medical_histories/components/MedicalRecords';

interface IModalMedicalHistories {
  open: boolean;
  onClose: () => void;
}

const ModalMedicalHistories: FC<IModalMedicalHistories> = ({ open, onClose }) => {
  const {
    form: { control },
  } = usePrescriptionContextForm();

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: '#fff',
          padding: '20px 5px 20px 20px',
          width: '1000px',
          height: '800px',
          borderRadius: '8px',
          maxWidth: 'none',
        },
      }}
      open={open}
      onClose={onClose}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-10">
          <Label className="text-lg">Danh sách bệnh án</Label>
          <div className="flex justify-end items-center gap-3">
            <Input
              colorGlass="text-primaryAdmin"
              className="placeholder:text-xs text-xs !text-gray-500 h-[35px] !font-light focus:border-third min-w-[300px]"
              control={control}
              name="search"
              placeholder="Tìm bệnh án ..."
            />
            <button
              type="submit"
              className={`w-12 h-[35px] flex items-center justify-center bg-primaryAdmin rounded-md transition-all duration-300 ease-linear hover:bg-primaryAdmin/70`}
            >
              <SearchIcon className="text-white" />
            </button>
          </div>
        </div>
        <div
          className="flex justify-end mb-3 transition-all ease-linear hover:bg-primaryAdmin/5 cursor-pointer p-2 w-fit ml-auto rounded-full absolute right-3 top-2"
          onClick={onClose}
        >
          <CloseIcon />
        </div>
      </div>
      <DialogContent sx={{ p: 0, pr: '15px' }} className="scroll-select">
        <MedicalRecords closeModalMedicalRecords={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalMedicalHistories;
