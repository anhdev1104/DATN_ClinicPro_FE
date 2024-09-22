const fakeData = [
  {
    name: 'Mục đích',
    description: 'Vì mục tiêu nâng cao sức khỏe và hạnh phúc của mọi người dân Việt Nam.',
  },
  {
    name: 'Tầm nhìn',
    description:
      'Trở thành đơn vị dẫn đầu toàn quốc về lĩnh vực chăm sóc sức khỏe và là thương hiệu chăm sóc sức khỏe đáng tin cậy nhất ở Việt Nam.',
  },
  {
    name: 'Sứ mệnh',
    description: 'Vận hành mạng lưới tích hợp các thương hiệu chăm sóc sức khỏe tại các thành phố lớn.',
  },
];

const years = [
  { year: 1997 },
  { year: 1999 },
  { year: 2002 },
  { year: 2007 },
  { year: 2008 },
  { year: 2010 },
  { year: 2011 },
  { year: 2013 },
  { year: 2014 },
  { year: 2016 },
  { year: 2017 },
  { year: 2018 },
  { year: 2021 },
  { year: 2022 },
  { year: 2023 },
];

const Infomation = () => {
  return (
    <>
      <section className="bg-[#eeefef]">
        <div className="flex">
          <div className="flex-[0_0_50%] max-w-[50%]">
            <img className="object-cover align-middle h-full" src="/images/aboutUs/infomation-1.webp" alt="" />
          </div>
          <div className="flex-[0_0_50%] max-w-[50%]">
            <div className="flex flex-col gap-12 justify-center h-full max-w-[556px] py-[106px] pl-[99px]">
              {fakeData.map((item, index) => (
                <div key={index}>
                  <h3 className="text-[32px] font-semibold leading-[44px] text-primaryText">{item.name}</h3>
                  <span className="block m-auto text-[14px] leading-[30px] font-light text-dark ">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex-[0_0_50%] max-w-[50%]">
            <div className="flex flex-col gap-12 justify-center h-full max-w-[556px] py-[106px] pl-[99px]">
              <div>
                <h3 className="text-[32px] font-semibold leading-[44px] text-primaryText">Tên gọi của sự Hoàn Hảo</h3>
                <span className="block m-auto text-[14px] leading-[30px] font-light text-dark ">
                  Bạn có biết không? “Hoàn Mỹ” có nghĩa là “không tì vết”, “hoàn hảo” hay “đẹp”. Sự hoàn hảo là ngôi sao
                  Bắc Đẩu định hướng mọi thứ chúng tôi làm tại bệnh viện và phòng khám cho bệnh nhân và cộng đồng mà
                  chúng tôi phục vụ.
                </span>
              </div>
            </div>
          </div>
          <div className="flex-[0_0_50%] max-w-[50%]">
            <img className="object-cover align-middle h-full" src="/images/aboutUs/infomation-2.webp" alt="" />
          </div>
        </div>
      </section>
      <section>
        <div className="pt-[170px] pb-[140px]">
          <div className="container-page">
            <div className="flex flex-wrap ml-[-15px] mr-[-15px]">
              <div className="flex-[0_0_100%] max-w-full">
                <h2 className="text-[32px] font-semibold leading-[54px] text-primaryText text-center">
                  Giá trị của Hoàn Mỹ
                </h2>
                <p className="my-4 text-center font-normal text-dark">
                  Đây là kim chỉ nam dẫn lối Hoàn Mỹ trong sứ mệnh nâng cao sức khỏe và hạnh phúc đến tất cả người dân
                  Việt Nam. Tận tâm chăm sóc.
                </p>
              </div>

              <div className="flex-[0_0_100%] max-w-full py-[3rem] flex justify-center">
                <div className="flex justify-center pl-[0.5rem] flex-wrap">
                  <div className="flex-[0_0_25%] w-[25%] p-[50px] cursor-pointer flex flex-col items-center group">
                    <div className="h-[170px] w-full relative transition-all">
                      <img
                        src="/images/aboutUs/C.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[2] group-hover:bottom-[5%] group-hover:z-2"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/C-1.webp"
                        className="absolute z-[3] left-[7%] bottom-0 rotate-[13deg] w-[60%] transition-transform  group-hover:rotate-[0deg] group-hover:bottom-[5%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/C-2.webp"
                        className="absolute z-[4] left-[-10%] bottom-[11%] w-[60%] transition-opacity duration-700 group-hover:bottom-[16%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/C-3.png"
                        className="absolute z-[5] left-0 bottom-[5%] w-1/2 transition-all group-hover:bottom-[15%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/C-4.webp"
                        className="absolute z-[1] left-[-26%] bottom-[2%] w-[67%] rotate-[9deg] transition-transform group-hover:rotate-[0deg] group-hover:bottom-[7%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/C-5.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[2] group-hover:bottom-[5%] group-hover:z-0"
                        alt=""
                      />
                    </div>
                    <div className="relative text-center m-[-30px] transition-all duration-300 bottom-0 mt-[3rem] pt-[1rem] group-hover:bottom-[8%]">
                      <h3 className="text-[#00a5b4] text-[20px] font-medium mb-[0.5rem] leading-6 group-hover:scale-[1.1] group-hover:text-primaryText">
                        Cam kết
                      </h3>
                      <h4 className="text-[#00a5b4] text-[20px] font-light mb-[0.5rem] leading-6">
                        về chất lượng chăm sóc
                      </h4>

                      <div className="mt-[1.5rem] text-center">
                        <p className="text-dark font-extralight mb-4 text-[16px] leading-6">
                          Chúng tôi cam kết cung cấp dịch vụ chăm sóc chất lượng với người bệnh là trung tâm.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-[0_0_25%] w-[25%] p-[50px] cursor-pointer flex flex-col items-center group">
                    <div className="h-[170px] w-full relative transition-all">
                      <img
                        src="/images/aboutUs/A.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[1] group-hover:bottom-[5%] group-hover:z-2"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/A-1.webp"
                        className="absolute z-[4] right-[25%] bottom-[35%] rotate-[0deg] w-[35%] transition-transform group-hover:rotate-[-10deg] group-hover:right-[27%] group-hover:bottom-[40%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/A-2.webp"
                        className="absolute z-[2] right-[26%] bottom-[18%] w-[8%] transition-all group-hover:bottom-[23%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/A-3.webp"
                        className="absolute z-[5] right-[10%] bottom-[60%] w-1/3 transition-all group-hover:rotate-[20deg] group-hover:bottom-[65%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/A-4.webp"
                        className="absolute z-[5] right-[18%] bottom-[28%] w-[30%] rotate-[9deg] transition-all group-hover:right-[13%] group-hover:bottom-[33%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/A-5.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[2] group-hover:bottom-[5%] group-hover:z-0"
                        alt=""
                      />
                    </div>
                    <div className="relative text-center m-[-30px] transition-all duration-300 bottom-0 mt-[3rem] pt-[1rem] group-hover:bottom-[8%]">
                      <h3 className="text-[#00a5b4] text-[20px] font-medium mb-[0.5rem] leading-6 group-hover:scale-[1.1] group-hover:text-primaryText">
                        Trách nhiệm
                      </h3>
                      <h4 className="text-[#00a5b4] text-[20px] font-light mb-[0.5rem] leading-6">
                        vì sức khỏe người bệnh
                      </h4>

                      <div className="mt-[1.5rem] text-center">
                        <p className="text-dark font-extralight mb-4 text-[16px] leading-6">
                          Chúng tôi làm chủ kết quả của hành động, xây dựng niềm tin với đồng nghiệp và người bệnh.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-[0_0_25%] w-[25%] p-[50px] cursor-pointer flex flex-col items-center group">
                    <div className="h-[170px] w-full relative transition-all">
                      <img
                        src="/images/aboutUs/R.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[2] group-hover:bottom-[5%] group-hover:z-2"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/R-1.png"
                        className="absolute z-[4] left-[14%] top-[3%] rotate-[0deg] w-[40%] transition-all group-hover:rotate-[0deg] group-hover:left-[10%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/R-2.webp"
                        className="absolute z-[3] left-[28%] top-[-5%] w-[25%] rotate-[5deg] transition-all group-hover:rotate-[27deg]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/R-3.webp"
                        className="absolute z-[3] left-0 top-[-19%] w-[40%] transition-all group-hover:bottom-[18%] group-hover:rotate-[-8deg]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/R-4.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[2] group-hover:bottom-[5%] group-hover:z-0"
                        alt=""
                      />
                    </div>
                    <div className="relative text-center m-[-30px] transition-all duration-300 bottom-0 mt-[3rem] pt-[1rem] group-hover:bottom-[8%]">
                      <h3 className="text-[#00a5b4] text-[20px] font-medium mb-[0.5rem] leading-6 group-hover:scale-[1.1] group-hover:text-primaryText">
                        Tôn trọng
                      </h3>
                      <h4 className="text-[#00a5b4] text-[20px] font-light mb-[0.5rem] leading-6">vì cộng đồng</h4>

                      <div className="mt-[1.5rem] text-center">
                        <p className="text-dark font-extralight mb-4 text-[16px] leading-6">
                          Chúng tôi luôn tôn trọng và công bằng với tất cả mọi người.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-[0_0_25%] w-[25%] p-[50px] cursor-pointer flex flex-col items-center group">
                    <div className="h-[170px] w-full relative transition-all">
                      <img
                        src="/images/aboutUs/E.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[2] group-hover:bottom-[5%] group-hover:z-2"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/E-1.png"
                        className="absolute z-[4] left-[-2%] bottom-[-12%] rotate-[0deg] w-[50%] transition-all group-hover:rotate-[0deg] group-hover:left-[-1%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/E-2.webp"
                        className="absolute z-[2] left-[-6%] bottom-[2%] w-[40%] rotate-[-8deg] transition-all group-hover:rotate-[-16deg] group-hover:left-[-7%]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/E-3.webp"
                        className="absolute z-[3] left-[15%] bottom-0 w-[45%] transition-all group-hover:bottom-[18%] group-hover:rotate-[-10deg]"
                        alt=""
                      />
                      <img
                        src="/images/aboutUs/E-4.webp"
                        className="absolute object-unset h-full w-full bottom-0 transition-all z-[2] group-hover:bottom-[5%] group-hover:z-0"
                        alt=""
                      />
                    </div>
                    <div className="relative text-center m-[-30px] transition-all duration-300 bottom-0 mt-[3rem] pt-[1rem] group-hover:bottom-[8%]">
                      <h3 className="text-[#00a5b4] text-[20px] font-medium mb-[0.5rem] leading-6 group-hover:scale-[1.1] group-hover:text-primaryText">
                        Đồng cảm
                      </h3>
                      <h4 className="text-[#00a5b4] text-[20px] font-light mb-[0.5rem] leading-6">với người bệnh</h4>

                      <div className="mt-[1.5rem] text-center">
                        <p className="text-dark font-extralight mb-4 text-[16px] leading-6">
                          Chúng tôi luôn thấu cảm và tận tâm trong tất cả điều mình làm.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-max flex flex-col">
        <div className="text-primaryText leading-[54px] text-[32px] font-semibold text-center max-w-full flex-[0_0_100%]">
          Câu chuyện của chúng tôi
        </div>
        <div className="pt-[60px]">
          <div className="flex flex-col">
            <div className="flex justify-center">
              {years.map(item => {
                return (
                  <div
                    key={item.year}
                    className="text-center w-max px-3 py-2 cursor-pointer hover:border-b-[4px] hover:border-[#009bab] border-gray-300 border-b-[4px]"
                  >
                    <span className="text-[18px] font-light text-primaryText">{item.year}</span>
                  </div>
                );
              })}
            </div>
            <div className="max-w-[100%] bg-[#eeefef] flex">
              <div className="opacity-0 translate-x-[10%] animate-slide-in-right flex-[0_0_50%]  flex justify-center max-w-[542px] ml-auto flex-col pr-[60px]">
                <span className=" text-[28px] max-w-full leading-[38px] text-[#00a5b4] font-medium delay-[500ms]">
                  {' '}
                  Thêm 3 bệnh viện gia nhập tập đoàn{' '}
                </span>
              </div>
              <div className="flex-[0_0_50%]">
                <img className="w-full h-[560px] object-cover" src="/images/aboutUs/story-1.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Infomation;
