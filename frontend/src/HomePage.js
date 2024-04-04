import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function createData(Title, ItemID, IBSN, Author, PublishDate, Publisher, Price) {
    return { Title, ItemID, IBSN, Author, PublishDate, Publisher, Price };
}

const rows = [
    createData("Book 1", "BOOK1", 1, "Author 1", "Date 1", "Publisher 1", "$10.99"),
    createData("Book 2", "BOOK-2", 2, "Author 2", "Date 2", "Publisher 2", "$9.99")
];

export default function HomePage() {
    return(
        <Container component="main" style={{ textAlign: "center", marginTop: "25px" }}>
        <CssBaseline>
            <div>
                <Typography variant='h2'>Bookstore!</Typography>
                <form>
                    <Button variant="contained">Book Table</Button>
                    <Button variant="contained">Customer Table</Button>
                    <Button variant="contained">Merchandise Table</Button>
                    <Button variant="contained">Inventory Table</Button>
                    <Button variant="contained">Orders Table</Button>
                    <Button variant="contained">Order Details Table</Button>
                    <Button variant="contained">Order Interface Table</Button>
                </form>
            </div>

            <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, marginTop:2}} aria-label="customized table">
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
        </CssBaseline>
        </Container>
    )
}