import React, { useState, useEffect } from 'react';

import './ProductDetails.scss';
import api from '../../utils/api';

const ProductDetails = function({ match, location }: any) {
  
  const [ info, setInfo ]: any = useState(null);
  const [ isHoverImage, setHoverImage ] = useState(false);
  
  // get product info
  useEffect(() => {
    api.getProduct(match.params.id)
      .then(product => setInfo(product));
  }, []);
  
  if(!info) return <h1>Loading product...</h1>;

  return (<div className={`ProductDetails ${info.discounted_price ? 'ProductDetails--discounted' : ''}`}>
    <h1>{info.name}</h1>

    <div className="ProductDetails__content">
      <div className="ProductDetails__image"
        style={{ backgroundImage: `url(${isHoverImage && info.image_2 ? info.image_2 : info.image})`}}
        onMouseOver={() => setHoverImage(true)}
        onMouseOut={() => setHoverImage(false)}></div>
      <div className="ProductDetails__description">
        <p>{info.description}</p>

        <h3 className="ProductDetails__price-title">Price:</h3>
        <p className="ProductDetails__price">
          <span>From £{info.price}</span>
          {info.discounted_price && <span>From £{info.discounted_price}</span>}
        </p>
      </div>
    </div>
  </div>);
}

export default ProductDetails;
