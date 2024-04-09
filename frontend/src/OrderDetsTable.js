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

function createData(OrderID, ItemID, Quantity) {
    return {OrderID, ItemID, Quantity}
}

const rows = [
    createData("ORDER-1", "BOOK-1", 1),
    createData("ORDER-2", "MERCH-2", 2)
]

function OrderDetsTable() {

    return (
        <div>
        <Navbar/>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:2 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>OrderID</StyledTableCell>
                        <StyledTableCell align="right">ItemID</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.OrderID}>
                    <StyledTableCell component="th" scope="row">
                        {row.OrderID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.ItemID}</StyledTableCell>
                    <StyledTableCell align="right">{row.Quantity}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
}

export default OrderDetsTable;