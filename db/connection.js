const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Viktor',
  database: 'employees'
});

module.exports = db;