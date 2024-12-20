import { Services } from '@/types/services.type';
import { NumberFormatter } from '@mantine/core';
import { Dialog } from '@mui/material';

interface ModalServiceProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  onSelectService: any;
  selectServiceId: any;
  services: Services[];
}

const FormService = ({
  isDialogOpen,
  handleCloseDialog,
  onSelectService,
  selectServiceId,
  services,
}: ModalServiceProps) => {
  const toggleItem = (item: any) => {
    onSelectService((prevItems: any) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((prevItem: any) => prevItem !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          overflowY: 'scroll',
          '::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: '#fff',
          padding: '20px',
          paddingBottom: '50px',
          width: '1000px',
          height: '800px',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'none',
          overflowY: 'scroll',
        },
      }}
      open={isDialogOpen}
      onClose={handleCloseDialog}
    >
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] font-bold">Danh sách dịch vụ</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {services.map(service => (
          <div
            key={service.id}
            onClick={() => toggleItem(service.id)}
            className="w-[100%] bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-300 cursor-pointer relative"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-medium text-gray-900">{service.service_name}</h3>

              <p className="text-[14px] text-gray-500">{service.description}</p>

              <div className="flex items-center justify-end mt-2">
                <div className="px-3 py-1 bg-pink-500 text-white rounded-full text-[12px] font-medium">
                  <NumberFormatter suffix="VNĐ " value={service.price} thousandSeparator />
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={selectServiceId.includes(service.id)}
              className="absolute top-[6px] right-[4px]"
              onClick={() => toggleItem(service.id)}
              onChange={() => toggleItem(service.id)}
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default FormService;
