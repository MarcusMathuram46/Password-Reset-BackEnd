const mongoose = require('mongoose');
const express = require('express');
const { MONGODB_URI, PORT } = require('./utils/config');
const { info, err } = require('./utils/logger');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/register');

const app = express();

app.use(cors());
app.use(express.json());

console.log("Connecting to MongoDB...");
mongoose.connect(MONGODB_URI, {
  // Remove deprecated options and handle new connection settings
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true, // New option to handle deprecation warning for collection.ensureIndex
})
  .then(() => {
    info("Connected to MongoDB...");
    app.listen(PORT, () => {
      info(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    err("Error", error);
  });

app.use('/user', userRouter);
app.use('/login', loginRouter);

// Additional route handlers or middleware can be added here

// Example error handling middleware
app.use((err, req, res, next) => {
  // Handle errors gracefully
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
