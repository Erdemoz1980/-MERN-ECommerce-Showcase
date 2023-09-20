import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const ConditionalSearchBar = () => {
  const location = useLocation()

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }


  return <SearchBar />



}

export default ConditionalSearchBar