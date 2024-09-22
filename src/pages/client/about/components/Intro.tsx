const Intro = () => {
  return (
    <>
      <section className="relative">
        <img
          className="h-[calc(100vh-107px)] w-full object-cover object-top"
          src="/images/aboutUs/banner-network.webp"
          alt=""
        />
        <div className="container-page absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <h1 className="text-primaryText font-semibold text-2xl md:text-6xl text-wrap">Về Chúng Tôi</h1>
        </div>
      </section>
      <section className="container-page pt-40 pb-48">
        <div className="flex">
          <div className="flex-[0_0_50%] px-[15px]">
            <div className="w-[251px] pb-[20px]">
              <img src="/images/aboutUs/VN-Flag.svg" className="max-w-[50%] object-cover" alt="" />
            </div>
            <div className="">
              <h2 className="text-[32px] max-w-[450px] leading-[52px] font-semibold text-primaryText">
                Chào mừng bạn đến với Hoàn Mỹ.
                <br />
                Chúng tôi là mạng lưới chăm sóc sức khỏe tư nhân hàng đầu tại Việt Nam.
              </h2>
            </div>
          </div>
          <div className="flex-[0_0_50%] px-[15px]">
            <div className="pt-[30px]">
              <span className="text-[13px] font-light  leading-7 text-dark block whitespace-pre-line">
                Hoàn Mỹ cam kết hướng tới sự xuất sắc trong hoạt động thăm khám lâm sàng, đào tạo và nghiên cứu nhằm
                cung cấp dịch vụ chăm sóc tốt nhất. Mạng lưới chăm sóc sức khỏe của chúng tôi bao gồm hơn 2.900 giường
                bệnh hoạt động trên khắp 13 bệnh viện và 4 phòng khám. Trải qua 27 năm hoạt động, Hoàn Mỹ đã tạo dựng
                được uy tín vững chắc trong việc cung cấp dịch vụ chăm sóc sức khỏe lấy bệnh nhân làm trung tâm, với chi
                phí hợp lý và chất lượng cao. Chúng tôi tự hào trong việc nỗ lực cải thiện chất lượng dịch vụ chăm sóc
                sức khỏe ở Việt Nam, góp phần vào sự phồn vinh và an sinh của đất nước. Hoàn Mỹ hiện có hơn 5.500 nhân
                viên và đã phục vụ hơn 5 triệu lượt bệnh nhân khám ngoại trú vào năm ngoái.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
