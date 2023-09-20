import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

const Breadcrumbs = ({productDetails, checkout, payment, orderConfirmation}) => {
  const { productDetail, colorVersion } = useSelector(state => state.product);
  return (
    <div className="container breadcrumbs-wrapper">
      
      {
        productDetails ? (
          <Link to={`/product/${productDetail._id}/${colorVersion}`}>Product Details</Link>
        ) : (
          <Link className='disabled'>Product Details</Link>
        )
      }
      {
        checkout ? (<Link to='/user/checkout'>Cart</Link>) : (<Link className='disabled'>Cart</Link>)
      }
      {
        payment ? (<Link to='/order/payment'>Payment</Link>) : (<Link className='disabled'>Payment</Link>)
      }
      {
        orderConfirmation ? (<Link to='/order/orderconfirmation'>Order Confirmation</Link>) : (<Link className='disabled'>Order Confirmation</Link>)
      }
  
    </div>
  )
}

export default Breadcrumbs