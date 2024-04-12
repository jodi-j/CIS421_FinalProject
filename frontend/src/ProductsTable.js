import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    tableCellClasses, Container, Typography, Button, Snackbar, Alert } from '@mui/material';
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

function ProductsTable() {
    const navigate = useNavigate();
    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';
    const [books, setBooks] = useState([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/getProducts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
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

    const handleDelete = async (productID) => {
        try {
            const response = await fetch(`http://localhost:5000/deleteProduct/${productID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMessage('Product deleted successfully!');
            setSeverity('success');
            setOpenSnackbar(true);
            // Handle success, maybe show a notification
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage('Error deleting product');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }

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
        <div style={{ backgroundColor: 'white', height: '50px',width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Typography variant="h4">Products</Typography>
            <Button variant="contained" color="primary" style={{ marginRight: '5px'}} onClick={() => navigate('/addProduct')}>Insert</Button>
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
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
            onClose={handleSnackbarClose}
            severity={severity}
            sx={{ width: "100%", background: "black", color: "white"}}
            >
            {message}
            </Alert>
        </Snackbar>
        </div>
    )
}

export default ProductsTable;