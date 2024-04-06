import React from "react";
import { Navigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ButtonAppBar() {

    const [goToBooks, setGoToBooks] = React.useState(false);
    const [goToMerch, setGoToMerch] = React.useState(false);
    const [goToInventory, setGoToInventory] = React.useState(false);
    const [goToOrder, setGoToOrder] = React.useState(false);
    const [goToOrderDets, setGoToOrderDets] = React.useState(false);
    const [goToCust, setGoToCust] = React.useState(false);
    const [goToOrdering, setGoToOrdering] = React.useState(false);

    if (goToBooks) {
        return <Navigate to="/BooksTable" />
    }
    if (goToMerch) {
        return <Navigate to="/MerchTable" />
    }
    if (goToInventory) {
        return <Navigate to='/InventoryTable' />
    }
    if (goToOrder) {
        return <Navigate to='/OrderTable' />
    }
    if (goToOrderDets) {
        return <Navigate to='/OrderDetsTable' />
    }
    if (goToCust) {
        return <Navigate to='/CustomerTable' />
    }
    if (goToOrdering) {
        return <Navigate to='/Ordering' />
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bookstore!
            </Typography>

            <Button color="inherit"
                onClick={() => {
                    setGoToBooks(true);
                }}
            >Books</Button>
            
            <Button color="inherit"
                onClick={() => {
                    setGoToMerch(true);
                }}
            >Merchandise</Button>

            <Button color="inherit"
                onClick={() => {
                    setGoToInventory(true);
                }}
            >Inventory</Button>

            <Button color="inherit"
                onClick={() => {
                    setGoToOrder(true);
                }}
            >Orders</Button>

            <Button color="inherit"
                onClick={() => {
                    setGoToOrderDets(true);
                }}
            >Order Details</Button>

            <Button color="inherit"
                onClick={() => {
                    setGoToCust(true);
                }}
            >Customer</Button>

            <Button color="inherit"
                onClick={() => {
                    setGoToOrdering(true);
                }}
            >Ordering Interface</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  export default ButtonAppBar;

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import './HomePage.css';

const HomePage = () => {

    return(
        <Container component="main" style={{ textAlign: "center", marginTop: "25px" }}>
        <CssBaseline>
            <div>
                <Typography variant='h3'>Bookstore!</Typography>
                <form>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Admin View</Button>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Book & Merchandise</Button>
                    <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    >Customer View</Button>
                    <Link to="/ordering">
                        <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        >Ordering</Button>
                    </Link>
                </form>
            </div>
        </CssBaseline>
        </Container>
    )
}



export default HomePage;