import { useEffect, useState } from 'react';
import LightBoxImage from 'lightbox-react';
import 'lightbox-react/style.css';

interface LightBoxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}

const LightBox = ({ images, currentIndex, onClose }: LightBoxProps) => {
  const [photoIndex, setPhotoIndex] = useState(currentIndex);
  useEffect(() => {
    setPhotoIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className="lightbox">
      <LightBoxImage
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={onClose}
        onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
      />
    </div>
  );
};

export default LightBox;
