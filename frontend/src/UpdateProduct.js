import {React, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Container, TextField,  Snackbar, Alert, TableCell, TableBody, TableRow, Paper, Table, TableContainer, TableHead  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateProduct = () => {

    const { productID } = useParams();
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [product, setProduct] = useState({
        ID: '',
        Name: '',
        Type: '',
        ISBN: '',
        Title: '',
        Author: '',
        PublishDate: '',
        Publisher: '',
        Price: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `http://localhost:5000/getProduct?productID=${productID}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('yippeeee', data);
                setProduct(data[0]);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchProduct();
    },[productID]);

    const handleFieldChange = (fieldName, value) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [fieldName]: value
        }));
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }
    const handleBackButton = () => {
        navigate('/');
    }

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch('http://localhost:5000/updateProduct', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMessage('Update successful!');
            setSeverity('success');
            setOpenSnackbar(true);
            // Handle success, maybe show a notification
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Error updating product');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return(
        // <Container style={{margin: 'auto'}}>
        <div style={{ marginTop: '25px'}}>
            <Typography variant='h4' style={{ textAlign: 'center'}} >Update Product</Typography>
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Publish Date</TableCell>
                            <TableCell>Publisher</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                            {/* {Object.entries(product).map(([key, value]) => (
                                <TableCell key={key}>
                                    <TextField
                                        name={key}
                                        value={value}
                                        onChange={handleFieldChange}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        label={key}
                                    />
                                </TableCell>
                            ))} */}
                            <TableCell>{product.ID}</TableCell>
                            <TableCell>
                                <TextField
                                    name="Name"
                                    value={product.Name}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Name", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Type"
                                    value={product.Type}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Type", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="ISBN"
                                    value={product.ISBN}
                                    size='small'
                                    onChange={(e) => handleFieldChange("ISBN", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Title"
                                    value={product.Title}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Title", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Author"
                                    value={product.Author}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Author", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="PublishDate"
                                    value={product.PublishDate}
                                    size='small'
                                    onChange={(e) => handleFieldChange("PublishDate", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Publisher"
                                    value={product.Publisher}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Publisher", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Price"
                                    value={product.Price}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Price", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={handleUpdateProduct}>Update</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                
            </TableContainer>
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
        // </Container>
    )
}

export default UpdateProduct;