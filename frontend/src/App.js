import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import ProductsTable from './ProductsTable';
import InventoryTable from './InventoryTable'
import OrderTable from './OrderTable'
import OrderDetsTable from './OrderDetsTable'
import CustomerTable from './CustomerTable'
import OrderingPage from './OrderingPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <HomePage/>}></Route>
        <Route path='/OrderingPage' element={ <OrderingPage/> }></Route>
        <Route path='/ProductsTable' element={ <ProductsTable></ProductsTable> }></Route>
        <Route path='/InventoryTable' element={ <InventoryTable></InventoryTable> }></Route>
        <Route path='/OrderTable' element={ <OrderTable></OrderTable> }></Route>
        <Route path='/OrderDetsTable' element={ <OrderDetsTable></OrderDetsTable> }></Route>
        <Route path='/CustomerTable' element={ <CustomerTable></CustomerTable> }></Route>
      </Routes>
    </Router>
  );
}

export default App;