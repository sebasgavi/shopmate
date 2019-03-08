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
      <img src={image} />
      <h2>{name}</h2>
    </div>
  );
}

export default ProductThumb;
