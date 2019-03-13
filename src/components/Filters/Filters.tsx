import React from 'react';

import './Filters.scss';
import { Link } from 'react-router-dom';

const Filters = ({ products, departments, categories, selectedDepartment, selectedCategory }) => {

  let dep = departments && departments.find((dep) => dep.name === selectedDepartment);
  let visibleCategories = !dep || !categories ? null : categories.filter(cat => cat.department_id === dep.department_id);

  return (<div className="Filters">
    <header className="Filters__header">
      {products.count 
        ? <h2>Filter {products.count} items</h2>
        : <h2>Loading...</h2>}
    </header>

    <section className="Filters__content">
      {departments && <>
        <h3>Departments</h3>
        <div className="ButtonsList">
          <Link to="/store" className={`Button Button--rect ${selectedDepartment ? 'Button--light' : ''}`}>All</Link>
          {departments.map(dep => (<Link 
            key={dep.department_id}
            to={`/store/${dep.name}`}
            className={`Button Button--rect ${selectedDepartment !== dep.name ? 'Button--light' : ''}`}>
            {dep.name}
          </Link>))}
        </div>
      </>}

      {visibleCategories && <>
        <h3>Categories</h3>
        <div className="ButtonsList">
          <Link to={`/store/${selectedDepartment}`} className={`Button Button--rect ${selectedCategory ? 'Button--light' : ''}`}>All</Link>
          {visibleCategories.map(cat => (<Link 
            key={cat.category_id}
            to={`/store/${selectedDepartment}/${cat.name}`}
            className={`Button Button--rect ${selectedCategory !== cat.name ? 'Button--light' : ''}`}>
            {cat.name}
          </Link>))}
        </div>
      </>}
    </section>

    <footer className="Filters__footer">
      
    </footer>
  </div>);
}

export default Filters;