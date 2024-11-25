const LoadingPage = () => {
  return (
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
      <div
        style={{
          maxWidth: '800px',
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/loading-page.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default LoadingPage;
