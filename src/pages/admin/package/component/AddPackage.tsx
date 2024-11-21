import React, { useEffect, useState } from 'react';
import { List } from '@/components/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { createPackage, getCategory } from '@/services/package.service';
import { getSpecialties } from '@/services/specialties.service';
import UploadFile from '@/components/modal/ModalUploadFile';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import MessageForm from '@/components/message';
import * as yup from 'yup';
import DirectRoute from '@/components/direct';
import Select from '@/components/select';
import convertToOptions from '@/helpers/convertToOptions';

const schema = yup.object().shape({
  name: yup.string().trim().required('Không được để trống'),
  description: yup.string().required('Không được để trống'),
  content: yup.string().trim().required('Không được để trống'),
  image: yup.mixed().required('Vui lòng chọn 1 file'),
  category_id: yup.string().nullable().required('Vui lòng chọn danh mục'),
  specialty_id: yup.string().nullable().required('Vui lòng chọn chuyên khoa'),
});

interface ListPackage {
  navigate: () => void;
}

const AddPackage = ({ navigate }: ListPackage) => {
  const [loading, setLoading] = useState(false);
  const [packageCategory, setPackageCategory] = useState([]);
  const [Specialty, SetSpecialty] = useState([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const categoryRes = await getCategory();
        const specialtyRes = await getSpecialties();
        setPackageCategory(convertToOptions(categoryRes));
        SetSpecialty(convertToOptions(specialtyRes));
      } catch (error) {
        toast.error('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);
  const handleUploadSuccess = (url: string) => {
    setImageUrl(url);
    setValue('image', url);
  };
  const handleCreate: SubmitHandler<any> = async data => {
    if (!isValid) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('content', data.content);
    formData.append('image', imageUrl);
    formData.append('category_id', data.category_id);
    formData.append('specialty_id', data.specialty_id);
    const res = await createPackage(formData);
    if (res.errors) {
      toast.error('Thêm gói khám thất bại');
      console.log(res.message);
    } else {
      toast.success('Thêm gói khám thành công');
      console.log(res.data);
      reset();
      setImageUrl('');
    }
    setLoading(false);
  };

  return (
    <section className="createpackage">
      <DirectRoute nav="Quản lý gói khám" subnav="Thêm mới gói khám" />
      <div className="bg-white rounded-2xl">
        <div className="doctor-table-blk mb-2 pt-4 px-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-0">Thêm gói khám</h3>
          <div className="border-borderColor border p-3 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
            <button onClick={navigate} className="text-dark font-medium flex items-center gap-3">
              <List className="text-primaryAdmin" />
              Danh sách đơn thuốc
            </button>
          </div>
        </div>
        <form
          className="space-y-6 p-6 overflow-hidden"
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleCreate)}
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <Field>
                <Label htmlFor="name" className="text-sm font-medium mb-1">
                  Tên gói khám <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  className=" w-1/2 border rounded-md p-2 focus:ring-2 outline-none !font-normal !text-dark bg-white focus:border-third"
                  placeholder="Nhập tên gói khám"
                  control={control}
                />
              </Field>
              <MessageForm error={errors.name?.message} />
            </div>
            <div className="min-w-[380px] w-[45%]">
              <Label htmlFor="categoryId">
                Danh mục gói khám<span className="text-red-500">*</span>
              </Label>
              <Select placeholder="Danh mục gói khám" name="category_id" control={control} options={packageCategory} />
              <MessageForm error={errors.category_id?.message} />
            </div>
            <div className="min-w-[380px] w-[45%]">
              <Label htmlFor="specialty_id" className="text-sm font-medium mb-1">
                Chuyên khoa <span className="text-red-500">*</span>
              </Label>
              <Select placeholder="Chọn chuyên khoa" name="specialty_id" control={control} options={Specialty} />
              <MessageForm error={errors.specialty_id?.message} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Field>
                <Label htmlFor="description" className="text-sm font-medium mb-1">
                  Mô tả <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="description"
                  type="text"
                  className="border rounded-md p-2 focus:ring-2 outline-none !font-normal !text-dark bg-white focus:border-third min-h-[100px]"
                  placeholder="Nhập mô tả"
                  control={control}
                />
              </Field>
              <MessageForm error={errors.description?.message} />
            </div>
            <div className="flex flex-col">
              <Field>
                <Label htmlFor="content" className="text-sm font-medium mb-1">
                  Nội dung gói khám <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="content"
                  type="text"
                  className="border rounded-md p-2 focus:ring-2 outline-none !font-normal !text-dark bg-white focus:border-third min-h-[100px]"
                  placeholder="Nhập nội dung"
                  control={control}
                />
              </Field>
              <MessageForm error={errors.content?.message} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="flex flex-col">
              <Label htmlFor="image" className="text-sm font-medium mb-1">
                Hình ảnh <span className="text-red-500">*</span>
              </Label>
              <UploadFile onUploadSuccess={handleUploadSuccess} />
              <MessageForm error={errors.image?.message} />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                {loading ? 'Đang tạo...' : 'Tạo gói khám'}
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                onClick={navigate}
              >
                Thoát
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPackage;
