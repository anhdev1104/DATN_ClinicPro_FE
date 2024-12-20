import { Link } from 'react-router-dom';

const NavigateChatBox = () => {
  return (
    <Link
      to={'/chat-ai'}
      className="fixed bottom-[50px] right-[50px] w-14 h-14 bg-white flex justify-center items-center rounded-full cursor-pointer z-10 border-none"
      style={{ boxShadow: '0px 1px 6px -2px #48484886' }}
    >
      <img className="size-full rounded-full" src="/images/chat-ai-img.png" alt="" />
    </Link>
  );
};

export default NavigateChatBox;
