import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './ProductsGrid.scss';
import ProductThumb from '../ProductThumb/ProductThumb';
import api from '../../utils/api';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';

let initialProducts: {
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
  const [ products, setProducts ] = useState(initialProducts);
  const [ categories, setCategories ]: any = useState(null);
  const [ departments, setDepartments ]: any = useState(null);
  const scrollTopRef = useRef(null);

  const onPaginationClick = () => {
    let elem: any = scrollTopRef.current;
    if(elem) elem.scrollIntoView();
  }

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

    if(!categories){
      api.getCategories().then((result) => {
        setCategories(result.rows);
        console.log(result.rows)
      });
    }

    if(!departments){
      api.getDepartments().then((results) => {
        setDepartments(results);
        console.log(results);
      });
    }
  }

  return (<>
    <div className="ProductsGrid" ref={scrollTopRef}>
      <Filters
        products={products}
        departments={departments}
        categories={categories} />

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
    
    {products.count && <Pagination max={5} count={products.count} perPage={perPage} path={match.path} current={page} onClick={onPaginationClick} />}
  </>);
}

export default ProductsGrid;
