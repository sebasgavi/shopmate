import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBasket, Close } from '@material-ui/icons';

import './ProductsGrid.scss';
import ProductThumb from '../ProductThumb/ProductThumb';
import api from '../../utils/api';
import Pagination from '../Pagination/Pagination';
import Filters from '../Filters/Filters';

const initialProducts: {
  list: null|any[],
  count: null|number,
} = {
  list: null,
  count: null,
}
const productsPerPage = 7;

const ProductsGrid = function({ match, location, history }: any) {

  let searchParams = new URLSearchParams(location.search);
  let page = parseInt(searchParams.get('page') || '1');
  const selectedDepartment = match.params.department;
  console.log(history);
  
  const [ fetching, setFetching ] = useState(true);
  const [ products, setProducts ] = useState(initialProducts);
  const [ categories, setCategories ]: any = useState(null);
  const [ departments, setDepartments ]: any = useState(null);
  const scrollTopRef = useRef(null);

  // scroll top and re-fetch products when the match parameters change
  const onNavigationClick = () => {
    let elem: any = scrollTopRef.current;
    if(elem) elem.scrollIntoView();
    setFetching(true);
  }

  if(fetching){
    setFetching(false);
    setProducts({ list: null, count: null });
    api.getProducts(page, productsPerPage).then((result) => {
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
        categories={categories}
        selectedDepartment={selectedDepartment} />

      {!products.list && Array(productsPerPage).fill(0).map((_, i) => 
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
    
    {products.count && <Pagination max={5} 
      count={products.count} 
      perPage={productsPerPage} 
      path={location.pathname} 
      current={page} 
      onClick={onNavigationClick} />}
  </>);
}

export default ProductsGrid;
