import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import CategoryView from './components/category/View'
import CategoryEdit from './components/category/Edit'
import DeleteCategory from './components/category/Delete'

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Category CRUD Application</h1>
      <BrowserRouter>
        <Routes>
            <Route exact path="/category/" element={<CategoryView />} />
            <Route exact path="/category/update" element={<CategoryEdit />} />
            <Route exact path="/category/delete/:id" element={<DeleteCategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
