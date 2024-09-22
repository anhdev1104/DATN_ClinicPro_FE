const Amount = () => {
  return (
    <section className="amount relative py-10">
      <div className="section__amount relative">
        <video className="absolute inset-0 w-full h-full object-cover" id="gradient-video" autoPlay muted loop>
          <source
            src="https://hoanmy.com/wp-content/themes/tot-bvhoanmy/assets/videos/gradient-ramp.mp4"
            type="video/mp4"
          />
        </video>
        <div className="container-page relative mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 text-white z-10 relative">
            <div className="col-span-1 text-center m-auto">
              <h2 className="amount__title text-3xl font-bold ">
                <span className="amount__title-large text-2xl ">Tiếp Cận Cộng Đồng</span>
              </h2>
              <div className="px-4 md:px-2 mt-4 text-lg pt-7 line-title">
                <span className=" amount__title-small ">
                  Tổng quan về hoạt động
                  <br />
                  Chăm sóc sức khỏe và Từ thiện
                </span>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 lg:grid-cols-5 gap-4 text-center py-20">
              <div className="amount__item">
                <div className="amount__number text-4xl font-semibold ">45</div>
                <span className="amount__title text-lg mt-2 block">Tỉnh</span>
              </div>

              <div className="amount__item ">
                <div className="amount__number text-4xl font-semibold ">276K</div>
                <span className="amount__title text-lg mt-2 block">Số người được phục vụ</span>
              </div>

              <div className="amount__item">
                <div className="amount__number text-4xl font-semibold ">187</div>
                <span className="amount__title text-lg mt-2 block">Sự kiện từ thiện</span>
              </div>

              <div className="amount__item">
                <div className="amount__number text-4xl font-semibold ">310</div>
                <span className="amount__title text-lg mt-2 block">Cuộc thảo luận về sức khỏe</span>
              </div>

              <div className="amount__item">
                <div className="amount__number text-4xl font-semibold ">206</div>
                <span className="amount__title text-lg mt-2 block">Sàng lọc y tế</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amount;
