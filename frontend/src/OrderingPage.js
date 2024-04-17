import { TextField, Button, Typography, Container, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import Navbar from './Navbar';

const OrderingPage = () => {

    const [items, setItems] = useState([{ itemID: '', quantity: 0}]);
    const [custID, setCustID] = useState('');
    const [address, setAddress] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    const handleAddItem = () => {
        setItems([...items, { code: '', quantity: 0}]);
    }

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    }

    const handleSubmit = async () => {
      try {
          const currentDate = new Date();
          const formattedDate = formatDate(currentDate);
          const totalPrice = await calculateTotalPrice();
          const orderData = {
              CustID: custID,
              Date: formattedDate,
              TotalPrice: totalPrice, 
              Address: address, 
          };

          console.log(orderData);

          const response = await fetch('http://localhost:5000/addOrder', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(orderData),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const order = await response.json();

          // Insert order details
          await Promise.all(
              items.map(async (item) => {
                  const orderDetailsData = {
                      OrderID: order.orderId,
                      ProductID: item.code,
                      Quantity: item.quantity,
                  };

                  const detailsResponse = await fetch('http://localhost:5000/addOrderDetails', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(orderDetailsData),
                  });

                  if (!detailsResponse.ok) {
                      throw new Error('Error adding order details');
                  }
              })
          );

          await Promise.all(
            items.map(async (item) => {
                const inventoryUpdateData = {
                    ProductID: item.code,
                    Quantity: item.quantity,
                };

                const inventoryUpdateResponse = await fetch('http://localhost:5000/updateInventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inventoryUpdateData),
                });

                if (!inventoryUpdateResponse.ok) {
                    throw new Error('Error updating inventory');
                }
            })
        );

          setMessage('Order submitted successfully!');
          setSeverity('success');
          setOpenSnackbar(true);
          // If everything is successful
          console.log('Order submitted successfully');
      } catch (error) {
          setMessage('Error submitting order.');
          setSeverity('error');
          setOpenSnackbar(true);
          console.error('Error submitting order:', error);
      }
  };
  const calculateTotalPrice = async () => {
    let totalPrice = 0;

    for (const item of items) {
        try {
            // Make a GET request to fetch the price of the product by ProductID
            const response = await fetch(`http://localhost:5000/getProductPrice/${item.code}`);
            
            if (!response.ok) {
                throw new Error('Error fetching product price');
            }

            const { price } = await response.json();

            totalPrice += price * item.quantity;
        } catch (error) {
            setMessage('Error fetching product prices.');
            setSeverity('error');
            setOpenSnackbar(true);
            console.error('Error fetching product price:', error);
            // Handle errors if necessary
        }
    }

    return totalPrice;
};
  const formatDate = (date) => {
    // Get year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Return the formatted date string
    return `${year}-${month}-${day}`;
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

    return(
      <div>
        <Navbar/>
        <Container component="main" style={{ textAlign: 'center', marginTop: '10px'}}>
        <div>
          <Typography variant="h4">Ordering</Typography>
          {items.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <TextField
                variant="outlined"
                margin="normal"
                label={`Item ${index + 1}`}
                value={item.code}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].code = e.target.value;
                  setItems(updatedItems);
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].quantity = parseInt(e.target.value, 10);
                  setItems(updatedItems);
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                style={{ height: "50px", width: "75px", marginTop: "20px"}}
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            style={{ height: "50px", width: "75px", marginTop: "20px"}}
            onClick={handleAddItem}
          >
            Add
          </Button>
          <form style={{ display: 'inline-block' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="custID"
              label="CustID"
              name="custID"
              style={{ backgroundColor: 'white'}}
              autoFocus
              value={custID}
              onChange={(e) => setCustID(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="address"
              label="Address"
              name="address"
              style={{ backgroundColor: 'white'}}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
          />
            <Button
              variant="contained"
              color="primary"
              label="Submit"
              style={{ height: "50px", width: "75px", marginTop: "20px"}}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
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

export default OrderingPage;