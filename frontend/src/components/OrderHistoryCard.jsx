
const OrderHistoryCard = ({_id, createdAt, paymentType, totalPrice, orderItems }) => {

  return (
    <main className="order-history-card-wrapper">
      <div className="order-history-card">
        <section className="order-history-details-wrapper">
          <h4>Order #{_id}</h4>
          <ul>
            <li>Date: {createdAt.slice(0, 10)}</li>
            <li>Payment: {paymentType==='credit-card' ? 'Credit Card' : 'Pay Pal'}</li>
            <li>Total: ${totalPrice.toFixed(2)}</li>
          </ul>
        </section>
        <section className="order-history-items">
          <h3>{`Item${orderItems.length>1 ? 's' : ''}`} in order:</h3>
          <>
            {orderItems.map(item => (
              <div key={`${item._id}${item.colorVersion}${item.size}}`} className="order-history-row">
                <div className="order-history-image-wrapper">
                  <img src={item.img} alt="order item" />
                </div>
                <ul className='order-item-confirmation-name-wrapper'>
                    <li>{item.name}</li>
                    <li>Size US:{item.size}</li>
                    <li>Color: {item.colorVersion}</li>
                    <li>Qty: {item.qty}</li>
                    <li>Price: ${item.price.toFixed(2)}</li>
                  </ul>
              </div>
            ))
              
            }
          </>
        </section>
      </div>
     


    </main>
  )
};

export default OrderHistoryCard