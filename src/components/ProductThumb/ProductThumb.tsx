import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './ProductThumb.scss';

interface ProductThumbProps {
  name: string;
  price: string;
  discounted?: string;
  image: string;
  id: number;
}

const ProductThumb = function({ name, price, discounted, image, id }: ProductThumbProps) {
  
  // Fail safe to not show discount if the price is 0, must be an error.
  if(discounted && parseFloat(discounted) > 0) discounted = '';

  return (
    <div className={`ProductThumb ${discounted ? 'ProductThumb--discounted' : ''}`}>
      <div className="ProductThumb__front">
        <h2 className="ProductThumb__title">{name}</h2>
        <img className="ProductThumb__image" src={image} />
        <p className="ProductThumb__price">
          <span>From £{price}</span>
          {discounted && <span>From £{discounted}</span>}
        </p>
      </div>
      <div className="ProductThumb__back">
        <h2 className="ProductThumb__title">{name}</h2>
        <p className="ProductThumb__price">
          <span>From £{price}</span>
          {discounted && <span>From £{discounted}</span>}
        </p>
        <Link className="Button" to="/store/gadasd">Quick view</Link>
      </div>
    </div>
  );
}

export default ProductThumb;
