const Banner = () => {
  return (
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
  );
};

export default Banner;
