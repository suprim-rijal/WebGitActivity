const express = require("express");
const router = express.Router();

// 1. Fixed the import path and function names to match your controller
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers"); // <-- Removed 's' if your file is tourController.js

// 2. Fixed the route handlers to match the imported functions
router.get("/", getTours);
router.post("/", createTour);
router.get("/:tourId", getTour);
router.put("/:tourId", updateTour);
router.delete("/:tourId", deleteTour);

module.exports = router;