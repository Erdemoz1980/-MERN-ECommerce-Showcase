import {useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { setPathName } from '../slices/userSlice';
import ProductCard from "../components/ProductCard";
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const ProductListPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch()
  const location = useLocation()
  const keyword = location.search.split('=')[1]
  const { searchTerm } = useParams()
  const {products, isLoading, errMessage} = useSelector(state=>state.product)


  useEffect(() => {
    dispatch(searchTerm ? getProducts(searchTerm) : getProducts())
    dispatch(setPathName(location.pathname))
  
  }, [dispatch, searchTerm, location.pathname]);

  useEffect(() => {
        //Filter products based on category keyword if it exists
        let filteredProducts = products
        if (keyword) {
         filteredProducts = products.filter(product => {
            return (
              product.company === keyword ||
              product.gender === keyword ||
              product.category === keyword
            )
          })
          return setFilteredProducts(filteredProducts)
        }
        setFilteredProducts(products)   

  }, [keyword,products, dispatch]);
  
  return (
    <div className='container product-page-wrapper'>
      {
        isLoading ? <Loader /> : errMessage ? <div className="temp">{errMessage}</div> : searchTerm && filteredProducts.length < 1
          ? <Alert message='Your search returned no results!' type='error' />
          : filteredProducts.map(product => (
          <ProductCard key={product._id} {...product} />
        ))
      }
    </div>
  )
};

export default ProductListPage