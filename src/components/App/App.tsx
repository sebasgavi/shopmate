import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import Navbar from '../Navbar/Navbar';
import api from '../../utils/api';
import ProductThumb from '../ProductThumb/ProductThumb';

class App extends Component {

  state = {
    products: [],
    productsCount: null,
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
    api.getProducts().then((result) => {
      this.setState({
        products: result.rows,
        productsCount: result.count,
      })
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Navbar />

          <div className="App__container">
            <div className="ProductsGrid">
              <div className="ProductsGrid__filters">

              </div>

              {this.state.products.map(({ product_id, name, price, thumbnail }) => 
                <ProductThumb
                  key={product_id}
                  id={product_id}
                  name={name}
                  price={price}
                  image={thumbnail} />)}
            </div>
          </div>

          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
