export interface IPrescription {
  patient_id: number; // bệnh nhân chỉ định
  categoryId: number;
  user_id: number; //người tạo đơn
  name: string; // tên đơn thuốc
  duration: number; // số ngày sử dụng
  advice: string | undefined; // lời dặn của bác sĩ
  medicines: Array<number>; // mảng chứa thuốc đã chọn
}
