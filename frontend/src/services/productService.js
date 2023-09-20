const API_URL_HEROKU = 'https://erdemoz-io-659240e6c6f7.herokuapp.com/api/products'
const API_URL_LOCAL = 'http://localhost:8000/api/products'

//Get Product List
const getProducts = async (searchTerm='') => {

  const response = await fetch(`${API_URL_HEROKU}/?searchterm=${searchTerm}`);
 
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.messsage)
  }

  return await response.json()
};

//Get a product detail
const getProductDetail = async (productId) => {
  const response = await fetch(`${API_URL_HEROKU}/${productId}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }
  return await response.json()
}

const productService = {
  getProducts,
  getProductDetail
}

export default productService;