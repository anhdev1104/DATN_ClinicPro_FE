import { useForm } from 'react-hook-form';

const AddPackage = () => {
  const {
    control,
    formState: { isDirty }
  } = useForm({
    mode: 'onChange'
  });

  return (
    <section className="addpackage">
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
        <form className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Tên gói khám <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
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
                accept=""
                className="border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Tạo gói khám
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-200"
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
