import { useDispatch } from 'react-redux';
import { setCartItems } from '../slices/cartSlice';

const useQtyChange = (cartItems) => {
  const dispatch = useDispatch();

  const handleQtyChange = ( itemId, newQty) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === itemId) {
        return { ...item, qty: newQty }
      } else {
        return item
      }
    });

    dispatch(setCartItems(updatedCartItems.find(item=>item._id===itemId)))
  };

  return handleQtyChange
 
}

export default useQtyChange