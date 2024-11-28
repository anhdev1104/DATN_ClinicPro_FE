import React from 'react';

type TagsType = {
  tagsColor?: string;
  className?: string;
  children: React.ReactNode;
};

const Tags = ({ tagsColor = 'inactive', className, children }: TagsType) => {
  let bgTags;
  switch (tagsColor) {
    case 'active':
      bgTags = 'bg-[#00d3c71a] text-[#00d3c7]';
      break;
    case 'warning':
      bgTags = 'text-[#ff9b01] bg-[#fef5e4]';
      break;
    case 'critical':
      bgTags = 'text-[#ff01a2] bg-[#ffe5f6]';
      break;
    case 'inactive':
      bgTags = 'bg-[#f0f0f0] text-dark';
      break;
    default:
      bgTags = 'bg-[#f0f0f0] text-dark';
      break;
  }

  return (
    <div className={`px-7 py-1 ${bgTags} ${className} w-fit min-w-[110px] rounded-md font-medium shadow text-center`}>
      {children}
    </div>
  );
};

export default Tags;
