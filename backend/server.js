const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.json());
app.use(cors());

// SELECT Statement, get all Products
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

// SELECT Statement, get one product
app.get('/getProduct', async (req, res) => {

  const { productID } = req.query;
  if(!productID){
    return res.status(400).json({ error: 'ProductID is required'});
  }
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

// DELETE Statement, delete product and all references to it, nested for Inventory and OrderDetails tables
app.delete('/deleteProduct/:productID', (req, res) => {
  const { productID } = req.params;
  try{
    pool.query('DELETE FROM Inventory WHERE ProductID = ?', [productID], async (inventoryError, inventoryResults) => {
      if (inventoryError) {
          console.error('Error deleting inventory:', inventoryError.stack);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          console.log('Inventory deleted successfully');
          
          // Then, delete from OrderDetails table
          pool.query('DELETE FROM OrderDetails WHERE ProductID = ?', [productID], async (orderDetailsError, orderDetailsResults) => {
              if (orderDetailsError) {
                  console.error('Error deleting order details:', orderDetailsError.stack);
                  res.status(500).json({ error: 'Internal server error' });
              } else {
                  console.log('Order details deleted successfully');
                  
                  // Then, delete from Products table
                  pool.query('DELETE FROM Products WHERE ID = ?', [productID], async (productError, productResults) => {
                      if (productError) {
                          console.error('Error deleting product:', productError.stack);
                          res.status(500).json({ error: 'Internal server error' });
                      } else {
                          console.log('Product deleted successfully');
                          res.status(200).json({ message: 'Product, inventory, and order details deleted successfully' });
                      }
                  });
              }
          });
      }
  });
  }catch(error){
    console.error('Error deleting product:', error.stack);
    res.status(500).json({ error: 'Interal server error'});
  }
})

// UPDATE Statement, update one product
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

// INSERT Statements, insert Product and then insert Inventory
app.post('/addProduct', async (req, res) => {
  try {
      const { Name, Type, ISBN, Title, Author, PublishDate, Publisher, Price } = req.body;

      // Validate incoming data
      if (!Name || !Type || !Price) {
          return res.status(400).json({ error: 'Name, Type, and Price are required fields' });
      }

      // Start a transaction
      pool.getConnection((err, connection) => {
          if (err) {
              console.error('Error starting transaction:', err);
              return res.status(500).json({ error: 'Internal server error' });
          }

          connection.beginTransaction(async (transactionErr) => {
              if (transactionErr) {
                  console.error('Error beginning transaction:', transactionErr);
                  return res.status(500).json({ error: 'Internal server error' });
              }

              try {
                  // Execute the SQL INSERT statement to add the product to the Products table
                  const productInsertQuery = 'INSERT INTO Products (Name, Type, ISBN, Title, Author, PublishDate, Publisher, Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                  const productInsertParams = [Name, Type, ISBN, Title, Author, PublishDate, Publisher, Price];
                  
                  connection.query(productInsertQuery, productInsertParams, async (productInsertError, productInsertResults) => {
                      if (productInsertError) {
                          console.error('Error adding product:', productInsertError);
                          connection.rollback(() => {
                              res.status(500).json({ error: 'Internal server error' });
                          });
                          return;
                      }

                      // Retrieve the auto-generated ID of the newly inserted product
                      const productId = productInsertResults.insertId;

                      // Execute the SQL INSERT statement to add a corresponding entry to the Inventory table
                      const inventoryInsertQuery = 'INSERT INTO Inventory (ProductID, Quantity) VALUES (?, ?)';
                      const inventoryInsertParams = [productId, 0];

                      connection.query(inventoryInsertQuery, inventoryInsertParams, async (inventoryInsertError, inventoryInsertResults) => {
                          if (inventoryInsertError) {
                              console.error('Error adding inventory:', inventoryInsertError);
                              connection.rollback(() => {
                                  res.status(500).json({ error: 'Internal server error' });
                              });
                              return;
                          }

                          // Commit the transaction
                          connection.commit((commitError) => {
                              if (commitError) {
                                  console.error('Error committing transaction:', commitError);
                                  connection.rollback(() => {
                                      res.status(500).json({ error: 'Internal server error' });
                                  });
                                  return;
                              }

                              console.log('Transaction committed successfully');
                              res.status(201).json({ message: 'Product added successfully' });
                          });
                      });
                  });
                  
              } catch (error) {
                  console.error('Error adding product:', error);
                  connection.rollback(() => {
                      res.status(500).json({ error: 'Internal server error' });
                  });
              } finally {
                  // Release the connection
                  connection.release();
              }
          });
      });
  } catch (error) {
      console.error('Error adding product:', error);
      // Send an error response
      res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE Statement, update quantity in inventory
app.put('/updateInventory', async (req, res) => {
    try {
        const updatedInventory = req.body;

        // Extract individual fields from the inventory object
        const { Quantity, ProductID } = updatedInventory;

        // Execute the SQL UPDATE statement
        pool.query(
            'UPDATE Inventory SET Quantity = ? WHERE ProductID = ?',
            [Quantity, ProductID],
            (error, results) => {
                if (error) {
                    console.error('Error updating inventory:', error);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    // Product updated successfully
                    console.log('Inventory updated successfully');
                    res.status(200).json({ message: 'Inventory updated successfully' });
                }
            }
        );
    } catch (error) {
        console.error('Error updating inventory:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
})

// SELECT Statement, get price of one product
app.get('/getProductPrice/:productID', (req, res) => {
  const { productID } = req.params;

  pool.query('SELECT Price FROM Products WHERE ID = ?', [productID], (error, results) => {
      if (error) {
          console.error('Error fetching product price:', error);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          if (results.length === 0) {
              res.status(404).json({ error: 'Product not found' });
          } else {
              const price = results[0].Price;
              res.json({ price });
          }
      }
  });
});

// INSERT Statement, insert new order
app.post('/addOrder', async (req, res) => {
  try {
      const { CustID, Date, TotalPrice, Address } = req.body;

      if (!CustID || !Date || !TotalPrice || !Address) {
          return res.status(400).json({ error: 'CustID, Date, TotalPrice, and Address are required fields' });
      }

      const orderInsertQuery = 'INSERT INTO Orders (CustID, Date, TotalPrice, Address) VALUES (?, ?, ?, ?)';
      const orderInsertParams = [CustID, Date, TotalPrice, Address];

      pool.query(orderInsertQuery, orderInsertParams, (error, results) => {
          if (error) {
              console.error('Error adding order:', error);
              res.status(500).json({ error: 'Internal server error' });
          } else {
              console.log('Order added successfully');
              const orderId = results.insertId;
              res.status(201).json({ orderId: orderId, message: 'Order added successfully' });
          }
      });
  } catch (error) {
      console.error('Error adding order:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// INSERT Statement, insert order details
app.post('/addOrderDetails', async (req, res) => {
  try {
      const { OrderID, ProductID, Quantity } = req.body;

      if (!OrderID || !ProductID || !Quantity) {
          return res.status(400).json({ error: 'OrderID, ProductID, and Quantity are required fields' });
      }

      const orderDetailsInsertQuery = 'INSERT INTO OrderDetails (OrderID, ProductID, Quantity) VALUES (?, ?, ?)';
      const orderDetailsInsertParams = [OrderID, ProductID, Quantity];

      pool.query(orderDetailsInsertQuery, orderDetailsInsertParams, (error, results) => {
          if (error) {
              console.error('Error adding order details:', error);
              res.status(500).json({ error: 'Internal server error' });
          } else {
              console.log('Order details added successfully');
              res.status(201).json({ message: 'Order details added successfully' });
          }
      });
  } catch (error) {
      console.error('Error adding order details:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// SELECT Statement, get all order details for an order
app.get('/orderDetails/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
      const orderDetailsQuery = 'SELECT * FROM OrderDetails WHERE OrderID = ?';
      pool.query(orderDetailsQuery, [orderId], async (error, results) => {
        if (error) {
          console.error('Error querying database: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        if (results.length === 0){
          return res.status(404).json({ error: 'Product not found'});
        }
        console.log('Query results:', results);
        const orderDetails = results.map(detail => ({
          OrderID: detail.OrderID,
          ProductID: detail.ProductID,
          Quantity: detail.Quantity
        }));
        res.status(200).json({ orderDetails });
      });
  } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// SELECT Statement, get all inventory rows
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

// SELECT Statement, get all orders
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

// SELECT Statement, get all customers
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

// INSERT Statement, insert new customer
app.post('/addCustomer', async (req, res) => {
    try {
        const { Fname, Lname, Phone, Email, ShippingAddress } = req.body;

        // Validate incoming data
        // Validate incoming data
        if (!Fname || !Lname || !Phone || !Email || !ShippingAddress) {
            return res.status(400).json({ error: 'First name, last name, phone number, email, and shipping address are required fields' });
        }

        // Start a transaction
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error starting transaction:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }

            connection.beginTransaction(async (transactionErr) => {
                if (transactionErr) {
                    console.error('Error beginning transaction:', transactionErr);
                    return res.status(500).json({ error: 'Internal server error' });
                }
            
                try {
                    // Execute the SQL INSERT statement to add the customer to the Customer table
                    const customerInsertQuery = 'INSERT INTO Customers (Fname, Lname, Phone, Email, ShippingAddress) VALUES (?, ?, ?, ?, ?)'
                    const customerInsertParams = [Fname, Lname, Phone, Email, ShippingAddress]

                    connection.query(customerInsertQuery, customerInsertParams, async (customerInsertError, customerInsertResults) => {
                        if (customerInsertError) {
                            console.error('Error adding customer:', customerInsertError);
                                connection.rollback(() => {
                                    res.status(500).json({ error: 'Internal server error' });
                                });
                            return;
                        }

                        // Commit the transaction
                        connection.commit((commitError) => {
                            if (commitError) {
                                console.error('Error committing transaction:', commitError);
                                connection.rollback(() => {
                                    res.status(500).json({ error: 'Internal server error' });
                                });
                                return;
                            }

                            console.log('Transaction committed successfully');
                            res.status(201).json({ message: 'Customer added successfully' });
                        });
                    });

                } catch (error) {
                    console.error('Error adding customer:', error);
                    connection.rollback(() => {
                        res.status(500).json({ error: 'Internal server error' });
                    });
                } finally {
                    // Release the connection
                    connection.release();
                }
            });
        });
    } catch (error) {
        console.error('Error adding customer:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE Statement, update a customer
app.put('/updateCustomer', async (req, res) => {
    try {
        const updatedCustomer = req.body;

        // Extract individual fields from the customer object
        const { Fname, Lname, Phone, Email, ShippingAddress, CustID } = updatedCustomer;

        // Execute the SQL UPDATE statement
        pool.query(
            'UPDATE Customers SET Fname = ?, Lname = ?, Phone = ?, Email = ?, ShippingAddress = ? WHERE CustID = ?',
            [Fname, Lname, Phone, Email, ShippingAddress, CustID],
            (error, results) => {
                if (error) {
                    console.error('Error updating customer:', error);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    // Product updated successfully
                    console.log('Customer updated successfully');
                    res.status(200).json({ message: 'Customer updated successfully' });
                }
            }
        );
    } catch (error) {
        console.error('Error updating product:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/updateInventory', (req, res) => {
    const { ProductID, Quantity } = req.body;

    if (!ProductID || !Quantity) {
        return res.status(400).json({ error: 'OrderID, ProductID, and Quantity are required fields' });
    }
    // Update the inventory in the database
    const sql = 'UPDATE Inventory SET Quantity = Quantity - ? WHERE ProductID = ?';
  
    pool.query(sql, [Quantity, ProductID], (err, result) => {
      if (err) {
        console.error('Error updating inventory:', err);
        res.status(500).json({ error: 'Error updating inventory' });
        return;
      }
  
      console.log('Inventory updated successfully');
      res.status(200).json({ message: 'Inventory updated successfully' });
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("Server started on port ", PORT)})