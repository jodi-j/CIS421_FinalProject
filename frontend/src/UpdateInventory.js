import {React, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Container, TextField,  Snackbar, Alert, TableCell, TableBody, TableRow, Paper, Table, TableContainer, TableHead  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateInventory = () => {

    const { productID } = useParams();
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [inventory, setInventory] = useState({
        Quantity: ''
    });

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const url = `http://localhost:5000/getInven?productID=${productID}`;
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
                setInventory(data[0]);

            }catch(error){
                console.error('Error fetching inventory:', error);
            }
        }

        fetchInventory();
    },[productID]);

    const handleFieldChange = (fieldName, value) => {
        setInventory(prevInventory => ({
            ...prevInventory,
            [fieldName]: value
        }));
    };
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }
    const handleBackButton = () => {
        navigate('/InventoryTable');
    }

    const handleUpdateInventory = async () => {
        try {
            const response = await fetch('http://localhost:5000/updateInventory', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventory),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMessage('Update successful!');
            setSeverity('success');
            setOpenSnackbar(true);
            // Handle success, maybe show a notification
        } catch (error) {
            console.error('Error updating inventory:', error);
            setMessage('Error updating inventory');
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return(
        <div style={{ marginTop: '25px'}}>
            <Typography variant='h4' style={{ textAlign: 'center'}} >Update Inventory</Typography>
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
                            <TableCell>ProductID</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                            <TableCell>{inventory.ProductID}</TableCell>
                            <TableCell>
                                <TextField
                                    name="Quantity"
                                    value={inventory.Quantity}
                                    size='small'
                                    onChange={(e) => handleFieldChange("Quantity", e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={handleUpdateInventory}>Update</Button>
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
    )
}

export default UpdateInventory;