
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'bookstoreAdmin',
    password: 'pa55w0rd',
    database: 'bookstoredb',
});

pool.on('connection', () => {
    console.log("Connected to the database");
})

pool.on('error', (err) => {
    console.error("Database connection error:", err.message);
});

module.exports = pool;