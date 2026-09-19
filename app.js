require('dotenv').config();
const express = require("express");
const app = express();
const connectDB = require('./config/db');
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");

// FIX 1: Add errorHandler to the import
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");

// FIX 2: Actually call the database connection function
connectDB();

const morgan = require("morgan");
app.use(morgan("dev"));

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/error', (req, res, next) => {
  const error = new Error("Network problem");
  next(error);
});

// Use the tourRouter for all "/tours" routes
app.use("/api/tours", tourRouter);

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);

// Global Error Handlers must be at the very bottom
app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});