const express = require("express");
const api = express.Router();
const authController = require("../controllers/authController");

api.post("/register", authController.handleNewUser);

module.exports = router;
