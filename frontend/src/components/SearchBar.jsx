import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import IconMagnifyingGlass from './IconMagnifyingGlass';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate()

  const debounceTimeout =useRef(null)

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const trimmedSearch = newSearchTerm.trim().toLowerCase();

    clearTimeout(debounceTimeout.current); // Clear the previous timeout
    
    debounceTimeout.current = setTimeout(() => {
      if (trimmedSearch) {
        navigate(`/search/${trimmedSearch}`)
      } else {
        navigate('/')
      }
    },500)
     
  };



  return (
    <main className='search-bar-wrapper'>
 
      <div className="form-group">
        <input type="text"  value={searchTerm} placeholder='Search products...' onChange={handleSearch} />
        <IconMagnifyingGlass />
        </div>

    </main>
  )
}

export default SearchBar