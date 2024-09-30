const PosterAuth = () => {
  return (
    <div className="w-2/4 relative">
      <img
        className="w-full h-full object-cover"
        style={{ objectPosition: '70% 30%' }}
        src="/images/banner-goi-kham.webp"
        alt=""
      />
      <div className="w-full h-auto max-w-[90%] mx-auto bg-[#acacac82] backdrop-blur-[1px] p-6 border-[0.5px] border-gray-200 text-white absolute bottom-0 left-[50%] translate-y-[-10%] translate-x-[-50%] flex flex-col gap-3">
        <div>
          <h1 className="text-white text-[20px] leading-[35px] font-semibold">
            "Chào mừng bạn đến với ClinicPro. Chúng tôi là mạng lưới chăm sóc sức khỏe tư nhân hàng đầu tại Việt Nam."
          </h1>
        </div>
        <div className="h-[0.5px] bg-white w-full"></div>

        <div className="w-full h-auto flex justify-between gap-2">
          <div className="flex-[0_0_50%]">
            <h1 className="mb-2 text-[17px]">ClinicPro Hospital</h1>
            <p className="text-[11px] text-white opacity-80">
              575 Tôn Đức Thắng, Phường Hoà Khánh Nam, Quận Liên Chiển, TP Đà Nẵng
            </p>
          </div>

          <div className="flex-[0_0_50%]"></div>
        </div>
      </div>
    </div>
  );
};

export default PosterAuth;
