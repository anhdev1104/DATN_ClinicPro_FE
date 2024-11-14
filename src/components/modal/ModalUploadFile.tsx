import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '@/services/uploadFile.service';

interface UploadFileProps {
  onUploadSuccess: (url: string) => void;
}
const UploadFile: React.FC<UploadFileProps> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await uploadFile(formData);
        const imageUrl = response?.url;
        if (imageUrl) {
          onUploadSuccess(imageUrl);
        } else {
          console.error('Không tìm thấy URL ảnh trong phản hồi:', response);
        }
      } catch (error) {
        console.error('Lỗi khi tải lên:', error);
        toast.error('Upload thất bại!');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Vui lòng chọn một file');
    }
  };

  return (
    <div className="flex flex-col ">
      <input
        id="image"
        name="image"
        type="file"
        className="border rounded-md p-2 focus:ring-2  outline-none !font-normal !text-dark  bg-white focus:border-third"
        onChange={handleFileChange}
      />
      {loading && <p>Đang tải lên...</p>}
    </div>
  );
};

export default UploadFile;
