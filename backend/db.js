
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'bookstoreAdmin',
    password: 'pa55w0rd',
    database: 'bookstoredb',
});

pool.query('SELECT 1', (error, results) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Database connection successful');
    }
});

pool.on('connection', () => {
    console.log("Connected to the database");
})

pool.on('error', (err) => {
    console.error("Database connection error:", err.message);
});


module.exports = pool;