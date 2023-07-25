import { useState} from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ _id, company, name, category, gender, price, colors, imagesMain, discount }) => {
  const [colorVersion, setColorVersion] = useState(0);

  return (
    <div className="product-card-wrapper">
      <div className="product-card-img-wrapper">
        <Link to={`/product/${_id}/${colorVersion}`}>
          <img src={colors.length > 1 ? (imagesMain?.[colorVersion]?.images[0]) : (imagesMain?.[0].images[0])} alt="card hero" />
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
            <div key={index} className='color-thumbnail-wrapper' onClick={() => setColorVersion(index)} >
              <img src={imagesMain[index].images[0]} alt='color version' />
            </div>
          ))}
        </div>
        <div className="price-wrapper">
          <h2 className='product-price text-dark text-small'>${`${discount ? (price - (price * (discount / 100))).toFixed(2) : price}`}{discount && <span className='discount-tab'>{discount}%</span>}</h2>
          {discount && <small className='original-price text-light'>${price}</small>}
        </div>
      </div>
    </div>
  )
};

export default ProductCard