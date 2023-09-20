import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrderList, orderListReset } from '../slices/orderSlice';
import OrderHistoryCard from '../components/OrderHistoryCard';
import Loader from '../components/Loader';

const OrderHistoryPage = () => {
  const [sortingData, setSortingData] = useState({
    option: 'Date',
    direction: 'desc',
  });
  const { option, direction} = sortingData;
  const { userInfo } = useSelector(state => state.user);
  const { isLoading, isSuccess, orderList } = useSelector(state => state.orderInfo);
  const [sortedOrderList, setSortedOrderList] = useState(orderList);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      dispatch(getOrderList(userInfo._id))
    }
    //Ensure that we are always fetching latest up-to-date version of order history from database
    return () => {
      dispatch(orderListReset())
    }
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    const sortOptions = {
      Date: (a, b) => a.createdAt.localeCompare(b.createdAt),
      Total: (a, b) => a.totalPrice - b.totalPrice,
      NumberOfItems: (a, b) => a.orderItems.length - b.orderItems.length,
      sortDirections: {
        asc: (a, b) => sortOptions[option](a, b),
        desc: (a, b) => sortOptions[option](b, a)
      },
    };
        
    if (orderList?.length > 0) {
       //Spread orderList directly, rather than 'prevList' to eliminate complexity and ensure orderList is always populated when we spread
      setSortedOrderList(() => {
        return [...orderList].sort(sortOptions.sortDirections[direction]);
      });
    }
  },[direction, option, orderList]);
  
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSortingData(prevState => ({
      ...prevState,
      [name.split('.')[1]]: value
    }))
  };

  //Separating rendering logic from data.
  const radioButtons = [{ id:1000 , name:'radio.option', value: 'Date' }, {id:1001, name:'radio.option',  value: 'Total' }, { id:1002, name:'radio.option',  value: 'NumberOfItems' }]

  return (
    <div className="container order-history-page-wrapper">
      <h1>Order History</h1>
      <section className="sort-container">
        <p>Sort Orders</p>
        <div className="filter-options-wrapper">
          {
            radioButtons.map(item => (
              <div key={item.id}  className="filter-options-form-group">
                <label htmlFor={item.value}>{item.value}</label>
                <input checked={item.value === option} type="radio" name={item.name} id={item.value} value={item.value}
                  onChange={onChangeHandler} />
              </div>
            ))
          }
        </div>
        <div className="sort-wrapper">
          <select name="select.direction" defaultValue={direction} onChange={onChangeHandler}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
          </select>
        </div>
      </section>
      {
        isLoading ? <Loader /> : (isSuccess && orderList.length === 0)
          ? <h3>No orders found </h3>
          : (
          sortedOrderList?.map(order => (
            <OrderHistoryCard key={order._id} {...order} />
          ))
        )
      }
    </div>
  )
};

export default OrderHistoryPage