import useToggle from '@/hooks/useToggle';
import { Dialog } from '@mui/material';

type ConfirmDelete = {
  title: string;
  description: string;
};

const ModalDelete = ({ title, description }: ConfirmDelete) => {
  const { show, handleToggle } = useToggle();

  return (
    <Dialog open={show} onClose={handleToggle}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button>Xoá</button>
        <button>Quay lại</button>
      </div>
    </Dialog>
  );
};

export default ModalDelete;
