
const express = require('express');
// const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(express.json());









app.listen(3000, () => {console.log("Server started on port 3000")})