import { useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import { Link } from 'react-router-dom';
import ArrowUp from './ArrowUp';

const UserDropdownMenu = ({ userInfo, setShowUserMenu, setBorder }) => {
  const dispatch = useDispatch();

  const handleShowUserMenu = () => {
    setTimeout(() => {
      setShowUserMenu(false)
    },150)
    setTimeout(() => {
      setBorder(false)
    },250)
  }
  return (
    <div className="user-dropdown-menu-wrapper" onMouseLeave={handleShowUserMenu}>
      <ArrowUp />
      <ul className='user-dropdown-menu'>
        <li onClick={() => dispatch(logout())}>Logout</li>
        <li><Link to={`/user/account/${userInfo._id}`}>Your Account</Link></li>
        <li><Link to='/user/account/orderhistory'>Your Orders</Link></li>
        <li><Link to='/user/profile/:id'>Your Recommendations</Link></li>
      </ul>
    </div>
  )
};

export default UserDropdownMenu