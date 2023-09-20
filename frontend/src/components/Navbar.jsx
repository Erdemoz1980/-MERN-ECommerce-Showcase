import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setCartIsOpen } from '../slices/cartSlice';
import logo from '../images/logo.svg';
import cartIcon from '../images/icon-cart.svg';
import ShoppingCart from './ShoppingCart';
import UserDropdownMenu from './UserDropdownMenu';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [border, setBorder] = useState(false);
  
  const { cartItems, isCartOpen } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.user)
  const cartItemsQty = cartItems.reduce((acc, item) => acc + item.qty, 0)
  
  const location = useLocation()
  const keyword = location.search.split('=')[1]
  const dispatch = useDispatch()

  const handleShowUserMenu = () => {
    setTimeout(() => {
      setShowUserMenu(true)
    },250)
    setTimeout(() => {
      setBorder(true)
    },150)
  }
 
  const navItems = [
    { to: '/collections', label: 'Collections' },
    { to: '/?=men', label: 'Men' },
    { to: '/?=women', label: 'Women' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="navbar-wrapper container">
      <div className="navbar-brand">
        <div className="logo-wrapper">
          <Link to='/'>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="navbar-menu">
          {
            navItems.map(item => (
              <li key={item.to}><Link className={`${keyword && keyword === item.label.toLowerCase() ? 'current-nav' : (location.pathname === item.to ? 'current-nav' : '')}`}
              to={`${item.to}`}>{item.label}</Link></li>
            ))
          }
        </ul>
      </div>
      <div className="navbar-user">
      {isCartOpen && <ShoppingCart/>}
        <div className="cart-icon-wrapper">
          <button className="btn" onClick={() => dispatch(setCartIsOpen(!isCartOpen))}>
            <img src={cartIcon} alt='cart' />
            {cartItems.length > 0 && <div className='cart-qty-display'>{cartItemsQty}</div>}
          </button>
        </div>
        <div className="login-info-wrapper">
          {userInfo ? (
            <div  className={`user-profile-wrapper ${border && 'border'}`} onMouseEnter={handleShowUserMenu} >
              <h4>{userInfo?.name} {userInfo?.lastName}</h4>
              {showUserMenu && <UserDropdownMenu userInfo={userInfo} setShowUserMenu={setShowUserMenu} setBorder={setBorder} />}
            </div>) : (
              <Link to='/login'>Login</Link>
            )
          }
       </div>
      </div>
    </nav>
  )
};

export default Navbar