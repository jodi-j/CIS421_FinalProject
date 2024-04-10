import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    tableCellClasses, Container } from '@mui/material';
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

    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/getBooks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Data:", data);
                setBooks(data);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchBooks();
    },[]);

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

        <TableContainer component={Paper} style={{width: '75%', margin: 'auto', marginTop: '20px'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                {books.map((book) => (
                    <StyledTableRow key={book.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {book.ID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{book.Name}</StyledTableCell>
                    <StyledTableCell align="right">{book.Type}</StyledTableCell>
                    <StyledTableCell align="right">{book.ISBN}</StyledTableCell>
                    <StyledTableCell align="right">{book.Title}</StyledTableCell>
                    <StyledTableCell align="right">{book.Author}</StyledTableCell>
                    <StyledTableCell align="right">{book.PublishDate}</StyledTableCell>
                    <StyledTableCell align="right">{book.Publisher}</StyledTableCell>
                    <StyledTableCell align="right">{book.Price}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default ProductsTable;