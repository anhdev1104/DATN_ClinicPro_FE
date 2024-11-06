import EmojiNotFound from '@/assets/icons/emoji-404.svg?react';
import BaseButton from '@/components/base/button';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  title: string;
}
const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-h-screen w-full">
        <center className="mt-24 m-auto">
          <EmojiNotFound className="relative animate-move w-36 sm:w-40 md:w-52 lg:w-60" />
          <div className=" tracking-widest mt-4">
            <span className="text-gray-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl block">
              <span>4 0 4</span>
            </span>
            <span className="text-gray-500 text-lg md:text-xl">{title}</span>
          </div>
        </center>
        <center className="mt-6">
          <BaseButton size="sm" onClick={() => navigate(-1)}>
            trở lại
          </BaseButton>
        </center>
      </div>
    </>
  );
};

export default NotFound;
