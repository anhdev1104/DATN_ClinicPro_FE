import { FC } from 'react';

interface IButton {
  type: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
  image?: string;
}

const ButtonSocial: FC<IButton> = ({ type = 'button', children = '', className = '', image }) => {
  return (
    <button type={type} className={`${className} flex items-center justify-start gap-[5%] mb-2`}>
      <div className="flex-[0_0_25%]">
        <img className="w-[30px] object-cover float-end" src={image} alt="" />
      </div>
      <div className="flex-[0_0_70%] text-left text-[13px]">{children}</div>
    </button>
  );
};

export default ButtonSocial;
