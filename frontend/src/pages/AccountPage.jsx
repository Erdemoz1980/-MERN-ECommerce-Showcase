import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AccountCard from '../components/AccountCard';
import IconProfile from '../components/IconProfile';
import IconShoppingCart from '../components/IconShoppingCart';
import IconLogin from '../components/IconLogin';

const AccountPage = () => {
  const { userInfo } = useSelector(state => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate]);


  const accountCardsData = [
    {
      id: 10001,
      title: 'Your Orders',
      desc: 'View your order details, track, return or cancel an order',
      to: '/user/account/orderhistory',
      icon:<IconShoppingCart />
    },
    {
      id: 10002,
      title: 'Login & Security',
      desc: 'Manage password',
      to: '/user/account/changepassword',
      icon: <IconLogin />
    },
    {
      id: 10003,
      title: 'Your Profile',
      desc: 'Edit your profile and address',
      to: '/user/account/editaddress/',
      icon: <IconProfile />
    }
  ]

  return (
    <main className='container account-page-wrapper'>
      <h1>Your Account</h1>
      <div className="account-page">
        {
          accountCardsData.map(item => (
            <AccountCard key={item.id} {...item} />
          ))
        }
      </div>
    </main>
  )
}

export default AccountPage 