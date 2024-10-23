import { ReactNode } from 'react';

const Field = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={`mb-4 w-full ${className}`}>{children}</div>;
};

export default Field;
