const express = require('express');
const router = express.Router();

// 1. Fixed the import path and function names to match your controller
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userControllers'); // <-- Removed 's' if your file is userController.js

// 2. Fixed the route handlers to match the imported functions
router.get('/', getUsers);
router.post("/", createUser);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;