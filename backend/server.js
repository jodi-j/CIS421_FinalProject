
const express = require('express');
// const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.json());

app.get('/getBooks', (req, res) => {
    pool.query('SELECT * FROM Products WHERE Type = "Book"',  (error, results, fields) => {
        if (error) {
          console.error('Error querying database: ' + error.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
    
        res.json(results);
      });
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log("Server started on port 3000")})