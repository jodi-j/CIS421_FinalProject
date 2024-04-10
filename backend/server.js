
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.json());
app.use(cors());

app.get('/getBooks', async (req, res) => {
    console.log('Attempting to query the database');
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






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("Server started on port ", PORT)})