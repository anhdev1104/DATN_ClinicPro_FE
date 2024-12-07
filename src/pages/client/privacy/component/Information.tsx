const Domain = import.meta.env.VITE_API_MASTER_DOMAIN;
const Information = () => {
  return (
    <div className="information p-[106px]  ">
      <div className="container-page">
        <h2 className="text-third text-[23px] leading-[25px] font-semibold py-[20px] pb-[30px]">
          CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG
        </h2>
        <div className="space-y-4">
          <p className="text-[16px] leading-[25px] mb-[20px] font-light">
            {Domain} cam kết sẽ bảo mật những thông tin mang tính riêng tư của khách hàng. Quý khách vui lòng đọc bản
            “Chính sách bảo mật” dưới đây để hiểu hơn những cam kết mà chúng tôi thực hiện, nhằm tôn trọng và bảo vệ
            quyền lợi của người truy cập:
          </p>

          <div>
            <h3 className="text-[16px] leading-[25px] font-bold mb-[20px] p-10px">
              1. Mục đích và phạm vi thu thập thông tin
            </h3>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Các thông tin thu thập thông qua website {Domain} sẽ giúp chúng tôi:
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Hỗ trợ khách hàng khi khám bệnh, chữa bệnh tại đây
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">Giải đáp thắc mắc khách hàng</p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Cung cấp cho bạn thông tin mới nhất (như chương trình ưu đãi, tri ân tới khách hàng…) trên Website của
              chúng tôi
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Xem xét và nâng cấp nội dung và giao diện của Website
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Thực hiện các hoạt động quảng bá pên quan đến các gói khám của {Domain}
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Để truy cập và sử dụng một số dịch vụ khám chữa bệnh tại {Domain} , quý khách có thể sẽ được yêu cầu đăng
              ký với chúng tôi thông tin cá nhân (Email, Họ tên, Số ĐT liên lạc…).
            </p>
          </div>

          <div>
            <h3 className="text-[16px] leading-[25px] font-bold mb-[20px] p-10px">
              2. Phạm vi sử dụng thông tin cá nhân
            </h3>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              {Domain} thu thập và sử dụng thông tin cá nhân quý khách với mục đích phù hợp và hoàn toàn tuân thủ nội
              dung của “Chính sách bảo mật” này.
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để pên hệ trực tiếp với bạn dưới các hình thức
              như: gửi thư ngỏ, thư cảm ơn, thông tin về kỹ thuật và bảo mật, quý khách có thể nhận được thư định kỳ
              cung cấp thông tin dịch vụ gói khám mới, thông tin về các sự kiện sắp tới hoặc thông tin tuyển dụng nếu
              quý khách đăng ký nhận email thông báo.
            </p>
          </div>
          <div>
            <h3 className="text-[16px] leading-[25px] font-bold mb-[20px] p-10px">3. Thời gian lưu trữ thông tin</h3>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Chúng tôi sẽ lưu trữ các Thông tin cá nhân do Khách hàng cung cấp trên hệ thống của chúng tôi trong quá
              trình cung cấp dịch vụ cho khách hàng hoặc cho đến khi hoàn thành mục đích thu thập hoặc khi Khách hàng có
              yêu cầu hủy các thông tin đã cung cấp.
            </p>
          </div>

          <div>
            <h3 className="text-[16px] leading-[25px] font-bold mb-[20px] p-10px">
              4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
            </h3>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">Công ty Cổ phần Y khoa Clinic Pro</p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Địa chỉ: 575 Tôn Đức Thắng, Phường Hoà Khánh Nam, Quận Liên Chiển, TP Đà Nẵng, Việt Nam.
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">Điện thoại: (039) 578 7557.</p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Email: <a href="mailto:contactus@hoanmy.com">contactus@clinicpro.com</a>
            </p>
          </div>
          <div>
            <h3 className="text-[16px] leading-[25px] font-bold mb-[20px] p-10px">
              5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình
            </h3>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Bất cứ thời điểm nào quý khách cũng có thể truy cập và chỉnh sửa những thông tin cá nhân của mình theo các
              liên kết (website’s links) thích hợp mà chúng tôi cung cấp.
            </p>
          </div>
          <div>
            <h3 className="text-[16px] leading-[25px] font-bold mb-[20px] p-10px">
              6. Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên quan đến việc thông tin cá nhân bị sử
              dụng sai mục đích hoặc phạm vi đã thông báo.
            </h3>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">
              Trường hợp bạn nghi ngờ tài khoản người dùng hoặc mật khẩu bị tiết lộ, bạn phải thay đổi mật khẩu mới,
              hoặc báo ngay với Ban quản trị website {Domain} qua mail contactus@clinicpro.com để được hỗ trợ.
            </p>
            <p className="text-[16px] leading-[25px] font-light  block mb-[15px]">CÔNG TY CỔ PHẦN Y KHOA CLINIC PRO</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Information;
