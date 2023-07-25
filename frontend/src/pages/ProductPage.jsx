import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [alert, setAlert] = useState('');

  const location = useLocation();
  const keyword = location.search.split('=')[1]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://erdemoz-io-659240e6c6f7.herokuapp.com/api/products');
        const data = await response.json();
       
        //Filter products based on category keyword if it exists
        let filteredProducts = data;
        if (keyword) {
          filteredProducts = data.filter(product => {
            return (
              product.company === keyword ||
              product.gender === keyword ||
              product.category === keyword
            )
          })
        }

        setProducts(filteredProducts)
    
      } catch (error) {
        setAlert(error);
      }
    };
  
    fetchData();
  }, [keyword]);
  
  
  return (
    <div className='product-page-wrapper'>
      {
        alert ? <div className="temp">Please check your connection...</div>: products.map(product => (
          <ProductCard key={product._id} {...product} />
        ))
      }
    </div>
  )
};

export default ProductPage