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
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  info("Connected to MongoDB ...");
  app.listen(PORT, () => {
    info(`Server is running at http://localhost:${PORT}`);
  });
})
.catch((error) => {
  err("Error connecting to MongoDB:", error);
});

app.use('/user', userRouter);
app.use('/login', loginRouter);

module.exports = app; // Export the app if needed for testing or other purposes
