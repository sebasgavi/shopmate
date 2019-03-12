import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './ProductsGrid.scss';
import ProductThumb from '../ProductThumb/ProductThumb';
import api from '../../utils/api';
import Pagination from '../Pagination/Pagination';

let initialState: {
  list: null|any[],
  count: null|number,
} = {
  list: null,
  count: null,
}

const ProductsGrid = function({ match, location }: any) {
  let searchParams = new URLSearchParams(location.search);
  let tempPage = parseInt(searchParams.get('page') || '1');

  const [ fetching, setFetching ] = useState(true);
  const [ page, setPage ] = useState(tempPage <= 0 ? 1 : tempPage);
  const [ perPage, setPerPage ] = useState(7);
  const [ products, setProducts ] = useState(initialState);

  if(tempPage != page) {
    setPage(tempPage);
    setFetching(true);
  }

  if(fetching){
    setFetching(false);
    setProducts({ list: null, count: null });
    api.getProducts(page, perPage).then((result) => {
      setProducts({
        list: result.rows,
        count: result.count,
      });
    });
  }

  return (<>
    <div className="ProductsGrid">
      <div className="Filters">
        <header className="Filters__header">
          {products.count 
            ? <h2>Filter {products.count} items</h2>
            : <h2>Loading...</h2>}
        </header>
        <section className="Filters__content">

        </section>
        <footer className="Filters__footer">
          
        </footer>
      </div>

      {!products.list && Array(perPage).fill(0).map((_, i) => 
        <div className="ProductsGrid__item-placeholder" key={i} />
      )}

      {products.list && products.list.map(({ product_id, name, price, discounted_price, thumbnail }) => 
        <ProductThumb
          key={product_id}
          id={product_id}
          name={name}
          price={price}
          discounted={discounted_price}
          image={thumbnail} />)}
    </div>
    
    <Pagination max={5} count={products.count} perPage={perPage} path={match.path} current={page} />
  </>);
}

export default ProductsGrid;
