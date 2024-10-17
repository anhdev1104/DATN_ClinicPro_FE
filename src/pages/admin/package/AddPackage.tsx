import React, { useState } from 'react';
import { createPackage } from '@/services/package.service';
import { IPackage } from '@/types/package.type';
import { useNavigate } from 'react-router-dom';

const AddPackage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [responsePackage, setResponsePackage] = useState<IPackage | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      const response = await createPackage(formData as unknown as IPackage);
      setResponsePackage(response);
      console.log('Gói khám đã được tạo thành công!');
      setLoading(false);

      // Navigate to package list after creation (optional)
      navigate('/package');
    } catch (error) {
      console.log('Đã xảy ra lỗi khi tạo gói khám. Vui lòng thử lại.');
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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
        <div className="doctor-table-blk mb-2 pt-4 px-5 flex items-center flex-wrap gap-7">
          <h3 className="text-lg font-semibold mb-0">Thêm gói khám</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Tên gói khám <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
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
                value={description}
                onChange={e => setDescription(e.target.value)}
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
              value={content}
              onChange={e => setContent(e.target.value)}
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
                accept="image/*"
                onChange={handleImageChange}
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
                onClick={() => navigate('/packages')}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </form>
        {message && <p className="text-red-500">{message}</p>}

        {responsePackage && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <h2>Kết quả:</h2>
            <p>
              <strong>ID:</strong> {responsePackage.id}
            </p>
            <p>
              <strong>Slug:</strong> {responsePackage.slug}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {responsePackage.created_at}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddPackage;
