// import Input from '@/components/input';
// import { useForm } from 'react-hook-form';
import DirectRoute from '@/components/direct';
import { Link } from 'react-router-dom';
import { List } from '@/components/icons';
import { useForm } from 'react-hook-form';
import yup from '@/helpers/locate';
import { yupResolver } from '@hookform/resolvers/yup';
import Field from '@/components/field';
import Label from '@/components/label';
import Input from '@/components/input';
import { Button } from '@/components/button';
import { createSpecialties } from '@/services/specialties.service';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
});

const AddSpecialties = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = async (data: any) => {
    try {
      const response = await createSpecialties(data);
      toast.success(response.message, { position: 'top-right' });
      reset();
    } catch (error) {
      return error;
    }
  };
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
                className="h-[48px] text-primaryAdmin"
                placeholder="Tên chuyên khoa ..."
                name="name"
                type="text"
                control={control}
              />
            </Field>
            <Field className="flex gap-3 flex-col">
              <Label htmlFor="description">Chi tiết:</Label>
              <Input
                className="h-[48px] text-primaryAdmin"
                placeholder="Chi tiết ..."
                name="description"
                type="text"
                control={control}
              />
            </Field>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              isLoading={isSubmitting}
              type="submit"
              styled="normal"
              className="bg-primaryAdmin text-white disabled:bg-primaryAdmin/50"
            >
              Xác nhận
            </Button>
            <Button onClick={() => reset()} type="submit" styled="normal">
              Nhập lại
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpecialties;
