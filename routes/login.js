const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.post("/login", loginController.limiter, loginController.handleLogin);

module.exports = router;
