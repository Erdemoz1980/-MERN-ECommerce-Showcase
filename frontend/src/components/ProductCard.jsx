import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setColorVersion } from '../slices/productSlice';

const ProductCard = ({ _id, company, name, category, gender, price, colors, imagesMain, discount }) => {
  const [localColorVersion, setLocalColorVersion] = useState(0);
  const dispatch = useDispatch()


  return (
    <div className="product-card-wrapper">
      <div className="product-card-img-wrapper">
        <Link to={`/product/${_id}/${localColorVersion}`} onClick={()=>dispatch(setColorVersion(localColorVersion))} >
          <img src={colors.length > 1 ? (imagesMain?.[localColorVersion]?.images[0]) : (imagesMain?.[0].images[0])} alt="card hero" />
        </Link>
      </div>
      <div className="product-card-body">
        <Link to={`/?=${company}`}><h4 className='company-name'>{company}</h4></Link>
        <h1 className='product-name text-dark text-medium'>{name}</h1>
        <div className="card-categories">
          <Link to={`/?=${category}`}><h4 className='product-category text-small'>
            {category[0].toUpperCase() + category.substring(1)}</h4></Link>
          <Link to={`/?=${gender}`}>
            <h4 className='product-category text-small'>
              {gender[0].toUpperCase() + gender.substring(1)}
            </h4>
          </Link>
        </div>
        <div className="color-thumbnails-wrapper">
          {colors.length > 1 && colors.map((_, index) => (
            <div key={index} className='color-thumbnail-wrapper' onClick={() =>setLocalColorVersion(index)} >
              <img src={imagesMain[index].images[0]} alt='color version' />
            </div>
          ))}
        </div>
        <div className="price-wrapper">
          <h2 className='product-price text-dark text-small'>${`${discount > 0
            ? (price - (price * (discount / 100))).toFixed(2)
            : price.toFixed(2)}`}{discount > 0 && <span className='discount-tab'>{discount}%</span>}
          </h2>
          {discount > 0  && <small className='original-price text-light'>${price}</small>}
        </div>
      </div>
    </div>
  )
};

export default ProductCard