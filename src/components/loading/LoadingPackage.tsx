const LoadingPackage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-md shadow-lg overflow-hidden border-2 border-white bg-gray-200 animate-pulse"
          >
            <div className="h-52 bg-gray-300" />
            <div className="py-7 px-5 flex flex-col gap-4">
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-6 bg-gray-300 rounded mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LoadingPackage;
