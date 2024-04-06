import React from "react";
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './HomePage.css';

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

function createData(Title, ItemID, IBSN, Author, PublishDate, Publisher, Price) {
    return { Title, ItemID, IBSN, Author, PublishDate, Publisher, Price };
}

const rows = [
    createData("Book 1", "BOOK-1", 1, "Author 1", "Date 1", "Publisher 1", "$10.99"),
    createData("Book 2", "BOOK-2", 2, "Author 2", "Date 2", "Publisher 2", "$9.99")
];

function BookTable() {
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
        <div>
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

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:2 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Book Title</StyledTableCell>
                        <StyledTableCell align="right">ItemID</StyledTableCell>
                        <StyledTableCell align="right">IBSN</StyledTableCell>
                        <StyledTableCell align="right">Author</StyledTableCell>
                        <StyledTableCell align="right">PublishDate</StyledTableCell>
                        <StyledTableCell align="right">Publisher</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.Title}>
                    <StyledTableCell component="th" scope="row">
                        {row.Title}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.ItemID}</StyledTableCell>
                    <StyledTableCell align="right">{row.IBSN}</StyledTableCell>
                    <StyledTableCell align="right">{row.Author}</StyledTableCell>
                    <StyledTableCell align="right">{row.PublishDate}</StyledTableCell>
                    <StyledTableCell align="right">{row.Publisher}</StyledTableCell>
                    <StyledTableCell align="right">{row.Price}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default BookTable;