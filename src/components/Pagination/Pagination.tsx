import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Pagination.scss';

const Pagination = ({ count, perPage, path, current, max }) => {
  if(!count) return null;

  const items: any[] = [];
  const total = Math.floor(count / perPage);
  const side = Math.floor(max / 2);
  let left = current - side < 1 ? 1 : current - side;
  let right = left + max;

  if(left + max > total){
    right = total + 1;
    left = right - max;
  }

  for(let i = left; i < right; i++){
    items.push(i);
  }

  return (<footer className="Pagination">
    {items.map((p) => {
      return typeof p === 'number' 
        ? <Link key={p} className={`Pagination__item ${current === p ? 'active' : ''}`} to={`${path}?page=${p}`}>{p}</Link>
        : <span key={p} className="Pagination__item">...</span>;
    })}
  </footer>);
}

export default Pagination;