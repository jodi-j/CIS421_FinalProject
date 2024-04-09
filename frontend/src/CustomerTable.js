import React from "react";
import { styled } from '@mui/material/styles';
import { Navigate } from "react-router-dom"
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

function createData(CustID, FName, LName, PhoneNum, Email) {
    return {CustID, FName, LName, PhoneNum, Email}
}

const rows = [
    createData(1234, "Harry", "Potter", "123456789", "imawizardharry@gmail.com"),
    createData(5678, "Ron", "Weasley", "987654321", "myratispeterpettigrew@hotmail.com")
]

function CustomerTable() {
    

    return (
        <div>
        
        <Navbar/>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:2 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>CustID</StyledTableCell>
                        <StyledTableCell align="right">First Name</StyledTableCell>
                        <StyledTableCell align="right">Last Name</StyledTableCell>
                        <StyledTableCell align="right">Phone Number</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
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
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default CustomerTable;