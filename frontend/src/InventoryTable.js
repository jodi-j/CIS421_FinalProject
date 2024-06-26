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
                const data = await response.json();
                setInventory(data);

            }catch(error){
                console.error('Error fetching inventory:', error);
            }
        }

        fetchInventory();
    },[]);

    const handleUpdate = (productID) => {
        console.log('product id: ', productID);
        navigate(`/updateInventory/${productID}`)
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
        <div style={{ backgroundColor: 'white', height: '50px',width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Typography variant="h4">Inventory</Typography>
            <div></div>
        </div>
        <TableContainer component={Paper} style={{width: '60%', margin: 'auto'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product ID</StyledTableCell>
                        <StyledTableCell align="center">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {inventory.map((inven) => (
                    <StyledTableRow key={inven.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {inven.ProductID}
                    </StyledTableCell>
                    <StyledTableCell align="center">{inven.Quantity}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleUpdate(inven.ProductID)}>Update</Button>
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