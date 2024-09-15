import { ReactNode } from 'react';

const Field = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={`${className} mb-5 w-full`}>{children}</div>;
};

export default Field;
