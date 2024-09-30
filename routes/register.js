const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.post(
  "/api",
  registerController.limiter,
  registerController.handleNewUser
);

module.exports = router;
