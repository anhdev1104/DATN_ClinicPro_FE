import Search from '@/components/search/Search';
import { PopupNewDepartment } from '@/redux/department/departmentSlice';
import { AddRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

const HeaderDepartment = () => {
  const dispatch = useDispatch();
  const handleShowPopup = () => {
    dispatch(PopupNewDepartment(true));
  };
  return (
    <>
      <div className="p-2 flex justify-between">
        <Search />
        <IconButton
          onClick={handleShowPopup}
          color="primary"
          aria-label="add new department"
          className="px-3"
          size="small"
        >
          <AddRounded />
        </IconButton>
      </div>
    </>
  );
};
export default HeaderDepartment;
