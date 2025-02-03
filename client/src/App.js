import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import CategoryView from './components/category/View'
import CategoryEdit from './components/category/Edit'
import ProductView from './components/product/View'
import OrderView from './components/order/View'

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Category CRUD Application</h1>
      <BrowserRouter>
        {/* create navigation bar */}
        <nav>
          <Link to="/">Home</Link> |<Link to="/category">Categories</Link> | <Link to="/product">Products</Link> | <Link to="/order">Orders</Link>
        </nav>
        {/* define routes (urls) and the corresponding components to load */}
        <Routes>
            <Route exact path="/" element={<OrderView />} />
            <Route exact path="/category/" element={<CategoryView />} />
            <Route exact path="/category/edit/:id" element={<CategoryEdit />} />
            <Route exact path="/product/" element={<ProductView />} />
            <Route exact path="/order/" element={<OrderView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
