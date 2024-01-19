import { Link } from "react-router-dom";

const MobileMenu = ({ navItems, keyword, location, mobileMenuOpen, setMobileMenuOpen }) => {

  return (
    <main className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
      <div className={`mobile-menu-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className='mobile-menu'>
          <li className="close-icon-wrapper" onClick={() => setMobileMenuOpen(false)}></li>
          {navItems.map(navItem => (
            <li key={navItem.id}><Link className={`${keyword && keyword === navItem.label.toLowerCase() ? 'current-nav' : (location.pathname === navItem.to ? 'current-nav' : '')}`} to={navItem.to}>{navItem.label}</Link></li>
          ))}
        </ul>
      </div>    
    </main>
  )
};
export default MobileMenu