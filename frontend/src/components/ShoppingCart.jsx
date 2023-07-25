import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeCart, deleteCartItem, setCartItems} from '../slices/cartSlice';
import useQtyChange from '../hooks/useQtyChange';
import trashIcon from '../images/icon-delete.svg';

const ShoppingCart = () => {
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQtyChange = useQtyChange(cartItems) 

  return (
    <div className='cart-wrapper'>
      <div className="card-header">
        <h3 className="cart-title">Cart</h3>
        <button className="btn" onClick={() => dispatch(closeCart())}>X</button>
      </div>
      {cartItems.length < 1 ? (
        <p className='cart-notification'>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
              <div key={`${item._id}${item.colorVersion}`} className="cart-item-details-wrapper">
                <div className="cart-item-image-wrapper">
                  <img src={item.img} alt='cart item' />
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.discount ?
                    ((item.price - (item.price * (item.discount / 100))).toFixed(2)) : item.price} x {item.qty} = <span>${item.discount ?
                    ((item.price - (item.price * (item.discount / 100))) * item.qty).toFixed(2) : (item.price * item.qty).toFixed(2)}</span></p>
                  <div className="stock-info-wrapper">
                    <p>Change</p>
                    <select name="" id="" value={item.qty} onChange={(e) => dispatch(setCartItems({...item, qty:Number(e.target.value)}))} >
                      {Array.from({ length: item.countInStock }).map((_, index) => (
                        <option key={index} value={index + 1}>{index + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              <div className="cart-trash-container">
                <button className="btn" onClick={() => dispatch(deleteCartItem({ _id:item._id, colorVersion:item.colorVersion }))}>
                <div className="cart-delete-img-container">
                <img src={trashIcon} alt='trash' />
                </div>  
                </button>
                </div>
              </div>
          ))}
          <Link to='/user/checkout'><button onClick={() => dispatch(closeCart())} className="btn btn-primary btn-block">Checkout</button></Link>
        </>
      )}
    </div>
  );
  
}

export default ShoppingCart