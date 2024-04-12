import {React, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, Button,
    TableHead, TableRow, Paper, tableCellClasses, Typography } from '@mui/material';
import './HomePage.css';
import Navbar from "./Navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/OrderTable');
    }

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
        

        {/* Order ID Label */}
        <div style={{ backgroundColor: 'white', height: '50px',width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Typography variant="h4">Order Details — Order ID #{orderID}</Typography>
            <div></div>
        </div>
        <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackButton}
                    style={{
                        position: 'absolute',
                        top: '70px',
                        left: '20px', 
                    }}
                    >
                    Back
                </Button>
        {/* Product information table */}
        <TableContainer component={Paper} style={{ width: '80%', margin: 'auto' }}>
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
                                    {product.ID}
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
    </div>
    )
}

export default OrderDetsTable;