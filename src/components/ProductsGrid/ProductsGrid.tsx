import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './ProductsGrid.scss';
import ProductThumb from '../ProductThumb/ProductThumb';
import api from '../../utils/api';


const ProductsGrid = function({ match }: any) {

  const [ state, setState ] = useState({
    products: [],
    productsCount: 0,
  });

  if(!state.productsCount){
    api.getProducts().then((result) => {
      console.log(result);
      setState({
        products: result.rows,
        productsCount: result.count,
      })
    });
  }

  return (
    <div className="ProductsGrid">
      <div className="Filters">
        <header className="Filters__header">
          <h2>Filter {state.productsCount} items</h2>
        </header>
        <section className="Filters__content">

        </section>
        <footer className="Filters__footer">
          
        </footer>
      </div>

      {state.products.map(({ product_id, name, price, discounted_price, thumbnail }) => 
        <ProductThumb
          key={product_id}
          id={product_id}
          name={name}
          price={price}
          discounted={discounted_price}
          image={thumbnail} />)}
    </div>
  );
}

export default ProductsGrid;
