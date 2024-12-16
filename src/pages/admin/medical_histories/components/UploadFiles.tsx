import Label from '@/components/label';
import { FileMidecal } from '@/types/medicalHistories.type';
import React, { useState, forwardRef, useImperativeHandle, useRef, SetStateAction, Dispatch } from 'react';

interface ImageItem {
  file?: any;
  description?: string;
  preview?: string;
  type?: 'image' | 'pdf';
  url?: string;
  id?: any;
}

interface UploadFilesProps {
  initData?: ImageItem[];
  setInitData?: Dispatch<SetStateAction<FileMidecal[] | []>>;
  handleRemoveFilesOld?: (id: string) => void;
  handleChangeDescriptionOld?: (url: string, newDescription: string) => void;
}

const UploadFiles = forwardRef((_props: UploadFilesProps, ref) => {
  const { initData = [], handleRemoveFilesOld, handleChangeDescriptionOld } = _props;
  const [files, setFiles] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => {
        const type = file.type.startsWith('image') ? 'image' : 'pdf';

        return {
          file,
          description: '',
          preview: type === 'image' ? URL.createObjectURL(file) : '',
          type: type as 'image' | 'pdf',
        };
      });
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDescriptionChange = (index: number, newDescription: string) => {
    setFiles(prevFiles => prevFiles.map((file, i) => (i === index ? { ...file, description: newDescription } : file)));
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  useImperativeHandle(ref, () => ({
    getFiles: () => files,
    resetFiles: () => setFiles([]),
  }));

  return (
    <div>
      <div>
        <Label className="mb-3" htmlFor="file">
          Thêm ảnh hoặc file :
        </Label>
      </div>
      <input type="file" name="file" multiple onChange={handleFileChange} ref={fileInputRef} className="hidden" />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="block w-max py-2 px-4 bg-violet-50 text-violet-700 text-sm font-semibold rounded-full hover:bg-violet-100 mb-4"
        >
          Chọn tệp
        </button>

        <div className="mb-4 text-sm text-gray-700">
          {files.length || (initData ? initData?.length : -1) > 0
            ? ` Tệp đã chọn: ${files.length + (initData ? initData.length : 0)}`
            : 'Chưa có tệp nào được chọn'}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative flex items-start justify-center gap-2 p-4 border rounded-lg shadow-md w-max"
          >
            {file.type === 'image' ? (
              <img
                src={file.preview}
                alt="preview"
                className="h-32 w-32 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="h-32 w-32 flex items-center justify-center border rounded-lg shadow-sm bg-gray-100">
                <span className="text-center">PDF</span>
              </div>
            )}

            <textarea
              placeholder="Mô tả ảnh..."
              value={file.description}
              onChange={e => handleDescriptionChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 h-full"
            />
            <button
              onClick={() => handleRemoveFile(index)}
              className="absolute top-0 right-0 text-white bg-black size-[20px] flex justify-center items-center rounded-full shadow p-1 hover:bg-red-100"
            >
              &times;
            </button>
          </div>
        ))}
        {initData?.map((file, index) => (
          <div
            key={`init-${index}`}
            className="relative flex items-start justify-center gap-2 p-4 border rounded-lg shadow-md w-max"
          >
            <img
              src={file.url || file.file}
              alt="preview"
              className="h-32 w-32 object-cover rounded-lg border border-gray-200 shadow-sm"
            />
            <textarea
              placeholder="Mô tả ảnh..."
              value={file.description || ''}
              onChange={e => handleChangeDescriptionOld?.(file.id, e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 h-full"
            />
            <button
              onClick={() => handleRemoveFilesOld?.(file?.id)}
              type="button"
              className="absolute top-0 right-0 text-white bg-black size-[20px] flex justify-center items-center rounded-full shadow p-1 hover:bg-red-100"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default UploadFiles;
