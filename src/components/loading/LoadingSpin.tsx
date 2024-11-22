const LoadingSpin = ({ color = 'border-white', className }: { color?: string; className?: string }) => {
  return (
    <div
      className={`w-6 h-6 border-4 border-t-transparent rounded-full inline-block animate-spin ${color} ${className}`}
    ></div>
  );
};

export default LoadingSpin;
