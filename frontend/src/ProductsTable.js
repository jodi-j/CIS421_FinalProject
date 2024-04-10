
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    tableCellClasses, Container, Typography, Button } from '@mui/material';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
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

// function createData(ItemID, Name, Type, IBSN, Title, Author, PublishDate, Publisher, Price) {
//     return { ItemID, Name, Type, IBSN, Title, Author, PublishDate, Publisher, Price };
// }

// const rows = [
//     createData(1, "Book 1 Name", "Book", "IBSN1", "Book 1 Title", "Author 1", "Date 1", "Publisher 1", "10.99"),
//     createData(2, "Book 2 Name", "Book", "IBSN2", "Book 2 Title", "Author 2", "Date 2", "Publisher 2", "20.99"),
//     createData(3, "Canvas Tote Bag", "Merchandise", "null", "null", "null", "null", "null", "9.99")
// ];

function ProductsTable() {
    const navigate = useNavigate();
    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/getBooks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                //console.log("eh")
                //This is causing issues
                //console.log(response.json());
                const data = await response.json();
                //console.log("Data:", data);
                setBooks(data);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchBooks();
    },[]);

    const handleUpdate = (productID) => {
        console.log('product id: ', productID);
        navigate(`/updateProduct/${productID}`)
    };

    const handleDelete = (productID) => {
        console.log('product id: ', productID);
    };

    return (
        <div>
            <Navbar/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        {/* <Typography variant="h4" component="div" style={{backgroundColor: 'white', width: '75%', textAlign: 'center'}}>Products</Typography> */}
        <div style={{ backgroundColor: 'white', width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Typography variant="h4">Products</Typography>
            <Button variant="contained" color="primary" style={{ marginRight: '5px'}}>Insert</Button>
        </div>
        <TableContainer component={Paper} style={{width: '85%', margin: 'auto'}}>
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
                        <StyledTableCell align="right">Update</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
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
                    <StyledTableCell align="right">{book.ISBN || 'Null'}</StyledTableCell>
                    <StyledTableCell align="right">{book.Title || 'Null'}</StyledTableCell>
                    <StyledTableCell align="right">{book.Author || 'Null'}</StyledTableCell>
                    <StyledTableCell align="right">{book.PublishDate ? new Date(book.PublishDate).toLocaleDateString() : 'Null'}</StyledTableCell>
                    <StyledTableCell align="right">{book.Publisher || 'Null'}</StyledTableCell>
                    <StyledTableCell align="right">{book.Price}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleUpdate(book.ID)}>Update</Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleDelete(book.ID)}>Delete</Button>
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </div>
        </div>
    )
}

export default ProductsTable;