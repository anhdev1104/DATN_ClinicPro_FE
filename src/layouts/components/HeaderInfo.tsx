import { ModalHeaderUser } from '@/components/modal';
import useClickOutSide from '@/hooks/useClickOutSide';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderInfo = () => {
  const auth = useSelector((state: RootState) => state.auth.data);
  const { nodeRef, show, setShow } = useClickOutSide();

  const handleToggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(prev => !prev);
  };

  return (
    <div className="relative">
      <div
        className="w-11 h-11 rounded-full overflow-hidden cursor-pointer border-2 border-primary shadow-lg"
        title="Quản lý tài khoản"
        onClick={handleToggleModal}
      >
        <img src={auth?.data.user_info.avatar} alt="avatar-user" className="w-full h-full object-cover" />
      </div>
      {show && <ModalHeaderUser ref={nodeRef} />}
    </div>
  );
};

export default HeaderInfo;
