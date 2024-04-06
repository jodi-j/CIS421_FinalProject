import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import BookTable from './BooksTable';
import MerchandiseTable from './MerchandiseTable';
import InventoryTable from './InventoryTable'
import OrderTable from './OrderTable'
import OrderDetsTable from './OrderDetsTable'
import CustomerTable from './CustomerTable'
import Ordering from './Ordering'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <HomePage></HomePage> }></Route>
        <Route path='/BooksTable' element={ <BookTable></BookTable> }></Route>
        <Route path='/MerchTable' element={ <MerchandiseTable></MerchandiseTable> }></Route>
        <Route path='/InventoryTable' element={ <InventoryTable></InventoryTable> }></Route>
        <Route path='/OrderTable' element={ <OrderTable></OrderTable> }></Route>
        <Route path='/OrderDetsTable' element={ <OrderDetsTable></OrderDetsTable> }></Route>
        <Route path='/CustomerTable' element={ <CustomerTable></CustomerTable> }></Route>
        <Route path='/Ordering' element={ <Ordering></Ordering> }></Route>
      </Routes>
    </Router>
  );
}

export default App;