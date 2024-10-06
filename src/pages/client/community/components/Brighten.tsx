const Brighten = () => {
  return (
    <section className="brighten">
      <div className="container-page mx-auto px-4 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 pr-lg-3 m-auto">
            <div className="brighten__conten text-center ">
              <div className="brighten__content--img flex justify-center">
                <img
                  className="lazyloaded w-[167px] h-auto mx-auto"
                  src="https://png.pngtree.com/png-vector/20240506/ourmid/pngtree-nursing-day-3d-png-image_12372488.png"
                  data-src="https://hoanmy.com/wp-content/uploads/2023/05/brighten-up.png"
                  alt="brighten up"
                />
              </div>
              <h2 className="global-heading text-3xl font-semibold mt-4 text-primary whitespace-pre-line">
                Bừng Sáng Cuộc Sống
              </h2>
              <span className="block text-[14px] leading-[28px] text-center px-12 mt-5">
                “Bừng sáng cuộc sống” là một chiến dịch CSR quy mô lớn do Hoàn Mỹ bắt đầu triển khai vào năm 2018. Chiến
                dịch này nhằm cung cấp thông tin hữu ích về sức khỏe cho cộng đồng theo cách thú vị và sinh động.
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 pl-lg-5 mt-4 lg:mt-0">
            <div className="brighten__img">
              <img
                className="lazyloaded"
                src="https://htmediagroup.vn/wp-content/uploads/2022/12/Anh-bac-si-20-min.jpg"
                data-src="https://hoanmy.com/wp-content/uploads/2023/05/brighten-up-image.png"
                alt="brighten-up-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brighten;
