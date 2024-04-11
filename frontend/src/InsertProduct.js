import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Snackbar, Alert, Select ,MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const InsertProduct = () => {
    const [product, setProduct] = useState({
        Name: '',
        Type: '',
        ISBN: '',
        Title: '',
        Author: '',
        PublishDate: '',
        Publisher: '',
        Price: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const navigate = useNavigate();

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setProduct(prevProduct => ({
            ...prevProduct,
            Type: value
        }));
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }
    const handleBackButton = () => {
        navigate('/');
    }

    const handleSubmit = async (e) => {
       e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (data.message === 'Product added successfully') {
                setMessage('Product added successfully!');
                setSeverity('success');
                setOpenSnackbar(true);
            } else {
                throw new Error('Error adding product');
            }
            // setMessage('Product added successfully!');
            // setSeverity('success');
            // setOpenSnackbar(true);
            // Clear the form fields after successful submission
            setProduct({
                Name: '',
                Type: '',
                ISBN: '',
                Title: '',
                Author: '',
                PublishDate: '',
                Publisher: '',
                Price: ''
            });
            navigate('/addProduct');
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Error adding product');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <Container maxWidth='sm' style={{ textAlign: 'center', marginTop: "25px"}}>
        <Typography variant="h4">
            Add New Product
        </Typography>
        <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackButton}
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px', 
            }}
            >
            Back
        </Button>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
                label="Name"
                name="Name"
                value={product.Name}
                onChange={handleFieldChange}
                fullWidth
                required
                margin="normal"
            />
            <InputLabel id="drop-down">Type</InputLabel>
            <Select
                labelId="drop-down"
                value={product.Type}
                onChange={handleTypeChange}
                fullWidth
                required
                margin="normal"
                >
                    <MenuItem value="Book">Book</MenuItem>
                    <MenuItem value="Merchandise">Merchandise</MenuItem>
                </Select>
            
            <TextField
                label="ISBN"
                name="ISBN"
                value={product.ISBN}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Title"
                name="Title"
                value={product.Title}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Author"
                name="Author"
                value={product.Author}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Publish Date"
                name="PublishDate"
                value={product.PublishDate}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Publisher"
                name="Publisher"
                value={product.Publisher}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                name="Price"
                value={product.Price}
                onChange={handleFieldChange}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Add Product
            </Button>
        </form>
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
    </Container>
    );
};

export default InsertProduct;
