import React from "react";
import { styled } from '@mui/material/styles';
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

function createData(ItemID, Name, Type, IBSN, Title, Author, PublishDate, Publisher, Price) {
    return { ItemID, Name, Type, IBSN, Title, Author, PublishDate, Publisher, Price };
}

const rows = [
    createData(1, "Book 1 Name", "Book", "IBSN1", "Book 1 Title", "Author 1", "Date 1", "Publisher 1", "10.99"),
    createData(2, "Book 2 Name", "Book", "IBSN2", "Book 2 Title", "Author 2", "Date 2", "Publisher 2", "20.99"),
    createData(3, "Canvas Tote Bag", "Merchandise", "null", "null", "null", "null", "null", "9.99")
];

function ProductsTable() {

    return (
        <div>
        <Navbar/>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:2 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Type</StyledTableCell>
                        <StyledTableCell align="right">IBSN</StyledTableCell>
                        <StyledTableCell align="right">Title</StyledTableCell>
                        <StyledTableCell align="right">Author</StyledTableCell>
                        <StyledTableCell align="right">PublishDate</StyledTableCell>
                        <StyledTableCell align="right">Publisher</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {row.ItemID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Name}</StyledTableCell>
                    <StyledTableCell align="right">{row.Type}</StyledTableCell>
                    <StyledTableCell align="right">{row.IBSN}</StyledTableCell>
                    <StyledTableCell align="right">{row.Title}</StyledTableCell>
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

export default ProductsTable;