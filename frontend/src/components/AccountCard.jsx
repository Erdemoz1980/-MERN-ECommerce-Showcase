import { Link } from 'react-router-dom';

const AccountCard = ({ title, desc, to }) => {

  return (
    <Link to={to}>
    <div className='account-card-wrapper'>
      
      <h3>{title}</h3>
      <p>{desc}</p>
     
      </div>
      </Link>
  )
}

export default AccountCard