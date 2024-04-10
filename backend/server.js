
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.json());
app.use(cors());

app.get('/getBooks', async (req, res) => {
    console.log('Attempting to query the database');
    pool.query('SELECT * FROM Products WHERE Type = "Book"', async (error, results) => {
        if (error) {
          console.error('Error querying database: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        console.log(results.json());
        res.json(results);
      });
});






//const PORT = process.env.PORT || 5000;
app.listen(5000, () => {console.log("Server started on port 5000")})