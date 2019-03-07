import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './Navbar.css';
import SearchInput from './SearchInput';

const Navbar = function(props: {}) {
  return (
    <nav className="Navbar">
      
      <a href="/" className="Navbar__logo">
        SHOPMATE
      </a>

      <ul className="Navbar__links">
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/men">Men</Link></li>
        <li><Link to="/kids">Kids</Link></li>
        <li><Link to="/shoes">Shoes</Link></li>
        <li><Link to="/brands">Brands</Link></li>
      </ul>

      <div className="Navbar__search">
        <SearchInput />
      </div>

      <Link className="Navbar__cart" to="/cart">
        <ShoppingBasket />
      </Link>
      
    </nav>
  );
}

export default Navbar;
