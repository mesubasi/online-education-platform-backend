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

//POST Register
const handleNewUser = async (req, res) => {
  try {
    //HTTP Post isteğinde body'den gönderilen veriler
    const { username, email, password } = req.body;

    //Bcrypt Hash oluşturmak için
    const salt = await bcrypt.genSalt(10);

    //password değerini oluşturulan hash ile şifrelemek için
    const hashedPassword = await bcrypt.hash(password, salt);

    //Kullanıcı varsa kontrolü için veritabanından email adresini bul
    const existingUser = await Users.findOne({ email });

    //Kullanıcı Varsa Kontrolü
    if (existingUser) {
      return res.status(403).json({ error: "Email already in use!" });
    }

    const existingUsername = await Users.findOne({ username });

    if (existingUsername) {
      return res.status(403).json({ error: "Username already in use!" });
    }

    //Zorunlu Alan Kontrolü
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, Email, and Password Are Required!",
      });
    }

    //Veritabanına body'den gelen değerleri yakaldıktan sonra kaydetmek için
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    //Kullanıcı Başarıyla Kayıt Olduğunda HTTP 200 Kodu Dönder
    res.status(200).json({ success: "A New User Created Successfully." });
  } catch (err) {
    //Sunucu İle İlgili Sorun Olması Durumunda İstemciye 500 kodu dönder
    res.status(500).json({ error: err.message });
  }
};

module.exports = { limiter, handleNewUser };
