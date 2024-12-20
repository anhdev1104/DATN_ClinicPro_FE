import { Dialog, DialogTitle } from '@mui/material';

type TRolesDetailProps = {
  open: boolean;
  onClose: () => void;
};

const RolesDetail = ({ open, onClose }: TRolesDetailProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chi tiết role</DialogTitle>
    </Dialog>
  );
};

export default RolesDetail;
