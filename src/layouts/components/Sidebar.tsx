import {
  GroupIcon,
  SpaceDashboardIcon,
  ApartmentIcon,
  AssignmentIcon,
  Tablet,
  MedicalRecord,
  SpecialtiesIcon,
  CalendarMonthIcon,
  Patient,
  MedicalServicesIcon,
  AdminPanelSettingsIcon,
  ChevronRightIcon,
  ArrowDownIcon,
  HandymanIcon,
  ReduceCapacityIcon,
  Diversity2Icon,
} from '@/components/icons';
import { cn } from '@/helpers/utils';
import useToggle from '@/hooks/useToggle';
import { IUser } from '@/types/user.type';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TChildren = {
  id: number;
  childName: string;
  path: string;
  icon: any;
};
interface ICategoryManagement {
  id: number;
  categoryName: string;
  path?: string;
  icon: any;
  pathActive: string[];
  isChildren?: boolean;
  children?: TChildren[];
  define?: string;
}

const dumpCategory = [
  {
    id: 1,
    categoryName: 'Dashboard',
    path: '/dashboard',
    icon: SpaceDashboardIcon,
    pathActive: ['/dashboard'],
    define: 'DASHBOARD MANAGEMENT',
  },
  {
    id: 2,
    categoryName: 'Lịch hẹn',
    path: '/appointments',
    icon: CalendarMonthIcon,
    pathActive: ['/appointment'],
    define: 'APPOINTMENT MANAGEMENT',
  },
  {
    id: 3,
    categoryName: 'Bệnh nhân',
    path: '/patient',
    icon: Patient,
    pathActive: ['/patient'],
    define: 'PATIENT MANAGEMENT',
  },
  {
    id: 4,
    categoryName: 'Bệnh án',
    path: '/medical-record',
    icon: MedicalRecord,
    pathActive: ['/medical-record'],
    define: 'MEDICAL MANAGEMENT',
  },
  {
    id: 5,
    categoryName: 'Đơn thuốc',
    path: '/prescriptions',
    icon: Tablet,
    pathActive: ['/prescriptions'],
    define: 'PRESCRIPTION MANAGEMENT',
  },
  {
    id: 6,
    categoryName: 'Phòng Ban',
    path: '/departments',
    icon: ApartmentIcon,
    pathActive: ['/departments'],
    define: 'DEPARTMENT MANAGEMENT',
  },
  {
    id: 7,
    categoryName: 'User',
    path: '/users',
    icon: GroupIcon,
    pathActive: ['/users'],
    define: 'USER MANAGEMENT',
  },
  {
    id: 8,
    categoryName: 'Dịch vụ',
    path: '/services',
    icon: MedicalServicesIcon,
    pathActive: ['/services'],
    define: 'SERVICE MANAGEMENT',
  },
  {
    id: 9,
    categoryName: 'Gói khám',
    path: '/packages',
    icon: AssignmentIcon,
    pathActive: ['/packages'],
    define: 'PACKAGE MANAGEMENT',
  },
  {
    id: 10,
    categoryName: 'Chuyên khoa',
    path: '/specialties',
    icon: SpecialtiesIcon,
    pathActive: ['/specialties'],
    define: 'SPECIALTY MANAGEMENT',
  },
  {
    id: 11,
    categoryName: 'Phân quyền',
    path: '',
    icon: AdminPanelSettingsIcon,
    pathActive: [''],
    isChildren: true,
    define: 'ROLE MANAGEMENT',
    children: [
      {
        id: 1,
        childName: 'Action',
        path: '/action',
        icon: HandymanIcon,
      },
      {
        id: 2,
        childName: 'Permissions',
        path: '/permission',
        icon: Diversity2Icon,
      },
      {
        id: 3,
        childName: 'Roles',
        path: '/roles',
        icon: ReduceCapacityIcon,
      },
    ],
  },
];

const Sidebar = ({ show, auth }: { show: boolean; auth: IUser | null }) => {
  const [categoryManagement] = useState<ICategoryManagement[]>(dumpCategory);
  const [tabActive, setTabActive] = useState<number>(1);
  const { show: isDropdown, handleToggle } = useToggle();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCategory = (id: number, path?: string, isChildren?: boolean) => {
    if (!isChildren) {
      setTabActive(id);
    }
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
            let isActive = tabActive === category.id || handleActiveTab(category.pathActive, pathname);

            if (auth?.some((role: any) => role.name === category.define)) {
              return (
                <div key={category.id}>
                  <li
                    className={cn(
                      'px-5 py-2 flex items-center cursor-pointer border-l-[3px] border-transparent transition-all ease-linear group',
                      isActive ? 'border-l-primaryAdmin bg-primaryAdmin/5' : ' hover:bg-primaryAdmin/5',
                    )}
                    onClick={() => {
                      handleCategory(category.id, category.path, category.isChildren);
                      category.isChildren && handleToggle();
                    }}
                  >
                    <div className="flex gap-5 flex-1 items-center">
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
                    {category.isChildren && !isDropdown ? (
                      <ChevronRightIcon fontSize="small" />
                    ) : (
                      category.isChildren && isDropdown && <ArrowDownIcon fontSize="small" />
                    )}
                  </li>
                  {category.isChildren &&
                    isDropdown &&
                    category.children?.map(item => {
                      // isActive = tabActive === item.id || handleActiveTab(item.pathActive, pathname);
                      return (
                        <>
                          <li
                            className={cn(
                              'px-5 py-2 flex items-center cursor-pointer border-l-[3px] border-transparent transition-all ease-linear group',
                              isActive ? 'border-l-primaryAdmin bg-primaryAdmin/5' : ' hover:bg-primaryAdmin/5',
                            )}
                            onClick={() => {
                              handleCategory(item.id, item.path);
                            }}
                            key={item.id}
                          >
                            <div className="flex gap-5 flex-1 items-center">
                              <span
                                className={cn(
                                  'p-2 rounded-md transition-all ease-linear group-hover:bg-white',
                                  isActive ? '!bg-white' : 'bg-primaryAdmin/5',
                                )}
                              >
                                <item.icon
                                  className={cn(
                                    'transition-all ease-linear text-gray-500 group-hover:text-primaryAdmin',
                                    isActive && '!text-primaryAdmin',
                                  )}
                                />
                              </span>
                              <span>{item.childName}</span>
                            </div>
                          </li>
                        </>
                      );
                    })}
                </div>
              );
            }
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
