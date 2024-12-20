function convertStatusAppointments(status: string): string {
  const statusMap: { [key: string]: string } = {
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    completed: 'Đã hoàn thành',
    cancled: 'Đã hủy',
  };

  return statusMap[status] || 'Trạng thái không xác định';
}

export default convertStatusAppointments;
