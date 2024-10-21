import React, { useState } from 'react';
import { createPackage } from '@/services/package.service';
import { IPackage } from '@/types/package.type';
import { useNavigate } from 'react-router-dom';
import { List } from '@mui/icons-material';
import { toast } from 'react-toastify';
const AddPackage = () => {
  const [loading, setLoading] = useState(false);
  const [responsePackage, setResponsePackage] = useState<IPackage | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IPackage>({
    name: '',
    description: '',
    content: '',
    image: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        image: imageUrl
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponsePackage(null);
    try {
      const createdPackage = await createPackage(formData);
      console.log('Form data submitted:', formData);
      setResponsePackage(createdPackage);
      toast.success('Gói khám đã được tạo thành công!');
      console.log('ID:', createdPackage.id);
      console.log('Slug:', createdPackage.slug);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tạo gói khám.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="createpackage">
      <div className="text-primaryAdmin flex items-center text-base mb-11">
        <h2>Gói khám</h2>
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall mx-2 css-18w7uxr-MuiSvgIcon-root"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ChevronRightIcon"
        >
          <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
        <span className="text-primaryAdmin/60">Thêm gói khám</span>
      </div>
      <div className="bg-white rounded-2xl">
        <div className="doctor-table-blk mb-2 pt-4 px-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-0">Thêm gói khám</h3>
          <div className="border-borderColor border p-3 rounded-lg bg-[#f3f4f7] transition-all ease-linear hover:bg-white cursor-pointer">
            <button className="text-dark font-medium flex items-center gap-3">
              <List className="text-primaryAdmin" />
              Danh sách đơn thuốc
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 p-6" encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Tên gói khám <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên "
                className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả"
                className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Nội dung gói khám <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Nhập nội dung gói"
              className="border rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Hình ảnh <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="image"
                onChange={handleFileChange} // Gọi hàm xử lý file
                required
                className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
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
                onClick={() => navigate('/package')}
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
