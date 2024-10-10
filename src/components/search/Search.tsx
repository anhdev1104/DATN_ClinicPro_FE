import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import { Directions } from '@mui/icons-material';
import { SearchIcon } from '../icons';
const Search = () => {
  return (
    <>
      <Paper
        className='flex items-center w-[400px] shadow-md rounded-full py-[2px] px-1'
        component='div'>
        <SearchIcon className='m-2' color='disabled' />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <Divider className='h-7 m-1' orientation="vertical" />
        <IconButton
          className='p-[10px]'
          color="primary" aria-label="directions">
          <Directions />
        </IconButton>
      </Paper>
    </>
  );
};
export default Search;
