import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, tableCellClasses, Typography, Button } from '@mui/material';
import './HomePage.css';
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

// function createData(OrderID, CustID, Date, Address, TotalPrice) {
//     return {OrderID, CustID, Date, Address, TotalPrice}
// }

// const rows = [
//     createData("1", 1234, "04-05-2024", "1234 Street Street", 30.99),
//     createData("2", 5678, "04-05-2024", "9876 Cool People Avenue", 10.99)
// ]

function OrderTable() {

    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';
    const [orders, setOrders] = useState([]);

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
                //console.log("eh")
                //This is causing issues
                //console.log(response.json());
                const data = await response.json();
                //console.log("Data:", data);
                setOrders(data);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchOrders();
    },[]);

    const handleDetails = (productID) => {
        console.log('product id: ', productID);
        //navigate(`/updateProduct/${productID}`)
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