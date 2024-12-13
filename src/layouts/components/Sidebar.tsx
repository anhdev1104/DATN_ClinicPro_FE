import {
  GroupIcon,
  LocalHospitalIcon,
  SpaceDashboardIcon,
  ApartmentIcon,
  AssignmentIcon,
  Tablet,
  MedicalRecord,
  SpecialtiesIcon,
  CalendarMonthIcon,
  Patient,
  MedicalServicesIcon,
} from '@/components/icons';
import { cn } from '@/helpers/utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ICategoryManagement {
  id: number;
  categoryName: string;
  path?: string;
  icon: any;
  children?: { id: number; title: string }[];
  pathActive: string[];
}

const dumpCategory = [
  {
    id: 1,
    categoryName: 'Dashboard',
    path: '/dashboard',
    icon: SpaceDashboardIcon,
    pathActive: ['/dashboard'],
  },
  {
    id: 2,
    categoryName: 'Lịch hẹn',
    path: '/appointments',
    icon: CalendarMonthIcon,
    pathActive: ['/appointment'],
  },
  {
    id: 3,
    categoryName: 'Bệnh nhân',
    path: '/patient',
    icon: Patient,
    pathActive: ['/patient'],
  },
  {
    id: 4,
    categoryName: 'Bác sĩ',
    path: '',
    icon: LocalHospitalIcon,
    pathActive: [''],
  },
  {
    id: 5,
    categoryName: 'Bệnh án',
    path: '/medical-record',
    icon: MedicalRecord,
    pathActive: ['/medical-record'],
  },
  {
    id: 6,
    categoryName: 'Đơn thuốc',
    path: '/prescriptions',
    icon: Tablet,
    pathActive: ['/prescriptions'],
  },
  {
    id: 8,
    categoryName: 'Phòng Ban',
    path: '/departments',
    icon: ApartmentIcon,
    pathActive: ['/departments'],
  },
  {
    id: 9,
    categoryName: 'User',
    path: '/users',
    icon: GroupIcon,
    pathActive: ['/users'],
  },
  {
    id: 10,
    categoryName: 'Dịch vụ',
    path: '/services',
    icon: MedicalServicesIcon,
    pathActive: ['/services'],
  },
  {
    id: 7,
    categoryName: 'Gói khám',
    path: '/packages',
    icon: AssignmentIcon,
    pathActive: ['/packages'],
  },
  {
    id: 11,
    categoryName: 'Chuyên khoa',
    path: '/specialties',
    icon: SpecialtiesIcon,
    pathActive: ['/specialties'],
  },
];

const Sidebar = ({ show }: { show: boolean }) => {
  const [categoryManagement] = useState<ICategoryManagement[]>(dumpCategory);
  const [tabActive, setTabActive] = useState<number>(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCategory = (id: number, path?: string) => {
    setTabActive(id);
    if (path) {
      navigate(path);
    }
  };

  const handleActiveTab = (pathActive: string[], path: string | undefined) => {
    return path && pathActive.some(item => item.includes(path));
  };

  useEffect(() => {
    const activeCategory = dumpCategory.find(({ pathActive }) => handleActiveTab(pathActive, pathname));

    if (activeCategory) setTabActive(activeCategory.id);
  }, [pathname]);

  return (
    <aside
      className={cn(
        'bg-white fixed left-0 bottom-0 top-24 rounded-se-[26px] hidden md:block transition-all duration-300 ease-linear pr-[0.5px] overflow-hidden',
        show ? '-translate-x-[250px]' : 'w-[250px]',
      )}
      style={{ boxShadow: '5px 20px 14px rgba(46, 55, 164, 0.05)' }}
    >
      <div className="h-full overflow-auto scroll-select scroll-sidebar pb-5">
        <div className="text-base font-medium text-black px-5 py-[14px]">Main</div>
        <ul className="p-0">
          {categoryManagement.map(category => {
            const isActive = tabActive === category.id || handleActiveTab(category.pathActive, pathname);

            return (
              <li
                className={cn(
                  'px-5 py-2 flex items-center cursor-pointer border-l-[3px] border-transparent transition-all ease-linear group',
                  isActive ? 'border-l-primaryAdmin bg-primaryAdmin/5' : ' hover:bg-primaryAdmin/5',
                )}
                key={category.id}
                onClick={() => handleCategory(category.id, category.path)}
              >
                <div className="flex gap-3 flex-1 items-center">
                  <span
                    className={cn(
                      'p-2 rounded-md transition-all ease-linear group-hover:bg-white',
                      isActive ? '!bg-white' : 'bg-primaryAdmin/5',
                    )}
                  >
                    <category.icon
                      className={cn(
                        'transition-all ease-linear text-gray-500 group-hover:text-primaryAdmin',
                        isActive && '!text-primaryAdmin',
                      )}
                    />
                  </span>
                  <span>{category.categoryName}</span>
                </div>
                {/* <ChevronRightIcon fontSize="small" /> */}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
