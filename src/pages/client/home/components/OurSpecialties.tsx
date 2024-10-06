import { Button } from '@/components/button';

const dataSpecialties = [
  {
    id: 1,
    img: '/images/chuyenkhoa-1.webp',
    title: 'Tim mạch',
    content:
      'Tại các bệnh viện trên khắp hệ thống Hoàn Mỹ, Khoa Tim mạch được đầu tư mạnh và đây là một trong những chuyên khoa chủ lực của chúng tôi. Các bác sĩ và đội ngũ nhân viên khám chữa bệnh được đào tạo chuyên sâu, với bằng cấp tại các cơ sở đào tạo y khoa danh tiếng Việt Nam. Ngoài ra, trang thiết bị hiện đại, tiên tiến cũng giúp nâng cao hiệu quả chẩn đoán và điều trị. Một loạt các ca phẫu thuật tim mạch phức tạp mà trước đây chỉ có thể tiến hành ở nước ngoài thì nay đã được thực hiện ngay ở Việt Nam: tại các bệnh viện Hoàn Mỹ.',
  },
  {
    id: 2,
    img: '/images/chuyenkhoa-2.webp',
    title: 'Nội tổng quát',
    content:
      'Khoa Nội tổng quát đang không ngừng phát triển lớn mạnh tại Hoàn Mỹ. Nhiều bác sĩ chuyên khoa trong lĩnh vực này đang công tác tại một số bệnh viện Hoàn Mỹ. Thông qua hoạt động đào tạo và nghiên cứu quốc tế, các bệnh viện của chúng tôi áp dụng những phương pháp hiện đại nhất để nâng cao hiệu quả của việc điều trị y tế trong chuyên khoa đa dạng này.',
  },
  {
    id: 3,
    img: '/images/chuyenkhoa-3.webp',
    title: 'Sản phụ',
    content:
      'Tại Hoàn Mỹ, chúng tôi hiểu rằng mỗi phụ nữ lại có những mối quan tâm riêng về chăm sóc sức khỏe theo từng giai đoạn trong cuộc đời. Với nỗ lực trở thành một phần trong hành trình trọn đời này, mạng lưới bệnh viện của chúng tôi đã phát triển một hệ thống tích hợp gồm các dịch vụ sản phụ khoa nhằm mang lại trải nghiệm chăm sóc sức khỏe cá nhân toàn diện, đáng tin cậy. Chúng tôi cung cấp dịch vụ chăm sóc sản phụ khoa hàng đầu, từ phòng ngừa đến sàng lọc, chẩn đoán và điều trị. Mỗi năm, Hoàn Mỹ là môi trường tin cậy cho hơn 6.000 ca sinh nở. Ứng dụng công nghệ tiên phong trong thụ tinh nhân tạo, hay còn gọi là bơm tinh trùng vào buồng tử cung (IUI), đã mang lại niềm vui cho hàng trăm cặp vợ chồng hiếm muộn. Tập đoàn Y khoa Hoàn Mỹ tự hào có Bệnh viện Quốc tế Hạnh Phúc, nơi sở hữu Trung tâm hỗ trợ Sinh sản đầu tiên tại Việt Nam đạt chứng nhận RTAC.',
  },
  {
    id: 4,
    img: '/images/chuyenkhoa-4.webp',
    title: 'Chấn thương chỉnh hình',
    content:
      'Khoa Chỉnh hình của chúng tôi có nhiệm vụ khám chữa các rối loạn về xương, khớp và hệ thống cơ xương ở cả trẻ em và người lớn. Chúng tôi tin rằng "Sống là phải vận động". Khoa Chỉnh hình của chúng tôi được trang bị đầy đủ, hiện đại với đội ngũ chuyên gia luôn sẵn sàng giúp bạn duy trì cuộc sống khỏe mạnh, năng động. Các bệnh viện của chúng tôi có trang thiết bị đầu ngành (bao gồm máy quét MRI, máy quét MSCT 64 lát cắt, máy chụp C-Arm, máy nội soi khớp và thiết bị trị liệu thần kinh cột sống) cùng với các dịch vụ chăm sóc chuyên sâu tại Khoa Vật lý trị liệu và Phục hồi chức năng. Hoàn Mỹ cộng tác với các bác sĩ chuyên khoa hàng đầu về Chỉnh hình để không ngừng mang lại cho người dân Việt Nam dịch vụ chăm sóc sức khỏe bền vững, lấy bệnh nhân làm trung tâm với chi phí hợp lý.',
  },
  {
    id: 5,
    img: '/images/chuyenkhoa-5.webp',
    title: 'Nhi khoa',
    content: 'Nhi khoa cung cấp các dịch vụ như khám, chẩn đoán, tư vấn và điều trị nội trú, ngoại trú cho trẻ em.',
  },
];

const OurSpecialties = () => {
  return (
    <>
      {dataSpecialties.length > 0 &&
        dataSpecialties.map(item => (
          <div
            className="px-[15px] flex flex-col justify-between mb-[30px] relative group overflow-hidden"
            key={item.id}
          >
            <img src={item.img} className="w-full h-full object-cover" />
            <div className="absolute transition-all duration-300 ease-linear group-hover:bg-primary/50 group-hover:top-0 left-0 right-0 bottom-0 mx-[15px] top-3/4 px-[25px] py-[15px] text-white">
              <h1 className="text-[20px] font-semibold mb-5">{item.title}</h1>
              <p className="font-light text-[12px] line-clamp-4">{item.content}</p>
              <Button
                type="button"
                className="!py-1 text-sm bg-transparent border border-white hover:bg-white hover:text-primary mt-5"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        ))}
    </>
  );
};

export default OurSpecialties;
