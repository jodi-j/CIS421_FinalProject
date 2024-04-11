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

// function createData(ItemID, Quantity) {
//     return {ItemID, Quantity}
// }

// const rows = [
//     createData("BOOK-1", 420),
//     createData("BOOK-2", 100),
//     createData("MERCH-1", 50),
//     createData("MERCH-2", 1000000)
// ]

function InventoryTable() {
    const navigate = useNavigate();
    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';
    const [inventory, setInventory] = useState([]);


    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:5000/getInventory', {
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
                setInventory(data);

            }catch(error){
                console.error('Error fetching books:', error);
            }
        }

        fetchInventory();
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
        {/* <Typography variant="h4" component="div" style={{backgroundColor: 'white', width: '75%', textAlign: 'center'}}>Products</Typography> */}
        <div style={{ backgroundColor: 'white', width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Typography variant="h4">Inventory</Typography>
            <Button variant="contained" color="primary" style={{ marginRight: '5px'}}>Insert</Button>
        </div>
        <TableContainer component={Paper} style={{width: '85%', margin: 'auto'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product ID</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {inventory.map((inven) => (
                    <StyledTableRow key={inven.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {inven.ProductID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{inven.Quantity}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleUpdate(inven.ID)}>Update</Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleDelete(inven.ID)}>Delete</Button>
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

export default InventoryTable;