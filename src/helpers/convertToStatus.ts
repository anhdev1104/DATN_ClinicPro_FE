function convertToStatus(gender: string): string {
  const genderMap: { [key: string]: string } = {
    inactive: 'Không hoạt đông',
    active: 'Hoạt động',
    transferred: 'Chuyển viện',
  };

  return genderMap[gender];
}

export default convertToStatus;
