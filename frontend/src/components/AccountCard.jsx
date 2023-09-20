import { setPathName } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const AccountCard = ({ title, desc, to }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  return (
    <Link to={to} onClick={()=>dispatch(setPathName(location.pathname))}>
    <div className='account-card-wrapper'>
      <h3>{title}</h3>
      <p>{desc}</p>
      </div>
      </Link>
  )
}

export default AccountCard