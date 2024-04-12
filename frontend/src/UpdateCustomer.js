import {React, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Container, TextField,  Snackbar, Alert, TableCell, TableBody, TableRow, Paper, Table, TableContainer, TableHead  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateCustomer = () => {

    const { CustID } = useParams();
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [customer, setCustomer] = useState({
        Fname: '',
        Lname: '',
        Phone: '',
        Email: '',
        ShippingAddress: ''
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const url = `http://localhost:5000/getCustomers?CustID=${CustID}`;
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
                setCustomer(data[0]);

            }catch(error){
                console.error('Error fetching customer:', error);
            }
        }

        fetchCustomer();
    },[CustID]);

    const handleFieldChange = (fieldName, value) => {
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [fieldName]: value
        }));
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }
    const handleBackButton = () => {
        navigate('/CustomerTable');
    }

    const handleUpdateCustomer = async () => {
        try {
            const response = await fetch('http://localhost:5000/updateCustomer', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMessage('Update successful!');
            setSeverity('success');
            setOpenSnackbar(true);
            // Handle success, maybe show a notification
        } catch (error) {
            console.error('Error updating customer:', error);
            setMessage('Error updating customer');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return(
        <div style={{ marginTop: '25px'}}>
            <Typography variant='h4' style={{ textAlign: 'center'}} >Update Customer</Typography>
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
                            <TableCell>CustID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Shipping Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                            <TableCell>{customer.CustID}</TableCell>
                            <TableCell>
                                <TextField
                                    name="Fname"
                                    value={customer.Fname}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Fname", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Lname"
                                    value={customer.Lname}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Lname", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Phone"
                                    value={customer.Phone}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Phone", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="Email"
                                    value={customer.Email}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Phone", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="ShippingAddress"
                                    value={customer.ShippingAddress}
                                    size='small'
                                    onChange={(e) => handleFieldChange("ShippingAddress", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={handleUpdateCustomer}>Update</Button>
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

export default UpdateCustomer;