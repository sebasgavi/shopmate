import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './Navbar.scss';
import SearchInput from './SearchInput';

const Navbar = function(props: {}) {

  const [ isActive, setActive ] = useState(false);

  return (
    <nav className="Navbar">
      
      <a href="/" className="Navbar__logo">
        SHOPMATE
      </a>

      <ul className={`Navbar__links ${isActive ? 'Navbar__links--narrow' : ''}`}>
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/men">Men</Link></li>
        <li><Link to="/kids">Kids</Link></li>
        <li><Link to="/shoes">Shoes</Link></li>
        <li><Link to="/brands">Brands</Link></li>
      </ul>

      <div className="Navbar__search">
        <SearchInput 
          onToggle={(val) => setActive(val)}
          isActive={isActive} />
      </div>

      <Link className="Navbar__cart" to="/cart">
        <ShoppingBasket />
      </Link>
      
    </nav>
  );
}

export default Navbar;
