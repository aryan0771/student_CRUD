const mysql = require('mysql');

const pool = mysql.createPool({
     
      connectionLimit:10,
      port     : process.env.SQL_PORT,
      host     : process.env.SQL_HOSTNAME,
      user     : process.env.SQL_USER,
      password : process.env.SQL_PASSWORD,
      database : process.env.SQL_DB_NAME

  });
    

module.exports = pool;