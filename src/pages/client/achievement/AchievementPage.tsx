import BannerImg from '/images/banner-thanh-tuu.webp';
import Achieve from '/images/awards2.webp';
import Image from '/images/image-awards.webp';
const AchievementPage = () => {
  return (
    <>
      <div>
        <div className="relative">
          <img src={BannerImg} alt="" />
          <div className="container-page mx-auto left-2/4 -translate-x-2/4 absolute top-2/4 -translate-y-2/4 space-y-6">
            <h1 className="text-third font-semibold text-2xl md:text-6xl text-wrap w-[400px] mb-10">
              Giải Thưởng & Thành Tựu
            </h1>
            <img className="h-16 md:h-28 w-auto" src={Achieve} alt="" />
          </div>
        </div>
        <div className="container-page">
          <div className="flex flex-col my-10 space-y-10 items-center">
            <p className="text-center w-11/12 text-xl font-light">
              Tập đoàn Y khoa Hoàn Mỹ đã 5 lần giành giải thưởng “Bệnh viện của năm tại Việt Nam” do Frost & Sullivan
              trao tặng từ năm 2016, 2017, 2018, 2019, 2023. Những giải thưởng này được trao cho các công ty, tập đoàn
              có đóng góp đáng kể cho ngành nghề mà họ đang kinh doanh.
            </p>
            <div className="w-[888px] h-[135px] mx-auto">
              <img className="w-full h-full object-cover" src={Achieve} alt="" />
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4 my-20">
            <div className="flex flex-col justify-between items-center md:items-start space-y-10 order-1 md:order-2 md:max-w-[85%]">
              <div>
                <img src="https://hoanmy.com/wp-content/themes/tot-bvhoanmy/assets/images/icons/ngoac-kep.svg" alt="" />
              </div>
              <p className="leading-6 font-light">
                Bệnh viện thuộc hệ thống y khoa Hoàn Mỹ luôn nằm trong số những nơi có chất lượng hàng đầu cả nước và
                nhận được nhiều giải thưởng uy tín. Hơn 5.000 nhân viên lâm sàng và phi lâm sàng làm việc không ngừng
                nghỉ để đảm bảo rằng tất cả bệnh nhân của chúng tôi đều nhận được sự chăm sóc tốt nhất. Tập đoàn Y khoa
                Hoàn Mỹ tự hào về những nỗ lực không mệt mỏi và cam kết bền vững trong việc cung cấp các dịch vụ y tế
                chất lượng cao nhằm xây dựng một Việt Nam khoẻ mạnh hơn.
              </p>
              <div className="text-center md:text-start">
                <h3 className="text-third text-base font-semibold">Dr. Dilshaad Ali Bin Abas Ali</h3>
                <p>Tổng giám đốc Tập đoàn Y khoa Hoàn Mỹ</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img className="w-full h-full" src={Image} alt="imgae" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#eeefef]">
          <div>
            <img src="https://hoanmy.com/wp-content/uploads/2023/05/image-awards-2.png.webp" alt="" />
          </div>
          <div className="px-20 py-40">
            <p className="text-left font-light leading-7 max-w-[500px]">
              Bệnh viện Quốc tế Hạnh Phúc luôn tận tâm mang lại dịch vụ chăm sóc vượt trội cho phụ nữ và trẻ em ở Việt
              Nam. Trung tâm hỗ trợ Sinh sản của Bệnh viện Quốc tế Hạnh Phúc là trung tâm đầu tiên ở Việt Nam nhận được
              Chứng chỉ RTAC(2). Không chỉ có vậy, bệnh viên cũng là đơn vị tiên phong tại Việt Nam ứng dụng các công
              nghệ IVF cao cấp, mang lại niềm vui cho hàng trăm cặp vợ chồng hiếm muộn ở Việt Nam. Trung tâm Chăm sóc
              Chuyên sâu dành cho Trẻ sơ sinh (NICU) của Hạnh Phúc nổi tiếng với các kĩ thuật chăm sóc hàng đầu dành cho
              trẻ sơ sinh quá non (26 tuần tuổi) mà không phải điều trị bằng kháng sinh. Đây là bệnh viện bà mẹ và trẻ
              em đầu tiên ở Việt Nam giành được thành tựu nổi bật với chứng nhận JCI (Joint Commission International):
              con dấu vàng công nhận an toàn và chất lượng bệnh viện toàn cầu’. Để biết thêm thông tin, vui lòng truy
              cập www.hanhphuchospital.com.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default AchievementPage;
