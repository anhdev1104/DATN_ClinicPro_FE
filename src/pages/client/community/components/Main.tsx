const MainPage = () => {
  return (
    <section className="hearts">
      <div className=" container-page section__hearts py-28">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="lg:w-1/3 pr-0 lg:pr-5 mb-8 lg:mb-0">
              <div className="hearts__header">
                <div className="hearts__img mb-6">
                  <img
                    className="w-full h-auto lazyload"
                    src="https://img.freepik.com/free-vector/hand-drawn-world-environment-day-save-planet-illustration_23-2148939036.jpg?semt=ais_hybrid"
                    alt="Hearts"
                    data-src="https://hoanmy.com/wp-content/uploads/2023/05/image-community-1.png"
                  />
                </div>
                <h2 className="text-[33px] font-semibold leading-[54px] text-primary text-center mb-0">
                  Những Đóa Hoa Kiên Cường
                </h2>
              </div>
            </div>
            <div className="lg:w-2/3 pl-0 lg:pl-5">
              <div className="hearts__content">
                <span className="text-[14px] leading-[28px] block mb-6 whitespace-pre-line">
                  Thời điểm dịch Covid-19 bùng phát mạnh mẽ, đội ngũ điều dưỡng đã hy sinh thầm lặng, trao yêu thương và
                  đồng hành cùng người bệnh vượt qua nỗi đau bệnh tật. Tuy nhiên công việc này vẫn đang đối diện với
                  nhiều định kiến của xã hội. Là đơn vị y tế tư nhân lớn nhất cả nước, Hoàn Mỹ thực hiện dự án “Những
                  đóa hoa kiên cường” vào năm 2021, tiên phong trong việc dành sự tôn trọng xứng đáng đến những người
                  điều dưỡng, những người hùng thầm lặng đứng sau sự “tận tâm chăm sóc”.
                </span>
                <span className="text-[14px] leading-[28px] block mb-6 whitespace-pre-line">
                  Trong hệ thống, Hoàn Mỹ khuyến khích một môi trường lành mạnh để điều dưỡng có thể chia sẻ suy nghĩ
                  của mình, mang đến điểm tựa tinh thần mạnh mẽ trong những giai đoạn khó khăn. Với công chúng, chúng
                  tôi thực hiện một chuỗi các hoạt động để ghi nhận những đóng góp cao cả của ngành điều dưỡng, để thấy
                  được những cố gắng phi thường của mỗi điều dưỡng để tạo ra những khoảnh khắc kỳ diệu.
                </span>
                <span className="text-[14px] leading-[28px] block mb-6 whitespace-pre-line">
                  Vào năm 2021, Tập đoàn Y khoa Hoàn Mỹ cho ra mắt 5 tập phim truyện tài liệu để tái hiện lại những câu
                  chuyện cảm động và đầy tính nhân văn. 5 tập phim với tên gọi “Nghề và Nghiệp”, “Âm thanh”, “Thời
                  gian”, “Tinh thần thép” và “Nghệ sỹ Tâm hồn” đã khắc họa rõ nét những trăn trở của công việc không hề
                  đơn giản này. Bộ phim ngắn đã thu hút hơn 1.2 triệu lượt xem trên Facebook và Youtube của tập đoàn.
                </span>
                <span className="text-[14px] leading-[28px] block mb-6 whitespace-pre-line">
                  Tiếp nối thành công của chuỗi phim truyện, Hoàn Mỹ tiếp tục phát hành cuốn sách ảnh cùng tên “Những
                  đóa hoa kiên cường – Chuyện nghề Điều dưỡng” như một lời tri ân chân thành đến những anh hùng nơi đầu
                  chiến tuyến. Tổng cộng đã có 1.000 cuốn sách được gửi đến sinh viên của các trường đại học nhằm tiếp
                  thêm ngọn lửa nghề cho thế hệ điều dưỡng tiếp theo.
                </span>
                <span className="text-[14px] leading-[28px] block mb-6 whitespace-pre-line">
                  Dự án “Những đóa hoa kiên cường” nhận được sự đón nhận nồng nhiệt của công chúng, giành được nhiều
                  giải thưởng hàng đầu của ngành chăm sóc sức khỏe tại châu Á.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainPage;
