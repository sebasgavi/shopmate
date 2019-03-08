import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './ProductThumb.scss';

interface ProductThumbProps {
  name: string;
  price: number;
  image: string;
  id: number;
}

const ProductThumb = function({ name, price, image, id }: ProductThumbProps) {
  return (
    <div className="ProductThumb">
      <div className="ProductThumb__front">
        <h2 className="ProductThumb__title">{name}</h2>
        <img className="ProductThumb__image" src={image} />
        <p className="ProductThumb__price">From £{price}</p>
      </div>
      <div className="ProductThumb__back">
        <h2 className="ProductThumb__title">{name}</h2>
        <p className="ProductThumb__price">From £{price}</p>
        <Link className="Button" to="/store/gadasd">Quick view</Link>
      </div>
    </div>
  );
}

export default ProductThumb;
