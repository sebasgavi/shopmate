import React, { useState, useRef, useEffect } from 'react';
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

const ProductsGrid = function({ match, location }: any) {

  let searchParams = new URLSearchParams(location.search);
  let page = parseInt(searchParams.get('page') || '1');
  const selectedDepartment = match.params.department;
  
  const [ products, setProducts ] = useState(initialProducts);
  const [ categories, setCategories ]: any = useState(null);
  const [ departments, setDepartments ]: any = useState(null);
  const scrollTopRef = useRef(null);

  // re-fetch products when match params change
  useEffect(() => {
    console.log('effect', page, selectedDepartment);

    // scroll top when the parameters change
    let elem: any = scrollTopRef.current;
    if(products.count && elem) elem.scrollIntoView();
    
    setProducts({ list: null, count: null });
    api.getProducts(page, productsPerPage).then((result) => {
      setProducts({
        list: result.rows,
        count: result.count,
      });
    });

  }, [page, selectedDepartment]);

  // get categories and departments only once
  useEffect(() => {
    api.getCategories().then((result) => {
      setCategories(result.rows);
    });
    api.getDepartments().then((results) => {
      setDepartments(results);
    });
  }, []);
  

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
      current={page} />}
  </>);
}

export default ProductsGrid;
