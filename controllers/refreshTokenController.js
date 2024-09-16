const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // Refresh Token yoksa

    const refreshToken = cookies.jwt;

    // Refresh Token ile kullanıcıyı MongoDB'den bul
    const foundUser = await Users.findOne({ refreshToken }).exec();

    if (!foundUser) return res.sendStatus(403); // Kullanıcı bulunamazsa

    // Token'ı doğrula
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email)
          return res.sendStatus(403); // Hatalı token veya kullanıcı

        // Yeni Access Token oluştur
        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" } // Önerilen süre
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ error: "Refresh token validation failed", details: err.message });
  }
};

module.exports = { handleRefreshToken };
