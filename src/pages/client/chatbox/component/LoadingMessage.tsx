const LoadingMessage = () => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 p-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-3 justify-end">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse ml-auto" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;
