import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Container, TextField,  Snackbar, Alert  } from '@mui/material';

const UpdateProduct = () => {

    const { productID } = useParams();

    return(
        <div>Update Product Page {productID}</div>
    )
}

export default UpdateProduct;