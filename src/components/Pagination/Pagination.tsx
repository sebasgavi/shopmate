import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Pagination.scss';

interface PaginationProps { 
  count: number;
  perPage: number;
  path: string;
  current: number;
  max: number;
}

const Pagination = ({ count, perPage, path, current, max }: PaginationProps) => {
  const items: any[] = [];
  const total = Math.ceil(count / perPage);
  const side = Math.floor(total > max ? max : total / 2);
  let left = current - side < 1 ? 1 : current - side;
  let right = left + total > max ? max : total;

  // if right side is going beyond max, fix range
  if(total > max && left + max > total){
    right = total + 1;
    left = right - max;
  }

  // populate items array
  for(let i = left; i < right; i++){
    items.push(i);
  }

  // left side abbreviation dots and first page
  if(left >= 3) items.unshift(left == 3 ? 2 : 'left');
  if(left != 1) items.unshift(1);

  // right side abbreviation dots and last page
  if(right - 1 <= total - 2) items.push(right - 1 == total - 2 ? total - 1 : 'right');
  if(right - 1 != total) items.push(total);

  return (<footer className="Pagination">
    {items.map((p) => {
      let c = `Pagination__item ${current === p ? 'active' : ''}`;
      return typeof p === 'number' 
        ? <Link key={p} className={c} 
            to={`${path}?page=${p}`}>{p}</Link>
        : <span key={p} className={c}>...</span>;
    })}
  </footer>);
}

export default Pagination;