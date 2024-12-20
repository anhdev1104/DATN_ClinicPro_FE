function convertToStatus(gender: string): string {
  const genderMap: { [key: string]: string } = {
    inactive: 'Không hoạt đông',
    disabled: 'Vô hiệu hóa',
    active: 'Hoạt động',
    transferred: 'Chuyển viện',
  };

  return genderMap[gender];
}

export default convertToStatus;
