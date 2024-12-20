function convertStatusAppointments(gender: string): string {
  const genderMap: { [key: string]: string } = {
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã hủy',
  };

  return genderMap[gender];
}

export default convertStatusAppointments;
