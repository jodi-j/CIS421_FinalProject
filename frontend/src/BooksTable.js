import React from "react";
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    tableCellClasses } from '@mui/material';

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

function createData(Title, ItemID, IBSN, Author, PublishDate, Publisher, Price) {
    return { Title, ItemID, IBSN, Author, PublishDate, Publisher, Price };
}

const rows = [
    createData("Book 1", "BOOK-1", 1, "Author 1", "Date 1", "Publisher 1", "$10.99"),
    createData("Book 2", "BOOK-2", 2, "Author 2", "Date 2", "Publisher 2", "$9.99")
];

function BookTable() {
    

    return (
        <div>
        <Navbar/>

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