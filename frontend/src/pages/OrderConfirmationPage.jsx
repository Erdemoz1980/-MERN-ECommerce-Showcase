import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderListReset } from '../slices/orderSlice';
import Breadcrumbs from '../components/Breadcrumbs';



const OrderConfirmationPage = () => {
  const { isLoading, isSuccess, order } = useSelector(state => state.orderInfo);

  const { _id, orderItems,  paymentType, createdAt, subTotal, shippingPrice, taxPrice, totalPrice,
    shippingAddress: { streetNo, streetName, postalCode, province, country } = {} } = order || {};

  const { userInfo } = useSelector(state => state.user)

  const {name, lastName} = userInfo || {}
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!order || !userInfo) {
      navigate('/')
    }

    return () => {
     dispatch(orderListReset())
   }
  
  }, [navigate, order, dispatch, userInfo])
    
  return (
    <main>
      <Breadcrumbs  orderConfirmation={true} /> 
      <section className='container order-confirmation-page-wrapper'>
      <header className='container order-confirmation-header'>Thank you for your order!</header>
      <main className="order-confirmation-wrapper container">
        <section className="order-confirmation-details-wrapper">
          <h3>Details</h3>
        <div className="confirmation-details-box">
          <div className="confirmation-row">
            <h4>Order Status:</h4>
            <h4>Successful</h4>
          </div>
          <div className="confirmation-row">
            <h4>Order ID:</h4>
            <h4>{_id && _id}</h4>
            </div>
             <div className="confirmation-row">
            <h4>Payment Method</h4>
            <h4>{paymentType==='credit-card' ? 'Credit Card' : 'Pay Pal'}</h4>
          </div>
          <div className="confirmation-row">
            <h4>Order Date:</h4>
            <h4>{createdAt && createdAt.slice(0,10)}</h4>
          </div>
          <div className="confirmation-row">
            <h4>Subtotal</h4>
            <h4>${subTotal && subTotal.toFixed(2)}</h4>
          </div>
          <div className="confirmation-row">
            <h4>Shipping fee:</h4>
              <h4>{shippingPrice && shippingPrice > 0 ? `$${shippingPrice}` : 'Free'}</h4>
          </div>
          <div className="confirmation-row">
            <h4>HST:</h4>
            <h4>${taxPrice && taxPrice.toFixed(2)}</h4>
            </div>
          <div className="confirmation-row">
            <h4>Total</h4>
            <h4>${totalPrice && totalPrice.toFixed(2)}</h4>
          </div>
          
          </div>
        </section>
        <div className="order-confirmation-items-summary-wrapper">
          <h3>Items in order</h3>
          {
            orderItems?.map(item => (
              <section key={item._id}>
                <div className="order-item-confirmation-details-wrapper">
                <div className='order-item-confirmation-image-wrapper'>
                  <img src={item.img} alt='order item' />
                  </div>
                  <ul className='order-item-confirmation-name-wrapper'>
                    <li>{item.name}</li>
                    <li>Size US:{item.size}</li>
                    <li>Color: {item.colorVersion}</li>
                    <li>Qty: {item.qty}</li>
                    <li>Price: ${item.price.toFixed(2)}</li>
                  </ul>
                  </div>
              </section>
            ))
         }
        </div>
      </main>
      <div className="delivery-info-wrapper">
          <h4>Delivery Address:</h4>
          <div>
            <p>{name && name} {lastName && lastName}</p>
            <p>{streetNo && streetNo} {streetName && streetName} {postalCode && postalCode}, {province && province}, {country && country}</p>
          </div>
        </div>
        </section>
    </main>
  )
}

export default OrderConfirmationPage