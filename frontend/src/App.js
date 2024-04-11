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
import UpdateProduct from './UpdateProduct';
import InsertProduct from './InsertProduct';
import InsertCustomer from './InsertCustomer';
import UpdateCustomer from './UpdateCustomer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <ProductsTable/>}></Route>
        <Route path='/addProduct' element={ <InsertProduct/>}></Route>
        <Route path='/updateProduct/:productID' element={ <UpdateProduct/>}></Route>
        <Route path='/OrderingPage' element={ <OrderingPage/> }></Route>
        <Route path='/InventoryTable' element={ <InventoryTable></InventoryTable> }></Route>
        <Route path='/OrderTable' element={ <OrderTable></OrderTable> }></Route>
        <Route path='/OrderDetails/:orderID' element={ <OrderDetsTable></OrderDetsTable> }></Route>
        <Route path='/CustomerTable' element={ <CustomerTable></CustomerTable> }></Route>
        <Route path='/addCustomer' element={ <InsertCustomer/>}></Route>
        <Route path='/updateCustomer/:custID' element={ <UpdateCustomer/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;