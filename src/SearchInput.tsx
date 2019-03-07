import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './SearchInput.css';

const SearchInput = function(props: {}) {

  const [ active, setActive ] = useState(false);

  return (
    <div className={`SearchInput ${active ? 'active' : ''}`}>
      <input 
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        type="text" placeholder="search anything"/>
      <button className="SearchInput__addon SearchInput__addon--close">
        <Close />
      </button>
      <div className="SearchInput__addon SearchInput__addon--open">
        <Search />
      </div>
    </div>
  );
}

export default SearchInput;
