const arrBranch = [
  {
    nameBranch: 'Bệnh viện Hoàn Mỹ Sài Gòn',
    location: '60-60A Phan Xích Long, Phường 1, Phú Nhuận, Thành phố Hồ Chí Minh',
    tel: '028 3990 2468',
    img: '/images/branchs/branch-1.webp',
  },
  {
    nameBranch: 'Bệnh viện Hoàn Mỹ Thủ Đức',
    location: '241 Quốc lộ 1K, P. Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh',
    tel: '028 7306 2062',
    img: '/images/branchs/branch-2.webp',
  },
  {
    nameBranch: 'Bệnh viện Hoàn Mỹ Đà Nẵng',
    location: '291 Nguyễn Văn Linh, P. Thạc Gián, Q. Thanh Khê, TP. Đà Nẵng',
    tel: '0236 3650 676',
    img: '/images/branchs/branch-3.webp',
  },
  {
    nameBranch: 'Bệnh viện Hoàn Mỹ Cửu Long',
    location: 'Lô 20 Võ Nguyên Giáp, Phú Thứ, Cái Răng, Cần Thơ',
    tel: '02923 917 355',
    img: '/images/branchs/branch-4.webp',
  },
  {
    nameBranch: 'Bệnh viện Hoàn Mỹ Đà Lạt',
    location: 'Đồi Long Thọ, Đường Mimoza, Phường 10, TP. Đà Lạt, Lâm Đồng',
    tel: '0263 3577 633',
    img: '/images/branchs/branch-5.webp',
  },
  {
    nameBranch: 'Bệnh viện Hoàn Mỹ Đồng Nai',
    location: '1048A Phạm Văn Thuận, KP.2, P. Tân Mai, TP. Biên Hoà, Đồng Nai',
    tel: '0251 3955 955',
    img: '/images/branchs/branch-6.jpg',
  },
];

const BranchsPage = () => {
  return (
    <div>
      <section className="relative mt-[106px]">
        <div>
          <img
            className="h-[calc(100vh-107px)] w-full object-cover object-top"
            src="/images/branchs/banner.webp"
            alt=""
          />
        </div>
        <div className="absolute h-[80%] flex items-center left-[50%] top-0 translate-x-[-145%] translate-y-[-20%]">
          <div className="flex justify-center flex-col items-start mt-[74px] mb-[24px]">
            <h1 className="text-primaryText font-semibold text-2xl md:text-6xl text-wrap mb-2">Bệnh Viện</h1>
            <span className="text-[#abdfe1] font-semibold text-2xl md:text-6xl text-wrap mb-2"> & </span>
            <h1 className="text-primaryText font-semibold text-2xl md:text-6xl text-wrap">Phòng Khám</h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page pt-[20px] pb-[100px]">
          {arrBranch.map(item => (
            <div
              key={item.nameBranch}
              className="flex justify-center gap-[30px] p-[15px] ltr transition-all duration-[300ms] hover:bg-[#f5f7f7]"
            >
              <div className="h-[200px] w-[280px]">
                <img className="size-full object-cover" src={item.img} alt="" />
              </div>
              <div className="flex-1 flex flex-col justify-evenly gap-[10px]">
                <h4 className="text-[18px] text-primaryText leading-[30px] font-semibold">{item.nameBranch}</h4>
                <div className="">
                  <div className="flex items-center  gap-[10px] mb-[8px]">
                    <img src="/images/branchs/location.svg" alt="" />
                    <a href="">
                      <span className="text-[13px] font-light leading-[20px] text-[#5d5d5d]">{item.location}</span>
                    </a>
                  </div>
                  <div className="flex items-center  gap-[10px] mb-[8px]">
                    <img src="/images/branchs/phone.svg" alt="" />
                    <a href="">
                      <span className="text-[13px] font-light leading-[20px] text-[#5d5d5d]">{item.tel}</span>
                    </a>
                  </div>
                  <div className="flex items-center  gap-[10px] mb-[8px]">
                    <img src="/images/branchs/clock.svg" alt="" />
                    <a href="">
                      <span className="text-[13px] font-light leading-[20px] text-[#5d5d5d]">Mở cửa 24 giờ</span>
                    </a>
                  </div>
                </div>
                <a
                  href=""
                  className="text-[13px] font-medium leading-[1] text-white bg-[#009bab] w-[fit-content] py-[10px] px-[50px] rounded-[17px] uppercase  transition-all duration-[300ms] hover:scale-[1.1]"
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BranchsPage;
