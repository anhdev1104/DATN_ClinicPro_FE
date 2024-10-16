import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { MoreVertIcon } from '@/components/icons';

const DataPackage = [
  {
    id: 1,
    namePackpage: 'Tim mạch',
    description: 'Điều tra và xử lý các vấn đề...',
    content: 'Hầu hết bệnh nhân gặp các vấn đề về tim mạch ở giai đoạn đầu đều thường bỏ qua các triệu chứng của bệnh.',
    img: 'https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/448305906_2750439318630832_7599719339820784833_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DCiPSnU979IQ7kNvgEjo1YQ&_nc_ht=scontent.fdad2-1.fna&_nc_gid=AGvKKRPuZ6-ixT99Nak2zSr&oh=00_AYCYlGe4vJjXSfLER5fzHjte_HehjIbgomOnpwcMXfKrVg&oe=670D67BE'
  },
  {
    id: 2,
    namePackpage: 'Tim mạch',
    description: 'Điều tra và xử lý các vấn đề...',
    content: 'Hầu hết bệnh nhân gặp các vấn đề về tim mạch ở giai đoạn đầu đều thường bỏ qua các triệu chứng của bệnh.',
    img: 'https://scontent.fdad2-1.fna.fbcdn.net/v/t39.30808-1/448305906_2750439318630832_7599719339820784833_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DCiPSnU979IQ7kNvgEjo1YQ&_nc_ht=scontent.fdad2-1.fna&_nc_gid=AGvKKRPuZ6-ixT99Nak2zSr&oh=00_AYCYlGe4vJjXSfLER5fzHjte_HehjIbgomOnpwcMXfKrVg&oe=670D67BE'
  }
];

const PackagePage = () => {
  return (
    <section className="package">
      <div className="text-primaryAdmin flex items-center text-base mb-10">
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
        <span className="text-primaryAdmin/60">Danh sách gói khám</span>
      </div>
      <div className="bg-white rounded-2xl">
        <div className="  doctor-table-blk mb-2 pt-5 px-4 flex items-center flex-wrap gap-7">
          <h3 className="text-lg font-semibold mb-0">Danh sách gói khám</h3>
          <div className="flex items-center flex-wrap gap-7 ">
            <div className="top-nav-search table-search-blk">
              <SearchAdmin />
            </div>
            <div className="transition-all w-12 h-12 rounded-[9px] border border-borderColor font-medium bg-[#f3f4f7] outline-none flex items-center justify-center">
              <Link to="/add-package" className="w-full h-full flex items-center justify-center">
                <img
                  src="https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/plus.svg"
                  alt="Add Department"
                  className="text-cyan-300"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="list-package p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Gói khám</th>
                <th className="p-4 font-medium">Mô tả</th>
                <th className="p-4 font-medium">Nội dung</th>
                <th className="p-4 font-medium">Hình ảnh</th>
              </tr>
            </thead>
            <tbody>
              {DataPackage.map(item => (
                <tr className="odd" key={item.id}>
                  <td className="p-4 sorting_1">
                    <span>{item.id}</span>
                  </td>
                  <td className="p-4 text-gray-800">{item.namePackpage}</td>
                  <td className="p-4 text-gray-600">{item.description}</td>
                  <td className="p-4 text-gray-600 max-h-24 overflow-y-auto whitespace-normal w-1/3">{item.content}</td>
                  <td className="p-4 profile-image">
                    <Link to="profile.html" className="flex items-center">
                      <img
                        width={28}
                        height={28}
                        src={item.img}
                        className="rounded-full mr-2"
                        alt="Tiến sĩ Andrea Lalema"
                      />
                      <span className="text-gray-800">Tiến sĩ Andrea Lalema</span>
                    </Link>
                  </td>
                  <td className="p-4 text-end">
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-center w-1/2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500"
                        >
                          <MoreVertIcon />
                        </button>
                      </div>

                      {
                        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white overflow-hidden">
                          <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sửa</div>
                          <div className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Xóa bỏ
                          </div>
                        </div>
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

function SearchAdmin() {
  const { control } = useForm({
    mode: 'onChange'
  });
  return (
    <form className="w-[300px]">
      <Input
        name="searchadmin"
        className="text-current pl-10 border-none"
        isGlass
        colorGlass="text-primaryAdmin"
        placeholder="Tìm kiếm thông tin ..."
        control={control}
      />
    </form>
  );
}

export default PackagePage;
