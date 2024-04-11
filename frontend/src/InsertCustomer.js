import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Snackbar, Alert, Select ,MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const InsertCustomer = () => {
    const [customer, setCustomer] = useState({
        Fname: '',
        Lname: '',
        Phone: '',
        Email: '',
        ShippingAddress: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const navigate = useNavigate();

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            Type: value
        }));
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }
    const handleBackButton = () => {
        navigate('/CustomerTable');
    }

    const handleSubmit = async (e) => {
       e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/addCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (data.message === 'Customer added successfully') {
                setMessage('Customer added successfully!');
                setSeverity('success');
                setOpenSnackbar(true);
            } else {
                throw new Error('Error adding customer');
            }
            // setMessage('Customer added successfully!');
            // setSeverity('success');
            // setOpenSnackbar(true);
            // Clear the form fields after successful submission
            setCustomer({
                Fname: '',
                Lname: '',
                Phone: '',
                Email: '',
                ShippingAddress: ''
            });
            navigate('/addCustomer');
        } catch (error) {
            console.error('Error adding customer:', error);
            setMessage('Error adding customer');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <Container maxWidth='sm' style={{ textAlign: 'center', marginTop: "25px"}}>
        <Typography variant="h4">
            Add New Customer
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
                label="First Name"
                name="Fname"
                value={customer.Fname}
                onChange={handleFieldChange}
                fullWidth
                required
                margin="normal"
            />
            
            <TextField
                label="Last Name"
                name="Lname"
                value={customer.Lname}
                onChange={handleFieldChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Phone Number"
                name="Phone"
                value={customer.Phone}
                onChange={handleFieldChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Email Address"
                name="Email"
                value={customer.Email}
                onChange={handleFieldChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Shipping Address"
                name="ShippingAddress"
                value={customer.ShippingAddress}
                onChange={handleFieldChange}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Add Customer
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

export default InsertCustomer;