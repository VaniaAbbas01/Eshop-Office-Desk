import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import CategoryView from './components/category/View'

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Category CRUD Application</h1>
      <BrowserRouter>
        <Routes>
            <Route exact path="/category/" element={<CategoryView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
