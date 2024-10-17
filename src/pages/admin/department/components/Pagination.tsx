import { Pagination } from '@mui/material';
import {
  gridPageCountSelector,
  gridPaginationModelSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

const Paginations = () => {
  const apiRef = useGridApiContext();
  const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      count={pageCount}
      page={paginationModel.page + 1}
      onChange={(_, value) => {
        apiRef.current.setPage(value - 1);
      }}
      className="mx-auto"
    />
  );
};
export default Paginations;
