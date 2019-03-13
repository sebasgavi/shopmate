import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './App.scss';
import Navbar from '../Navbar/Navbar';
import ProductsGrid from '../ProductsGrid/ProductsGrid';
import ProductDetails from '../ProductDetails/ProductDetails';

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Navbar />

          <div className="App__container">
            
            <Switch>

              <Route path="/" exact render={() => <div>
                <h1>Home</h1>
                <p>This page is empty, please go to the <Link to="/store">store</Link></p>
              </div>} />

              <Route path="/store/product/:id" component={ProductDetails} />

              <Route path="/store/:department?/:category?" component={ProductsGrid} />
              
            </Switch>

          </div>

          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
