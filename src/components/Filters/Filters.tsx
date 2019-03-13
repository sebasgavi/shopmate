import React from 'react';

import './Filters.scss';
import { Link } from 'react-router-dom';

const Filters = ({ products, departments, categories}) => {
  return (<div className="Filters">
    <header className="Filters__header">
      {products.count 
        ? <h2>Filter {products.count} items</h2>
        : <h2>Loading...</h2>}
    </header>

    <section className="Filters__content">
      <h3>Departments</h3>
      <div className="ButtonsList">
        {departments && departments.map(dep => (<Link 
          key={dep.department_id}
          to={`/store/${dep.name}`}
          className="Button Button--rect">
          {dep.name}
        </Link>))}
        <Link to="/store" className="Button Button--rect">All</Link>
      </div>

      <h3>Categories</h3>
      {categories && categories.map(cat => (<button 
        key={cat.category_id}
        className="Button Button--rect">
        {cat.name}
      </button>))}
    </section>

    <footer className="Filters__footer">
      
    </footer>
  </div>);
}

export default Filters;