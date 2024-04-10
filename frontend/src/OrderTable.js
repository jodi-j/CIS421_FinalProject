import React from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, 
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

function createData(OrderID, CustID, Date, Address, TotalPrice) {
    return {OrderID, CustID, Date, Address, TotalPrice}
}

const rows = [
    createData("1", 1234, "04-05-2024", "1234 Street Street", 30.99),
    createData("2", 5678, "04-05-2024", "9876 Cool People Avenue", 10.99)
]

function OrderTable() {

    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';

    return (
        <div>
            { <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8, 
                    zIndex: -1,
                }} />}
        <Navbar/>

        <TableContainer component={Paper} style={{width: '75%', margin: 'auto', marginTop: '10px'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>OrderID</StyledTableCell>
                        <StyledTableCell align="right">CustID</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">Total Price</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.OrderID}>
                    <StyledTableCell component="th" scope="row">
                        {row.OrderID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.CustID}</StyledTableCell>
                    <StyledTableCell align="right">{row.Date}</StyledTableCell>
                    <StyledTableCell align="right">{row.Address}</StyledTableCell>
                    <StyledTableCell align="right">{row.TotalPrice}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
}

export default OrderTable