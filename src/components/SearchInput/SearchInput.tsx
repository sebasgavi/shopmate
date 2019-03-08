import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './SearchInput.scss';

interface SearchInputProps { 
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

const SearchInput = function({ isActive, onToggle }: SearchInputProps) {
  return (
    <div className={`SearchInput ${isActive ? 'active' : ''}`}>
      <input 
        onFocus={() => onToggle(true)}
        onBlur={() => onToggle(false)}
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
