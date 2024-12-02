const LoadingPage = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <div
        style={{
          width: '100%',
          height: '90vh',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
