import { UserInfo } from '@/components/user-info/UserInfo';

export interface Options {
  value: string;
  label: string;
  avatar?: string;
  email?: string;
}

export const renderOption = ({ option }: { option: Options; checked?: boolean }) => {
  return <UserInfo avatar={option.avatar} email={option.email} fullname={option.label} />;
};
