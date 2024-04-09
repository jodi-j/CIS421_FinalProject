import React from 'react';
import {AppBar, Toolbar, Box, Button, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bookstore Database!
            </Typography>
            <Box>
            <Button color="inherit" component={Link} to="/ProductsTable">Products</Button>
            <Button color="inherit" component={Link} to="/InventoryTable">Inventory</Button>
            <Button color="inherit" component={Link} to="/OrderTable">Orders</Button>
            <Button color="inherit" component={Link} to="/OrderDetsTable">Order Details</Button>
            <Button color="inherit" component={Link} to="/CustomerTable">Customer</Button>
            <Button color="inherit" component={Link} to="/OrderingPage">Ordering Interface</Button>
            </Box>
        </Toolbar>
        </AppBar>
    )
}

export default Navbar;