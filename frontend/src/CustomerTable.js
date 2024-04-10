import React from "react";
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    tableCellClasses } from '@mui/material';
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

function createData(CustID, FName, LName, PhoneNum, Email, ShippingAddress) {
    return {CustID, FName, LName, PhoneNum, Email, ShippingAddress}
}

const rows = [
    createData(1234, "Harry", "Potter", "123456789", "imawizardharry@gmail.com", "34 Privet Drive"),
    createData(5678, "Ron", "Weasley", "987654321", "myratispeterpettigrew@hotmail.com", "Hogwarts")
]

function CustomerTable() {

    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';

    return (
        <div>
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
        <Navbar/>
        <TableContainer component={Paper} style={{width: '75%', margin: 'auto', marginTop: '10px'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>CustID</StyledTableCell>
                        <StyledTableCell align="right">First Name</StyledTableCell>
                        <StyledTableCell align="right">Last Name</StyledTableCell>
                        <StyledTableCell align="right">Phone Number</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Shipping Address</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.CustID}>
                    <StyledTableCell component="th" scope="row">
                        {row.CustID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.FName}</StyledTableCell>
                    <StyledTableCell align="right">{row.LName}</StyledTableCell>
                    <StyledTableCell align="right">{row.PhoneNum}</StyledTableCell>
                    <StyledTableCell align="right">{row.Email}</StyledTableCell>
                    <StyledTableCell align="right">{row.ShippingAddress}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default CustomerTable;