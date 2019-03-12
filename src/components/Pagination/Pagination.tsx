import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Pagination.scss';

interface PaginationProps { 
  count: number;
  perPage: number;
  path: string;
  current: number;
  max: number; 
  onClick?: (page) => void;
}

const Pagination = ({ count, perPage, path, current, max, onClick }: PaginationProps) => {
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
      let c = `Pagination__item ${current === p ? 'active' : ''}`;
      return typeof p === 'number' 
        ? <Link key={p} className={c} 
            to={`${path}?page=${p}`}
            onClick={onClick}>{p}</Link>
        : <span key={p} className={c}>...</span>;
    })}
  </footer>);
}

export default Pagination;