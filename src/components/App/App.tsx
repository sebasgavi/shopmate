import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';
import Navbar from '../Navbar/Navbar';
import ProductsGrid from '../ProductsGrid/ProductsGrid';

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

              <Route path="/store" component={ProductsGrid} />
              
            </Switch>

          </div>

          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
