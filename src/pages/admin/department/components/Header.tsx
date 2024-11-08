import Search from '@/components/search/Search';
import { AddRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import NewDepartment from '../NewDepartment';

const HeaderDepartment = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className="p-2 flex justify-between">
        <Search />
        <IconButton onClick={open} color="primary" aria-label="add new department" className="px-3" size="small">
          <AddRounded />
        </IconButton>
      </div>
      <Modal radius="md" size="lg" centered opened={opened} onClose={close} title="Tạo Mới Phòng Ban">
        <NewDepartment handleClose={close} />
      </Modal>
    </>
  );
};
export default HeaderDepartment;
