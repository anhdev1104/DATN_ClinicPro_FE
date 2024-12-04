import { Dialog } from '@mui/material';
import Label from '../label';
import Select from '../select';
import Input from '../input';
import { CloseIcon, SearchIcon } from '../icons';
import Medication from '@/pages/admin/prescriptions/components/Medication';
import { FC } from 'react';
import { IMedications } from '@/types/prescription.type';
import { usePrescriptionContextForm } from '@/providers/PrescriptionProvider';
import { Option } from '../select/Select';
import LoadingSpin from '../loading';
import { Button } from '@mantine/core';

interface IModalMedication {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  medications: IMedications[];
  medicationCategory: Option[];
  loading: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMedication: FC<IModalMedication> = ({
  isDialogOpen,
  handleCloseDialog,
  medications,
  medicationCategory,
  loading,
  setIsDialogOpen,
}) => {
  const {
    form: { control },
  } = usePrescriptionContextForm();

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: '#fff',
          padding: '30px 20px 20px',
          width: '1000px',
          height: '800px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'none',
          position: 'relative',
        },
      }}
      open={isDialogOpen}
      onClose={handleCloseDialog}
    >
      <div
        className="flex justify-end mb-3 transition-all ease-linear hover:bg-primaryAdmin/5 cursor-pointer p-2 w-fit ml-auto rounded-full absolute right-4 top-2"
        onClick={handleCloseDialog}
      >
        <CloseIcon />
      </div>
      <div className="flex justify-between items-end mb-6 ">
        <div className="flex justify-center items-start flex-col gap-2">
          <Label htmlFor="categoryId">Danh mục thuốc</Label>
          <Select
            placeholder="Đơn thuốc chỉ định"
            name="isCategory"
            control={control}
            options={medicationCategory}
            className="w-[400px]"
          />
        </div>
        <div className="flex-[0_0_40%] flex justify-end items-center gap-3">
          <Input
            colorGlass="text-primaryAdmin"
            className="placeholder:text-sm text-sm text-primaryAdmin h-[40px] "
            control={control}
            name="search"
            placeholder="Tìm thuốc ..."
          />
          <button
            type="submit"
            className={`w-[53px] h-[40px] flex items-center justify-center bg-primaryAdmin rounded-[9px] transition-all duration-300 ease-linear hover:bg-primaryAdmin/70`}
          >
            <SearchIcon className="text-white" />
          </button>
        </div>
      </div>

      <div className="h-full overflow-y-auto pr-3 scroll-select">
        {!loading && medications.length > 0 ? (
          <div className="space-y-2">
            {medications.map((medication: any, index: number) => (
              <Medication key={medication.id} name={medication.name} id={medication.id} index={index} />
            ))}
          </div>
        ) : !loading ? (
          <p className="text-gray-500 text-center">Không có thuốc nào cho danh mục này.</p>
        ) : (
          <div className="mx-auto text-center pt-10">
            <LoadingSpin className="!w-10 !h-10" color="border-primaryAdmin" />
          </div>
        )}
      </div>
      <Button className="w-fit text-sm ml-auto mr-5 mt-5" size="md" onClick={() => setIsDialogOpen(false)}>
        Xác nhận
      </Button>
    </Dialog>
  );
};

export default ModalMedication;
