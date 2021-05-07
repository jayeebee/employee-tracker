const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'NA',
  database: 'employees'
});

module.exports = db;