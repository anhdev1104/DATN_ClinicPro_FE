import {
  ChevronRightIcon,
  GroupIcon,
  LocalHospitalIcon,
  SpaceDashboardIcon,
  ApartmentIcon,
  AssignmentIcon,
  Tablet
} from '@/components/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface ICategoryManagement {
  id: number;
  categoryName: string;
  path?: string;
  icon: any;
  children?: { id: number; title: string }[];
}

const dumpCategory = [
  {
    id: 1,
    categoryName: 'Dashboard',
    path: '/dashboard',
    icon: SpaceDashboardIcon
  },
  {
    id: 2,
    categoryName: 'Bác sĩ',
    path: '',
    icon: LocalHospitalIcon
  },
  {
    id: 3,
    categoryName: 'Bệnh nhân',
    path: '',
    icon: GroupIcon
  },
  {
    id: 4,
    categoryName: 'Đơn thuốc',
    path: '/prescriptions',
    icon: Tablet
  },
  {
    id: 5,
    categoryName: 'Phòng Ban',
    path: '/departments',
    icon: ApartmentIcon
  },
  {
    id: 6,
    categoryName: 'Gói khám',
    path: '/package',
    icon: AssignmentIcon
  }
];

const Sidebar = ({ show }: { show: boolean }) => {
  const [categoryManagement, setCategoryManagement] = useState<ICategoryManagement[]>(dumpCategory);
  const [tabActive, setTabActive] = useState<number>(1);
  const navigate = useNavigate();

  const handleCategory = (id: any, path?: string) => {
    setTabActive(id);
    if (path) {
      navigate(path);
    }
  };

  return (
    <aside
      className={`bg-white h-screen fixed left-0 bottom-0 top-24 rounded-r-[26px] hidden md:block ${show ? '-translate-x-[250px] transition-all duration-300 ease-linear' : 'w-[250px] transition-all duration-300 ease-linear'}`}
      style={{ boxShadow: '5px 20px 14px rgba(46, 55, 164, 0.05)' }}
    >
      <div>
        <div className="text-base font-medium text-black px-5 py-[14px]">Main</div>
        <div>
          <ul className="p-0">
            {categoryManagement.length > 0 &&
              categoryManagement.map(category => (
                <li
                  className={`px-5 py-2 flex  items-center cursor-pointer border-l-[3px] border-transparent hover:!border-l-primaryAdmin transition-all ease-linear hover:bg-primaryAdmin/5 group ${tabActive === category.id && 'border-l-primaryAdmin bg-primaryAdmin/5'}`}
                  key={category.id}
                  onClick={() => handleCategory(category.id, category.path)}
                >
                  <div className="flex gap-3 flex-1 items-center">
                    <span
                      className={`p-2 bg-primaryAdmin/5 rounded-md group-hover:bg-white transition-all ease-linear ${tabActive === category.id && '!bg-white'}`}
                    >
                      <category.icon
                        className={`group-hover:text-primaryAdmin transition-all ease-linear text-gray-500 ${tabActive === category.id && '!text-primaryAdmin'}`}
                      />
                    </span>
                    <span>{category.categoryName}</span>
                  </div>
                  <ChevronRightIcon fontSize="small" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
