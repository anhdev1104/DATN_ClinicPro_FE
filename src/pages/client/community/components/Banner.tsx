const BannerCommutity = () => {
  return (
    <section className="banner">
      <div className="section__banner">
        <div className="banner__list--img">
          <video className="w-full h-auto" id="banner-video" autoPlay muted loop playsInline data-keepplaying>
            <source
              src="https://hoanmy.com/wp-content/uploads/2023/05/Resilient-in-Blossoms-Preview-1.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="container mx-auto">
          <div className="banner__content">
            <div className="flex flex-wrap">
              <div className="container-page absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 ">
                <h1 className="banner__content--text text-white mt-[74px] mb-[28px] text-5xl font-medium">
                  Những Đóa Hoa Kiên Cường
                </h1>
              </div>
              <div className="container-page absolute top-65p left-2/4 -translate-x-2/4 -translate-y-2/4">
                <div className="banner__video flex items-center gap-6">
                  <span className="text-white text-2xl">Xem video đầy đủ</span>
                  <button className="banner__video--button play hidden">
                    <noscript>
                      <img
                        src="https://hoanmy.com/wp-content/themes/tot-bvhoanmy/assets/images/icons/play-icon.svg"
                        alt="Play video"
                      />
                    </noscript>
                    <img
                      className="lazyload"
                      src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20210%20140%22%3E%3C/svg%3E"
                      data-src="https://hoanmy.com/wp-content/themes/tot-bvhoanmy/assets/images/icons/play-icon.svg"
                      alt="Play video"
                    />
                  </button>
                  <button className="banner__video--button pause">
                    <noscript>
                      <img
                        src="https://hoanmy.com/wp-content/themes/tot-bvhoanmy/assets/images/icons/play-icon.svg"
                        alt="Pause video"
                      />
                    </noscript>
                    <img
                      className="ls-is-cached lazyloaded"
                      src="https://hoanmy.com/wp-content/themes/tot-bvhoanmy/assets/images/icons/play-icon.svg"
                      alt="Pause video"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCommutity;
