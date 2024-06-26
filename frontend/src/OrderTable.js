import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, tableCellClasses, Typography, Button } from '@mui/material';
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

function OrderTable() {

    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/getOrders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchOrders();
    },[]);

    const handleDetails = (orderID) => {
        console.log('order id: ', orderID);
        navigate(`/OrderDetails/${orderID}`)
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
        <div style={{ backgroundColor: 'white', height: '50px', width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Typography variant="h4">Orders</Typography>
            <div></div>
        </div>
        <TableContainer component={Paper} style={{width: '85%', margin: 'auto'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">CustID</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">TotalPrice</StyledTableCell>
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">Details</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orders.map((order) => (
                    <StyledTableRow key={order.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {order.OrderID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{order.CustID}</StyledTableCell>
                    <StyledTableCell align="right">{order.Date ? new Date(order.Date).toLocaleDateString() : 'Null'}</StyledTableCell>
                    <StyledTableCell align="right">{order.TotalPrice}</StyledTableCell>
                    <StyledTableCell align="right">{order.Address}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleDetails(order.OrderID)}>Details</Button>
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

export default OrderTable