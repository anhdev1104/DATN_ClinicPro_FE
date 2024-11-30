import { Button } from '@/components/button';
import DirectRoute from '@/components/direct';
import Field from '@/components/field';
import { List } from '@/components/icons';
import Input from '@/components/input';
import Label from '@/components/label';
import { ModalConfirm } from '@/components/modal';
import yup from '@/helpers/locate';
import { getSpecialtyById, updateSpecialties } from '@/services/specialties.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
});

const EditSpecialties = () => {
  const { handleSubmit, control, reset } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const [activeModal, setActiveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getSpecialtyById(id);
        if (response?.data) {
          reset({
            name: response.data.name,
            description: response.data.description,
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Lỗi khi lấy dữ liệu chuyên khoa:', error);
      }
    })();
  }, [id, reset]);

  const handleCloseModal = () => {
    setActiveModal(false);
    setIsLoading(false);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await updateSpecialties(id, data);
      setIsLoading(false);
      handleCloseModal();
      toast.success(response.message, { position: 'top-right' });
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  const handleSubmitForm = handleSubmit(onSubmit);

  return (
    <div>
      <DirectRoute nav="Quản lý chuyên khoa" subnav="Chuyên khoa" targetnav="Tạo chuyên khoa" />
      <div className="bg-white size-full p-[20px] rounded-[26px]">
        <div className="mb-6 w-full flex items-center justify-between gap-5">
          <div>
            <h1 className="text-[18px] text-black font-medium">Thêm chuyên khoa</h1>
          </div>
          <div className="border-borderColor border px-3 py-2 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
            <Link to={'/specialties'} className="text-dark font-medium flex items-center gap-3">
              <List className="text-primaryAdmin" />
              Danh sách chuyên khoa
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
          <div className="flex w-full gap-10 mb-5">
            <Field className="flex gap-3 flex-col">
              <Label htmlFor="name">Tên chuyên khoa:</Label>
              <Input
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                placeholder="Tên chuyên khoa ..."
                name="name"
                type="text"
                control={control}
              />
            </Field>
            <Field className="flex gap-3 flex-col">
              <Label htmlFor="description">Chi tiết:</Label>
              <Input
                className="h-[40px] !font-normal !text-dark rounded-md bg-white focus:border-third"
                placeholder="Chi tiết ..."
                name="description"
                type="text"
                control={control}
              />
            </Field>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setActiveModal(true)}
              type="button"
              styled="normal"
              className="bg-primaryAdmin text-white disabled:bg-primaryAdmin/50"
            >
              Xác nhận
            </Button>
            <Button onClick={() => navigate(-1)} type="button" styled="normal">
              Quay lại
            </Button>
          </div>
        </form>
      </div>
      <ModalConfirm
        description="Dữ liệu sẽ không thể khôi phục"
        title="Bạn có chắc muốn sửa"
        isClose={handleCloseModal}
        isOpen={activeModal}
        submit={handleSubmitForm}
        isLoading={isLoading}
        className="bg-primaryAdmin hover:bg-primaryAdmin/50"
      />
    </div>
  );
};

export default EditSpecialties;
