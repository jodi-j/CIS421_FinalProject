import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import OrderingPage from './OrderingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <HomePage/>}></Route>
        <Route path='/ordering' element={ <OrderingPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
