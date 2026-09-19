require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const jobRouter = require("../routes/jobRouter");
const {
  unknownEndpoint,
  errorHandler,
} = require("../middleware/customMiddleware");
const connectDB = require("../config/db");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());


// Use the jobRouter for all "/jobs" routes
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

mongoose
  .connect("mongodb+srv://suprimrijal1_db_user:5K8dOm9Re4HQNCK7@cluster0.paw7s6o.mongodb.net/week4-activity?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = app;

