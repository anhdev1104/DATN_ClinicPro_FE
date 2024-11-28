import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import { AxiosBaseQueryError } from '@/helpers/axiosBaseQuery';
import NotFoundPage from '@/pages/client/404/NotFoundPage';
import { useGetUserQuery } from '@/redux/api/users';
import { Avatar, Text } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function GetUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: user, error } = useGetUserQuery(userId as string);
  return (
    <>
      {user ? (
        <div className="bg-white rounded-3xl w-full shadow-xl p-4 overflow-hidden">
          <section className="w-full">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="sm:w-[80%] xs:w-[90%] mx-auto flex m-4 space-x-4">
                  <Avatar
                    className="outline outline-2 outline-offset-2 outline-blue-500"
                    radius="sm"
                    size="xl"
                    src={user?.user_info?.avatar}
                    alt="User Profile"
                  />
                  <Text lineClamp={1} size="xl" className="font-mono text-2xl">
                    {user?.user_info?.fullname}
                  </Text>
                </div>
                <BaseButton onClick={() => navigate('edit')} leftSection={<BaseIcon icon={IconPencil} />} size="xs">
                  Cập Nhật
                </BaseButton>
              </div>

              <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                  <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                    <div className="w-full">
                      <dl className="text-gray-900 divide-y divide-gray-200  ">
                        <div className="flex flex-col pb-3">
                          <dt className="mb-1 text-gray-500 md:text-lg ">Email</dt>
                          <dd className="text-lg font-semibold">{user?.email || 'Không'}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                          <dt className="mb-1 text-gray-500 md:text-lg ">Role</dt>
                          <dd className="text-lg font-semibold">{user?.role?.name || 'Không'}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                          <dt className="mb-1 text-gray-500 md:text-lg ">Date Of Birth</dt>
                          <dd className="text-lg font-semibold">{user?.user_info?.dob || 'Không'}</dd>
                        </div>
                        <div className="flex flex-col py-3">
                          <dt className="mb-1 text-gray-500 md:text-lg ">Giới Tính</dt>
                          <dd className="text-lg font-semibold">{user?.user_info?.gender || 'Không'}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="w-full">
                      <dl className="text-gray-900 divide-y divide-gray-200 ">
                        <div className="flex flex-col pb-3">
                          <dt className="mb-1 text-gray-500 md:text-lg ">Status</dt>
                          <dd className="text-lg font-semibold">{user?.status}</dd>
                        </div>

                        <div className="flex flex-col pt-3">
                          <dt className="mb-1 text-gray-500 md:text-lg ">Phone Number</dt>
                          <dd className="text-lg font-semibold">{user?.user_info?.phone_number || 'Không'}</dd>
                        </div>
                        <div className="flex flex-col pt-3">
                          <dt className="mb-1 text-gray-500 md:text-lg ">Địa Chỉ</dt>
                          <dd className="text-lg font-semibold">{user?.user_info?.address || 'Không'}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  <div className="">
                    <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 lg:text-4xl md:text-3xl xs:text-xl">
                      Địa Chỉ
                    </h1>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1963372.3515381976!2d107.34873579375!3d16.02852047505477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1732163636285!5m2!1sen!2sus"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <NotFoundPage title={(error as AxiosBaseQueryError)?.data?.message} />
      )}
    </>
  );
}
