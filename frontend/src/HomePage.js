import React from "react";
import { Navigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ButtonAppBar() {

    const [goToBooks, setGoToBooks] = React.useState(true);
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
        return <Navigate to='/OrderingPage' />
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