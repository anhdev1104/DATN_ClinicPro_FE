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
const Story = () => {
  return (
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
  );
};

export default Story;
