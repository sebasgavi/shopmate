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
  const selectedCategory = match.params.category;
  
  const [ products, setProducts ] = useState(initialProducts);
  const [ categories, setCategories ]: any = useState(null);
  const [ departments, setDepartments ]: any = useState(null);
  const scrollTopRef = useRef(null);

  // get categories and departments only once
  useEffect(() => {
    api.getDepartments().then((results) => {
      setDepartments(results);
    });
    api.getCategories().then((result) => {
      setCategories(result.rows);
    });
  }, []);

  // re-fetch products when match params change
  useEffect(() => {
    // wait for departments and categories to fetch products
    if(!departments || !categories) return;
    
    // scroll top when the parameters change
    let elem: any = scrollTopRef.current;
    if(products.count && elem) elem.scrollIntoView();
    
    let dep = departments.find(({ name }) => name === selectedDepartment);
    let cat = categories.find(({ name }) => name === selectedCategory);
    
    setProducts({ list: null, count: null });
    api.getProducts(page, productsPerPage, dep && dep.department_id, cat && cat.category_id).then((result) => {
      setProducts({
        list: result.rows,
        count: result.count,
      });
    });

  }, [departments, categories, page, selectedDepartment, selectedCategory]);  

  return (<>
    <div className="ProductsGrid" ref={scrollTopRef}>
      <Filters
        products={products}
        departments={departments}
        categories={categories}
        selectedDepartment={selectedDepartment}
        selectedCategory={selectedCategory} />

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
