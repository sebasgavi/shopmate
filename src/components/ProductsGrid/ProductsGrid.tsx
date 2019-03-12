import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './ProductsGrid.scss';
import ProductThumb from '../ProductThumb/ProductThumb';
import api from '../../utils/api';

// is not a state because it should not change
const maxPages = 5;

let initialState: {
  list: null|any[],
  count: null|number,
  pages: null|any[],
} = {
  list: null,
  count: null,
  pages: null,
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
    setProducts({ list: null, count: null, pages: null });
    api.getProducts(page, perPage).then((result) => {
      console.log(result);
      let pages: any = Array(Math.floor(result.count / perPage)).fill(0);
      setProducts({
        list: result.rows,
        count: result.count,
        pages,
      });
    });
  }

  return (
    <div className="ProductsGrid">
      <div className="Filters">
        <header className="Filters__header">
          {products.count && <h2>Filter {products.count} items</h2>}
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

      <footer className="ProductsGrid__pagination">
        {products.pages && products.pages.map((_, i) => {
          if(i <= 5){
            return <Link key={i} to={`${match.path}?page=${i+1}`}>{i+1}</Link>
          }
        })}
      </footer>
    </div>
  );
}

export default ProductsGrid;
