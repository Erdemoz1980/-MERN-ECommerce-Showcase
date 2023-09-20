const API_URL_HEROKU_ORDERS = 'https://erdemoz-io-659240e6c6f7.herokuapp.com/api/orders';
const API_URL_LOCAL_ORDERS = 'http://localhost:8000/api/orders'

//Create order
const createOrder = async (orderData) => {
  const response = await fetch(API_URL_HEROKU_ORDERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })

  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred. Please try again';
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const errorData = await response.json()
      errorMessage = errorData.message
    }
    throw new Error(errorMessage)
  }
  
  return await response.json();
};

//Get orderlist
const getOrderList = async (userId) => {
  const response = await fetch(`${API_URL_HEROKU_ORDERS}/${userId}`)

  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred. Please try again.'
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const errorData = await response.json()
      errorMessage = errorData.message
    }

    throw new Error(errorMessage)
  }

  return await response.json();
}

const orderService = {
  createOrder,
  getOrderList
}

export default orderService