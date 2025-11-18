// const mysql = require('mysql2');
// require('dotenv').config();

// // Create MySQL connection pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'student_management',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Convert pool to use promises
// const promisePool = pool.promise();

// module.exports = promisePool;







const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection pool with auth fix
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_management',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  ssl: { rejectUnauthorized: false },  // ← ADD THIS for Railway
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(password + '\0')
  }
});

const promisePool = pool.promise();

// Test connection with better error handling
promisePool.getConnection()
  .then(connection => {
    console.log('✅ Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.log('Connection details:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
  });

module.exports = promisePool;