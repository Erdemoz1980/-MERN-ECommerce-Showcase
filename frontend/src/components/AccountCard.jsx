import { setPathName } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const AccountCard = ({ title, desc, to, icon }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  return (
    <Link to={to} onClick={()=>dispatch(setPathName(location.pathname))}>
    <div className='account-card-wrapper'>
        <header><h3>{title}</h3>{icon}</header> 
      <p>{desc}</p>
      </div>
      </Link>
  )
}

export default AccountCard