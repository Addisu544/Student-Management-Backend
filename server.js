const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Update CORS for production
// app.use(cors({
//   origin: [
//     'https://student-registaration.netlify.app/', // Your actual Netlify URL
//     'http://localhost:5173'
//   ],
//   credentials: true
// }));


// Allow ALL origins - for testing/debugging
app.use(cors({
  origin: '*',  // This allows any origin
 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Your existing routes...
app.use('/api', require('./src/routes/studentRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Student Management API is running!',
    environment: process.env.NODE_ENV
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});