require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { MONGODB_URI, PORT } = require('./utils/config');
const { info, err } = require('./utils/logger');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/register');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('Connecting to MongoDB...');

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB...');
    // Define routes
    app.use('/user', userRouter);
    app.use('/login', loginRouter);

    // Error handling middleware
    app.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500;
      res.status(err.statusCode).json({
        error: {
          message: err.message,
        },
      });
    });

    // Start the server
    app.listen(PORT, () => {
      info(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    err('Error connecting to MongoDB:', error);
    // Terminate the process or handle the error accordingly
    process.exit(1);
  });

module.exports = app;
