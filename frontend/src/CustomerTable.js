import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    tableCellClasses, Typography, Button } from '@mui/material';
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

//function createData(CustID, FName, LName, PhoneNum, Email, ShippingAddress) {
//    return {CustID, FName, LName, PhoneNum, Email, ShippingAddress}
//}

//const rows = [
//    createData(1234, "Harry", "Potter", "123456789", "imawizardharry@gmail.com", "34 Privet Drive"),
//    createData(5678, "Ron", "Weasley", "987654321", "myratispeterpettigrew@hotmail.com", "Hogwarts")
//]

function CustomerTable() {
    const navigate = useNavigate();
    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:5000/getCustomers', {
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
                setCustomers(data);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchCustomers();
    },[]);

    const handleUpdate = (productID) => {
        console.log('product id: ', productID);
        //navigate(`/updateProduct/${productID}`)
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
        <div style={{ backgroundColor: 'white', width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Typography variant="h4">Customer</Typography>
            <Button variant="contained" color="primary" style={{ marginRight: '5px'}}>Insert</Button>
        </div>
        <TableContainer component={Paper} style={{width: '85%', margin: 'auto'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Customer ID</StyledTableCell>
                        <StyledTableCell align="right">First Name</StyledTableCell>
                        <StyledTableCell align="right">Last Name</StyledTableCell>
                        <StyledTableCell align="right">Phone Number</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Shipping Address</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {customers.map((customer) => (
                    <StyledTableRow key={customer.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {customer.CustID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{customer.Fname}</StyledTableCell>
                    <StyledTableCell align="right">{customer.Lname}</StyledTableCell>
                    <StyledTableCell align="right">{customer.Phone}</StyledTableCell>
                    <StyledTableCell align="right">{customer.Email}</StyledTableCell>
                    <StyledTableCell align="right">{customer.ShippingAddress}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleUpdate(customer.CustID)}>Update</Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleDelete(customer.CustID)}>Delete</Button>
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

export default CustomerTable;