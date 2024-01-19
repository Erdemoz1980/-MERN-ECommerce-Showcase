import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setCartIsOpen } from '../slices/cartSlice';
import logo from '../images/logo.svg';
import cartIcon from '../images/icon-cart.svg';
import IconMenu from '../components/IconMenu';
import ShoppingCart from './ShoppingCart';
import UserDropdownMenu from './UserDropdownMenu';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [border, setBorder] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { cartItems, isCartOpen } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.user)
  const cartItemsQty = cartItems.reduce((acc, item) => acc + item.qty, 0)
  
  const location = useLocation()
  const keyword = location.search.split('=')[1]
  const dispatch = useDispatch()

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
  })

  const handleShowUserMenu = () => {
    setTimeout(() => {
      setShowUserMenu(true)
    }, 250)
    setTimeout(() => {
      setBorder(true)
    }, 150)
  }
 
  const navItems = [
    { id: 101, to: '/?=men', label: 'Men' },
    { id: 102, to: '/?=women', label: 'Women' },
    { id: 103, to: '/about', label: 'About' },
    { id: 104, to: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="container navbar-wrapper">
      <MobileMenu navItems={navItems} keyword={keyword} location={location} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="navbar-brand">
        <div className="mobile-menu-icon-wrapper" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} >
          <IconMenu />
        </div>
        <div className="logo-wrapper">
          <Link to='/'>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="navbar-menu">
          {
            navItems.map(item => (
              <li key={item.id}><Link className={`${keyword && keyword === item.label.toLowerCase() ? 'current-nav' : (location.pathname === item.to ? 'current-nav' : '')}`}
                to={`${item.to}`}>{item.label}</Link></li>
            ))
          }
        </ul>
      </div>
      <div className="navbar-user">
        {isCartOpen && <ShoppingCart />}
        <div className="cart-icon-wrapper">
          <button className="btn" onClick={() => dispatch(setCartIsOpen(!isCartOpen))}>
            <img src={cartIcon} alt='cart' />
            {cartItems.length > 0 && <div className='cart-qty-display'>{cartItemsQty}</div>}
          </button>
        </div>
        <div className="login-info-wrapper">
          {userInfo ? (
            <div className={`user-profile-wrapper ${border && 'border'}`} onMouseEnter={handleShowUserMenu} >
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