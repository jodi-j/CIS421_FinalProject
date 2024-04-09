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

function createData(ItemID, Quantity) {
    return {ItemID, Quantity}
}

const rows = [
    createData("BOOK-1", 420),
    createData("BOOK-2", 100),
    createData("MERCH-1", 50),
    createData("MERCH-2", 1000000)
]

function InventoryTable() {

    return (
        <div>
        <Navbar/>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:2 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ProductID</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {row.ItemID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Quantity}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
}

export default InventoryTable;