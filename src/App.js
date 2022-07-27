import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// Componenetes
import List from './components/List';
import Edit from './components/Edit';
import Create from './components/Create';

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;