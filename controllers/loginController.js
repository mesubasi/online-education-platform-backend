const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const path = require("path");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 Dakika Bekleme
  limit: 25, // Deneme Sayısı
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req, res, next) => {
    res.status(429).sendFile(path.join(__dirname, "../views/429.html"));
  },
});

const handleLogin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};
