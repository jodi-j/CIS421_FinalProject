import React from "react";
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom"
import { AppBar, Box, Toolbar, Typography, Button, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, tableCellClasses } from '@mui/material';
import './HomePage.css';
import Navbar from "./Navbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function createData(Name, ItemID, Type, Price) {
    return {Name, ItemID, Type, Price}
}

const rows = [
    createData("Bookmark", "MERCH-1", "Accessory", "$1.99"),
    createData("Tote Bag", "MERCH-2", "Bags", "$12.99")
]

function MerchandiseTable() {
    // const [goToBooks, setGoToBooks] = React.useState(false);
    // const [goToMerch, setGoToMerch] = React.useState(false);
    // const [goToInventory, setGoToInventory] = React.useState(false);
    // const [goToOrder, setGoToOrder] = React.useState(false);
    // const [goToOrderDets, setGoToOrderDets] = React.useState(false);
    // const [goToCust, setGoToCust] = React.useState(false);
    // const [goToOrdering, setGoToOrdering] = React.useState(false);

    // if (goToBooks) {
    //     return <Navigate to="/BooksTable" />
    // }
    // if (goToMerch) {
    //     return <Navigate to="/MerchTable" />
    // }
    // if (goToInventory) {
    //     return <Navigate to='/InventoryTable' />
    // }
    // if (goToOrder) {
    //     return <Navigate to='/OrderTable' />
    // }
    // if (goToOrderDets) {
    //     return <Navigate to='/OrderDetsTable' />
    // }
    // if (goToCust) {
    //     return <Navigate to='/CustomerTable' />
    // }
    // if (goToOrdering) {
    //     return <Navigate to='/OrderingPage' />
    // }

    return (
        <div>
        {/* <Box sx={{ flexGrow: 1 }}>
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
        </Box> */}
        <Navbar/>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:2 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">ItemID</StyledTableCell>
                        <StyledTableCell align="right">Type</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.Name}>
                    <StyledTableCell component="th" scope="row">
                        {row.Name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.ItemID}</StyledTableCell>
                    <StyledTableCell align="right">{row.Type}</StyledTableCell>
                    <StyledTableCell align="right">{row.Price}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
}

export default MerchandiseTable;