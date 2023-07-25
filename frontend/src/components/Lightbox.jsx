import IconPrevious from './IconPrevious';
import IconNext from './IconNext';
import IconClose from './IconClose';

const Lightbox = ({ imagesMain, imageThumbnails, lightboxIsOpen, setLightboxIsOpen, activeImage, setActiveImage, colors, colorVersion }) => {
  
  const imagesLength = colors.length > 1 ? imagesMain[colorVersion].images.length : imagesMain[0].images.length;
  
  const navigateLightbox = {
    nextImage: () => {
      setActiveImage((activeImage + 1) % imagesLength)
    },
    prevImage: () => {
      setActiveImage((activeImage - 1 + imagesLength) % imagesLength)
    }
  }

  return (
    <div className={`lightbox-overlay ${lightboxIsOpen ? 'lightbox-open' : ''}`}>
      <div className="lightbox-img-wrapper">
        <img src={colors.length > 0 ? (imagesMain && imagesMain[colorVersion].images[activeImage]) : (imagesMain[0].images[activeImage])} alt="active" />
        <div className="icon-prev-wrapper" onClick={navigateLightbox.prevImage}>
          <IconPrevious />
        </div>
        <div className="icon-next-wrapper" onClick={navigateLightbox.nextImage}>
          <IconNext />
        </div>
        <div className="icon-close-wrapper" onClick={() => setLightboxIsOpen(false)}>
          <IconClose />
        </div>
        <div className="lightbox-thumbnails-wrapper">
          {
            colors.length > 0 ? imageThumbnails[colorVersion].images.map((item, index) => (
              <div key={index} className={`lightbox-thumbnail-wrapper ${activeImage === index ? 'active' : ''}`} onClick={() => setActiveImage(index)}>
                <img src={item} alt='thumbnail' />
              </div>
            )) : (imageThumbnails[0].images.map((item, index) => (
              <div key={index} className={`lightbox-thumbnail-wrapper ${activeImage === index ? 'active' : ''}`} onClick={() => setActiveImage(index)}>
                <img src={item} alt='thumbnail' />
              </div>
            )))
          }
        </div>
      </div>
    </div>
  )
};

export default Lightbox