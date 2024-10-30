import { authLogout } from '@/redux/auth/authSlice';
import { logoutService } from '@/services/auth.service';
import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ModalHeaderUser = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
  const dispatch = useDispatch();

  const handleLogoutUser = async () => {
    const res = await logoutService();
    dispatch(authLogout());
    toast.success(res.message);
  };
  return (
    <div
      className="min-w-[200px] shadow-[0px_4px_10px_1px_#71717138] absolute top-16 left-2/4 -translate-x-3/4 modal-header-user"
      ref={ref}
      {...props}
    >
      <Link
        to="/profile"
        className="bg-white px-3 py-2 text-xs cursor-pointer block transition-all ease-linear hover:bg-gray-100"
      >
        Thông tin cá nhân
      </Link>
      <Link
        to=""
        className="bg-white px-3 py-2 text-xs cursor-pointer block transition-all ease-linear hover:bg-gray-100"
      >
        Lịch hẹn khám bệnh
      </Link>
      <Link
        to=""
        className="bg-white px-3 py-2 text-xs cursor-pointer block transition-all ease-linear hover:bg-gray-100"
      >
        Lịch sử khám bệnh
      </Link>
      <div
        className="bg-white px-3 py-2 text-xs cursor-pointer block transition-all ease-linear hover:bg-gray-100"
        onClick={handleLogoutUser}
      >
        Đăng xuất
      </div>
    </div>
  );
});

export default ModalHeaderUser;
