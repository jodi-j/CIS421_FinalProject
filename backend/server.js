
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.json());
app.use(cors());

app.get('/getProducts', async (req, res) => {

    pool.query('SELECT * FROM Products', async (error, results) => {
        if (error) {
          console.error('Error querying database: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        console.log('Query results:', results);
        res.json(results);
      });
});

app.get('/getProduct', async (req, res) => {

  const { productID } = req.query;
  if(!productID){
    return res.status(400).json({ error: 'ProductID is required'});
}

app.put('/updateProduct', async (req, res) => {
  try {
      const updatedProduct = req.body;

      // Extract individual fields from the updated product object
      const { Name, Type, ISBN, Title, Author, PublishDate, Publisher, Price, ID } = updatedProduct;

      // Execute the SQL UPDATE statement
      pool.query(
          'UPDATE Products SET Name = ?, Type = ?, ISBN = ?, Title = ?, Author = ?, PublishDate = ?, Publisher = ?, Price = ? WHERE ID = ?',
          [Name, Type, ISBN, Title, Author, PublishDate, Publisher, Price, ID],
          (error, results) => {
              if (error) {
                  console.error('Error updating product:', error);
                  res.status(500).json({ error: 'Internal server error' });
              } else {
                  // Product updated successfully
                  console.log('Product updated successfully');
                  res.status(200).json({ message: 'Product updated successfully' });
              }
          }
      );
  } catch (error) {
      console.error('Error updating product:', error);
      // Send an error response
      res.status(500).json({ error: 'Internal server error' });
  }
});


  pool.query('SELECT * FROM Products WHERE ID = ?', [productID], async (error, results) => {
      if (error) {
        console.error('Error querying database: ' + error.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length === 0){
        return res.status(404).json({ error: 'Product not found'});
      }
      console.log('Query results:', results);
      res.json(results);
    });
});

app.get('/getInventory', async (req, res) => {
  pool.query('SELECT * FROM Inventory', async (error, results) => {
    if (error){
      console.error('Error querying database: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Query results:', results);
    res.json(results);
  })
});

app.get('/getOrders', async (req, res) => {
  pool.query('SELECT * FROM Orders', async (error, results) => {
    if (error){
      console.error('Error querying database: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Query results:', results);
    res.json(results);
  })
});

// Order Details query

app.get('/getCustomers', async (req, res) => {
  pool.query('SELECT * FROM Customers', async (error, results) => {
    if (error){
      console.error('Error querying database: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Query results:', results);
    res.json(results);
  })
});







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("Server started on port ", PORT)})