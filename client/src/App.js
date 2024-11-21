import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import LoginView from "./components/user/Login"
import CategoryView from './components/category/View'
import CategoryEdit from './components/category/Edit'
import DeleteCategory from './components/category/Delete'
import OrderView from './components/order/View'
import DeleteCategory from './components/category/Delete'

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Category CRUD Application</h1>
      <BrowserRouter>
      // created hyper links
        <nav>
          <Link to="/">Home</Link> 
          <Link to="/category">Categories</Link>
          <Link to="/product">Products</Link>
          <Link to="/order">Orders</Link>
        </nav>
        <Routes>
            <Route exact path="/" element={<LoginView />} />
            <Route exact path="/category/" element={<CategoryView />} />
            <Route exact path="/category/edit/:id" element={<CategoryEdit />} />
            <Route exact path="/category/delete/:id" element={<DeleteCategory />} />
            <Route exact path="/products" element={<ProductView />} />
            <Route exact path="/order" element={<OrderView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
