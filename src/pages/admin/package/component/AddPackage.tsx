import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from '@/components/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { createPackage } from '@/services/package.service';
import { IPackage } from '@/types/package.type';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/input';
import Field from '@/components/field';
import Label from '@/components/label';
import MessageForm from '@/components/message';
import * as yup from 'yup';
import DirectRoute from '@/components/direct';

const schema = yup.object().shape({
  name: yup.string().trim().required('Không được để trống'),
  description: yup.string().required('Không được để trống'),
  content: yup.string().trim().required('Không được để trống'),
  image: yup.mixed().required('Vui lòng chọn 1 file'),
});
interface ListPackage {
  navigate: () => void;
}

const AddPackage = ({ navigate }: ListPackage) => {
  const [loading, setLoading] = useState(false);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
    }
  };

  const handleCreate: SubmitHandler<IPackage> = async data => {
    if (!isValid) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('content', data.content);
    formData.append('image', data.image);
    const res = await createPackage(formData);
    if (res.errors) {
      toast.error('Thêm gói khám bị thất bại');
      console.log(res.message);
    } else {
      toast.success('Thêm gói khám thành công');
      navigate('/packages');
    }
    setLoading(false);
    reset();
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
        <form className="space-y-6 p-6" encType="multipart/form-data" onSubmit={handleSubmit(handleCreate)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Field>
                <Label htmlFor="name" className="text-sm font-medium mb-1">
                  Tên gói khám <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  className="border rounded-md p-2 focus:ring-2  outline-none !font-normal !text-dark bg-white focus:border-third"
                  placeholder="Nhập tên gói khám"
                  control={control}
                />
              </Field>
              <MessageForm error={errors.name?.message} />
            </div>
            <div className="flex flex-col">
              <Field>
                <Label htmlFor="description" className="text-sm font-medium mb-1">
                  Mô tả <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="description"
                  type="text"
                  className="border rounded-md p-2 focus:ring-2  outline-none !font-normal !text-dark  bg-white focus:border-third"
                  placeholder="Nhập mô tả"
                  control={control}
                />
              </Field>
              <MessageForm error={errors.description?.message} />
            </div>
          </div>
          <div className="flex flex-col">
            <Field>
              <Label htmlFor="content" className="text-sm font-medium mb-1">
                Nội dung gói khám <span className="text-red-500">*</span>
              </Label>
              <Input
                name="content"
                type="text"
                className="border rounded-md p-2 focus:ring-2  outline-none !font-normal !text-dark  bg-white focus:border-third min-h-[100px]"
                placeholder="Nhập nội dung"
                control={control}
              />
            </Field>
            <MessageForm error={errors.content?.message} />
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="flex flex-col">
              <Label htmlFor="image" className="text-sm font-medium mb-1">
                Hình ảnh <span className="text-red-500">*</span>
              </Label>
              <input
                name="image"
                type="file"
                className="border rounded-md p-2 focus:ring-2  outline-none !font-normal !text-dark  bg-white focus:border-third"
                onChange={handleFileChange}
              />
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
                Hủy bỏ
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPackage;
