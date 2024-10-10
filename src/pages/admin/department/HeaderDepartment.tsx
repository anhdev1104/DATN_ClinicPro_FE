import Search from '@/components/search/Search';
import { AddRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const HeaderDepartment = () => {
  return (
    <>
      <div className='p-2 flex justify-between'>
        <Search />
        <IconButton color="primary" aria-label="add new department" className='px-3' size='small'>
          <AddRounded />
        </IconButton>
      </div>
    </>
  );
};
export default HeaderDepartment;
