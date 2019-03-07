import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './SearchInput.css';

const SearchInput = function(props: {}) {
  return (
    <div className="SearchInput">
      <input type="text" placeholder="search anything"/>
      <button className="SearchInput__close">
        <Close />
      </button>
      <button className="SearchInput__open">
        <Search />
      </button>
    </div>
  );
}

export default SearchInput;
