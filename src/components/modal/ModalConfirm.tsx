import { Dialog } from '@mui/material';
import { Button } from '../button';

type TConfirm = {
  title: string;
  description: string;
  isOpen: boolean;
  isClose: () => void;
  submit?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

const ModalConfirm = ({ title, description, isOpen, isClose, submit, isLoading, disabled, className }: TConfirm) => {
  return (
    <Dialog open={isOpen} onClose={isClose} maxWidth="sm" fullWidth>
      <div className="p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <Button
            isLoading={isLoading}
            disabled={disabled}
            onClick={submit}
            type="submit"
            className={`text-white  px-4 py-2 rounded-md transition-all min-w-[104px] ${className} `}
          >
            Xác nhận
          </Button>
          <Button
            type="button"
            onClick={isClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition-all text-white"
          >
            Hủy bỏ
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalConfirm;
