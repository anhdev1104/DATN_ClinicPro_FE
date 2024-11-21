const Banner = () => {
  return (
    <section className="relative">
      <img src="/images/banner.webp" alt="banner" />
      <div className="container-page absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <h1 className="mt-[74px] mb-[28px] text-5xl text-third font-bold">
          <span className="block mb-3">Chuỗi Phòng Khám </span>
          <span className="block mb-3">Y Tế Được </span>
          <span className="block mb-3">Tin Tưởng Nhất </span>
          <span className="block mb-3">Ở Việt Nam </span>
        </h1>
        <img src="/images/clinicpro-awards.png" alt="clinicpro-awards" width={530} />
      </div>
    </section>
  );
};

export default Banner;
