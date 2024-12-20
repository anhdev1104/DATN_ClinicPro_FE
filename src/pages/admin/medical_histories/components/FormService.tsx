import { SearchIcon } from '@/components/icons';
import Input from '@/components/input';
import yup from '@/lib/utils/yup';
import { Services } from '@/types/services.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog } from '@mui/material';
import { useForm } from 'react-hook-form';

interface ModalServiceProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  onSelectService: any;
  selectServiceId: any;
  services: Services[];
}

const searchSchema = yup.object().shape({
  search: yup.string().min(3, 'Từ khóa tìm kiếm phải ít nhất 3 ký tự.').required('Vui lòng nhập từ khoá tìm kiếm!'),
});

const FormService = ({
  isDialogOpen,
  handleCloseDialog,
  onSelectService,
  selectServiceId,
  services,
}: ModalServiceProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { search: '' },
    resolver: yupResolver(searchSchema),
  });

  const toggleItem = (item: any) => {
    onSelectService((prevItems: any) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((prevItem: any) => prevItem !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };

  const onSubmit = async (data: any) => {
    console.log(data);
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex-[0_0_50%] flex justify-end items-center gap-3">
          <Input
            colorGlass="text-primaryAdmin"
            className="placeholder:text-sm text-sm text-primaryAdmin h-[40px]"
            control={control}
            name="search"
            placeholder="Tìm dịch vụ ..."
          />
          <button
            type="submit"
            className="w-[53px] h-[40px] flex items-center justify-center bg-primaryAdmin rounded-[6px] transition-all duration-300 ease-linear hover:bg-white hover:border-primaryAdmin border border-transparent group"
          >
            <SearchIcon className="text-white group-hover:text-primaryAdmin transition-all" />
          </button>
        </form>
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
                  {service.price} VNĐ
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
