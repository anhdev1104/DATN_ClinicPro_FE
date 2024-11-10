import EmojiNotFound from '/public/icons/emoji-404.svg?react';
import BaseButton from '@/components/base/button';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  title: string;
}
const NotFoundPage: React.FC<NotFoundProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-h-screen w-full">
        <center className="pt-24">
          <EmojiNotFound className="relative animate-move w-36 sm:w-40 md:w-52 lg:w-60" />
          <div className=" tracking-widest mt-4">
            <span className="text-gray-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl block my-5">
              <span>4 0 4</span>
            </span>
            <span className="text-gray-500 text-lg md:text-xl">{title}</span>
          </div>
        </center>
        <center className="mt-5">
          <BaseButton size="sm" onClick={() => navigate(-1)}>
            Trở lại
          </BaseButton>
        </center>
      </div>
    </>
  );
};

export default NotFoundPage;
