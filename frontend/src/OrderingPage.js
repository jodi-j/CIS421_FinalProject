import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import React, { useState } from 'react';

const OrderingPage = () => {

    const [items, setItems] = useState([{ itemID: '', quantity: 0}]);
    const [custID, setCustID] = useState('');

    const handleAddItem = () => {
        setItems([...items, { code: '', quantity: 0}]);
    }

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    }

    const handleSubmit = () => {

    }

    return(
        <Container component="main" style={{ textAlign: 'center', marginTop: "50px"}}>
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
          <form>
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
    )
}

export default OrderingPage;