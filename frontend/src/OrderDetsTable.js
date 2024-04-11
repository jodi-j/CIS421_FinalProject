import {React, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, tableCellClasses } from '@mui/material';
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

// function createData(OrderID, ItemID, Quantity) {
//     return {OrderID, ItemID, Quantity}
// }

// const rows = [
//     createData("ORDER-1", "BOOK-1", 1),
//     createData("ORDER-2", "MERCH-2", 2)
// ]

function OrderDetsTable() {
    const { orderID } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [products, setProducts] = useState([]);
    const image = process.env.PUBLIC_URL + '/images/bookstore_background.jpg';

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/orderDetails/${orderID}`);
                const data = await response.json();
                console.log(data.orderDetails);
                setOrderDetails(data.orderDetails);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderID]);

    const fetchProductInfo = async (productID) => {
        try {
            const url = `http://localhost:5000/getProduct?productID=${productID}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //const response = await fetch(`http://localhost:5000/productInfo/${productID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('product info', data)
            return data;
        } catch (error) {
            console.error(`Error fetching product info for productID ${productID}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const getProductInfoForOrderDetails = async () => {
            try {
                const productInfos = await Promise.all(
                    orderDetails.map(async (detail) => {
                        const productInfo = await fetchProductInfo(detail.ProductID);
                        return productInfo;
                    })
                );
                const flattenedProductInfos = productInfos.flat();
                setProducts(flattenedProductInfos.filter(Boolean)); // Filter out null values
            } catch (error) {
                console.error('Error fetching product info for order details:', error);
            }
        };

        getProductInfoForOrderDetails();
    }, [orderDetails]);


    if (!orderDetails) {
        return <p>Loading...</p>;
    }
    console.log('products', products);
    console.log('order dets', orderDetails);

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
                        <StyledTableCell>OrderID</StyledTableCell>
                        <StyledTableCell align="right">ProductID</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orderDetails.map((detail) => (
                    <StyledTableRow key={detail.ItemID}>
                    <StyledTableCell component="th" scope="row">
                        {detail.OrderID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{detail.ProductID}</StyledTableCell>
                    <StyledTableCell align="right">{detail.Quantity}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        {/* Product information table */}
        <TableContainer component={Paper} style={{ width: '75%', margin: 'auto', marginTop: '20px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ProductID</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            {/* Add more columns if needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {product.ProductID}
                                </StyledTableCell>
                                <StyledTableCell align="right">{product.Name}</StyledTableCell>
                                <StyledTableCell align="right">{product.Price}</StyledTableCell>
                                {/* Add more cells with product information if needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </div>
    )
}

export default OrderDetsTable;