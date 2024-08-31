const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const path = require("path");
const jwt = require("jsonwebtoken");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 Dakika Bekleme
  limit: 10, // Deneme Sayısı
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req, res, next) => {
    res.status(429).sendFile(path.join(__dirname, "../views/429.html"));
  },
});

const handleLogin = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    //Mail Adresiyle Eşleşen Kullanıcı Yoksa
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }

    //Body'den gelen parolayı ve email adresiyle eşleşen kullanıcının parolasını karşılaştır
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //Parola yanlış girilmişse geçersiz parola dönder.
    if (!validPassword) {
      return res.status(403).json({ error: "Invalid Password!" });
    }

    //Parola doğru girilmişe değerleri dönder
    if (validPassword) {
      const accessToken = jwt.sign({ email: user.email }, null, {
        expiresIn: "30s",
      });
      return res.status(200).json({
        user: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

module.exports = { limiter, handleLogin };
