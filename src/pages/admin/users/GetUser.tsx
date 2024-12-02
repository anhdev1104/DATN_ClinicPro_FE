import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import { useGetUserQuery } from '@/redux/api/users';
import { Avatar, Divider, Grid, Text } from '@mantine/core';
import {
  IconCalendarBolt,
  IconGenderAgender,
  IconMail,
  IconMapPin,
  IconPencil,
  IconPhoneRinging,
  IconProgressAlert,
  IconShield,
  IconUser,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function GetUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: user, error } = useGetUserQuery(userId!);
  if (!user) return <NotFoundPage title={(error as AxiosBaseQueryError)?.data?.message} />;
  return (
    <>
      <div className="bg-white rounded-3xl w-full shadow-xl p-4 overflow-hidden">
        <section className="w-full">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex space-x-8 items-center pt-8 pl-8">
                <Avatar size="xl" src={user?.user_info?.avatar} alt="User Profile" />
                <Text lineClamp={1} size="xl" className="text-2xl">
                  {user?.user_info?.fullname}
                </Text>
              </div>
              <BaseButton onClick={() => navigate('edit')} leftSection={<BaseIcon icon={IconPencil} />} size="xs">
                Cập Nhật
              </BaseButton>
            </div>
            <Grid gutter={20} grow className="pt-8 pl-8">
              <UserInfo icon={IconUser} name="Họ và tên" value={user?.user_info?.fullname} />
              <UserInfo icon={IconMail} name="Email" value={user?.email} />
              <UserInfo icon={IconPhoneRinging} name="Số điện thoại" value={user?.user_info?.phone_number} />
              <UserInfo icon={IconShield} name="Role" value={user?.role.name} />
              <UserInfo icon={IconCalendarBolt} name="Ngày sinh" value={user?.user_info?.dob} />
              <UserInfo icon={IconGenderAgender} name="giới tính" value={user?.user_info?.gender} />
              <UserInfo icon={IconProgressAlert} name="Status" value={user?.status} />
              <UserInfo icon={IconMapPin} name="Địa chỉ" value={user?.user_info?.address} />
            </Grid>
          </div>
        </section>
      </div>
    </>
  );
}

const UserInfo = ({ icon, name, value }: { icon: any; name: any; value: any }) => {
  return (
    <Grid.Col span={4}>
      <div className="flex space-x-2 items-center">
        <BaseIcon size="md" icon={icon} />
        <Text c="black" className="capitalize">
          {name}
        </Text>
      </div>
      <Text size="sm" c="dimmed" className="font-normal ml-1">
        {value}
      </Text>
      <Divider />
    </Grid.Col>
  );
};
