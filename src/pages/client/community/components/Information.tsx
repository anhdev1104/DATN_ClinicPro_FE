const InformationSection = () => {
  return (
    <section className="information bg-[rgb(238,239,239)] lg:mt-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 ">
            <div className="brighten__img">
              <img
                className="w-full"
                src="https://baolamdong.vn/file/e7837c02845ffd04018473e6df282e92/062023/a1-45_20230617201304.jpg"
                alt="brighten-up-image"
              />
            </div>
          </div>
          <div className="lg:w-1/2 pl-0 lg:pl-8 mt-6 h-full max-w-[556px]">
            <div className="information__content pl-[65px] m-auto">
              <h2 className="text-3xl font-semibold text-primary mb-10">Viết Tiếp Câu Chuyện Trái Tim</h2>
              <p className="text-[13px] font-normal leading-[30px] text-[#5d5d5d]">
                Năm 2007, Hoàn Mỹ đã khởi đầu hành trình giúp đỡ những người mắc bệnh tim – từ các tỉnh xa nhất miền Bắc
                đến miền Nam. Nhờ có sự tài trợ của các tổ chức từ thiện như Quỹ Bảo trợ Trẻ em Việt Nam cũng như sự hỗ
                trợ của đội ngũ nhân viên y tế Hoàn Mỹ, chúng tôi đã thực hiện khám sức khỏe cho hàng nghìn trẻ em.
                Chúng tôi đã thành công trong việc chữa lành cho nhiều trẻ em bị dị tật tim bẩm sinh. Đã nhiều năm trôi
                qua kể từ khi hành trình này bắt đầu, chúng tôi vẫn không ngừng cố gắng viết tiếp những câu chuyện về
                trái tim cho người dân Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 pr-0 lg:pr-8">
            <div className="information__content m-auto h-full max-w-[556px] pl-32">
              <h2 className="text-3xl font-semibold text-primary mb-10">
                Chương Trình Đào Tạo Về Sơ Cứu Cho Cộng Đồng
              </h2>
              <p className="ext-[13px] font-normal leading-[30px] text-[#5d5d5d]">
                Nằm trong chương trình tiếp cận cộng đồng của Tập đoàn, Hoàn Mỹ cung cấp hoạt động đào tạo về Cấp cứu
                cho các Tổ chức phi chính phủ, công ty và trường học trên khắp Việt Nam. Khi ngày càng nhiều người trên
                khắp đất nước được trang bị kiến thức về việc cần làm trong tình huống khẩn cấp, chúng ta có thể trợ
                giúp đồng bào của mình khi tai nạn xảy ra. Hoạt động đào tạo hiệu quả về Sơ cứu giúp cứu sống nhiều sinh
                mạng.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 pl-0  mt-6 lg:mt-0">
            <div className="brighten__img">
              <img
                className="w-full "
                src="https://files.benhvien108.vn/ecm/source_files/2024/04/05/240404-1-2-080737-050424-18.jpg"
                alt="brighten-up-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationSection;
