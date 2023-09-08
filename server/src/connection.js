var mysql = require('mysql2/promise');

const con = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Leoo@1202",
    database: "shopper"
  });
  
  module.exports = con