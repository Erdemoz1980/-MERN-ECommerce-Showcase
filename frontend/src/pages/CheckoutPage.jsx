import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCartItem, setCartItems } from '../slices/cartSlice';
import trashIcon from '../images/icon-delete.svg';

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)

  const cartTotalAmount = cartItems.reduce((acc, item) => acc + (item.price) * (item.qty), 0)
  const shippingAmount = cartTotalAmount > 150 ? 0 : 20;
  const totalTax = (13 / 100) * cartTotalAmount;
  const sumTotal = cartTotalAmount + shippingAmount + totalTax;
 

  return (
    <div className="container checkout-page-wrapper">
      <h1>Place Order</h1>
      <h2>My Cart</h2>
      <table>
        <thead>
          <tr className='checkout-header'>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length < 1 ? (
            <tr>
              <th>Your cart is empty</th>
            </tr>) : (
            <>
              {cartItems.map(item => (
                <tr className='checkout-item-row' key={`${item._id}${item.colorVersion}`}>
                  <td>
                    <Link to={`/product/${item._id}/${item.colorVersion}`}><img src={item.img} alt='cart item' /></Link>
                    <Link to={`/product/${item._id}/${item.colorVersion}`}><p>{item.name}</p></Link>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <select value={item.qty} onChange={(e) => dispatch(setCartItems({ ...item, qty: Number(e.target.value) }))}>
                      {Array.from({ length: item.countInStock }).map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </td>
                  <td>${((item.qty) * (item.price)).toFixed(2)}</td>
                  <td>
                    <button className='btn' onClick={() => dispatch(deleteCartItem({ _id: item._id, colorVersion: item.colorVersion }))}>
                      <img className='cart-item-delete' src={trashIcon} alt="trash icon" />
                    </button>
                  </td>
                </tr>
              ))}
              <div className="total-info-wrapper">
                <p>Cart Total: ${cartTotalAmount.toFixed(2)}</p>
                  <p>Shipping: <span className={`${shippingAmount===0 ? 'success' : ''}`}>{shippingAmount>0 ? `$${shippingAmount.toFixed(2)}` : 'Free Shipping' }</span></p>
                <p>Taxes: ${totalTax.toFixed(2)}</p>
                  <p>Total: <span>${sumTotal.toFixed(2)}</span> </p>
                  <Link to='/order/payment'><button className='btn btn-medium' >Checkout</button></Link>
              </div>
            </>
          )}
         
        </tbody>
      </table>

      
   
    </div>
           
  )
};

export default CheckoutPage