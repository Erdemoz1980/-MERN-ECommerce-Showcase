import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../slices/productSlice';
import { setCartItems } from '../slices/cartSlice';
import IconCart from './IconCart';
import IconMinus from './IconMinus';
import IconPlus from './IconPlus';
import Lightbox from './Lightbox';
import Loader from './Loader';
import Alert from './Alert';
import Breadcrumbs from './Breadcrumbs';

const ProductDetail = () => {
  const [qty, setQty] = useState(0)
  const [selectedSize, setSelectedSize] = useState(false)
  const [sizeAlert, setSizeAlert] = useState('');
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
    
  const dispatch = useDispatch()
  const { productDetail, isLoading, errMessage } = useSelector(state => state.product);
  const { id, colorVersion } = useParams()

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]);

  const { company, name, sizes, description, price, countInStock, discount, colors, imageThumbnails, imagesMain } = productDetail
  
  const selectedImages = colors?.length > 0 ? imagesMain?.[colorVersion]?.images : imagesMain?.[0]?.images;
  const selectedThumbnailImages = colors?.length > 0 ? imageThumbnails?.[colorVersion]?.images : imageThumbnails?.[0]?.images;

  const selectSizeHandler = (size) => {
    setSizeAlert('')
    setSelectedSize(size)
  }

  function addToCartHandler() {
    if (!selectedSize) {
      return setSizeAlert('Please select a size')
    }
    const newItem = {
      _id: id, img: colors?.length > 0 ? imageThumbnails[colorVersion[0]]?.images[0] : imageThumbnails[0].images[0],
      name,
      price:discount > 0 ? (price - (price * (discount / 100))) : price, 
      size: selectedSize, qty, countInStock, discount, colorVersion: colors[Number(colorVersion)]
    };

    dispatch(setCartItems(newItem));
    setQty(0)
  };


  return (
    <main className='container'>
      <Breadcrumbs productDetails={{ id, colorVersion }} />
    <div className="product-details-wrapper">
   
      {lightboxIsOpen && (
        <Lightbox
          imagesMain={imagesMain}
          imageThumbnails={imageThumbnails}
          colors={colors}
          colorVersion={colorVersion}
          setLightboxIsOpen={setLightboxIsOpen}
          lightboxIsOpen={lightboxIsOpen}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
      )}
      {isLoading ? 
        <Loader /> : errMessage ? <Alert message={errMessage} type='error'/>
       : (
        <div className="product-display-wrapper">
            <div className='product-detail-image-wrapper'
              onClick={() => setLightboxIsOpen(true)}
            >
            <img src={selectedImages?.[activeImage]} alt="main product" />
          </div>
          <div className="product-thumbnails">
              {selectedThumbnailImages?.map((thumbnail, index) => (
                <div
                  key={index}
                  className={`thumbnail-wrapper ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={thumbnail} alt="thumbnail" />
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="product-info-wrapper">
        <h4 className="company-name">{company}</h4>
        <h1 className="product-name text-large text-dark">{name}</h1>
        <p className="product-description">{description}</p>
        <div className="price-wrapper">
          <h2 className="product-price text-dark">
           ${`${discount > 0 ? (price - (price * (discount / 100))).toFixed(2) : price}`}
            {discount > 0 && <span className="discount-tab">{discount}%</span>}
          </h2>
          {discount > 0 && <small className="original-price text-light">${price}</small>}
        </div>
        <div className="sizes-wrapper">
          <h4 className='size-title'>Select Size</h4>
          <div className={`sizes-inner-wrapper ${sizeAlert ? 'no-size' : ''}`}>
            {sizes?.map(size => (
              <div key={size} className={`size-card ${selectedSize===size ? 'selected' : ''}`} value={size} onClick={()=>selectSizeHandler(size)}>{size}</div>
           ))}
          </div>
          <p className={`size-alert ${sizeAlert ? 'visible' : ''}`}>{sizeAlert}</p>
          </div>
        <div className="cart-control-wrapper">
          <div className="qty-wrapper">
            <button
              className="btn btn-qty"
              disabled={qty === 0}
              onClick={() => setQty((prevState) => prevState - 1)}
            >
              <IconMinus disabled={qty === 0} />
            </button>
            <p className="qty-info">{qty}</p>
            <button
              className="btn btn-qty"
              disabled={qty >= countInStock}
              onClick={() => setQty((prevState) => prevState + 1)}
            >
              <IconPlus disabled={qty >= countInStock} />
            </button>
          </div>
          <button className="btn btn-primary" disabled={qty === 0} onClick={addToCartHandler}>
            <IconCart type="primary" />
            Add to cart
          </button>
        </div>
      </div>
      </div>
      </main>
  );
};

export default ProductDetail