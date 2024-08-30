const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

//POST Register
const handleNewUser = async (req, res) => {
  try {
    //HTTP Post isteğinde body'den gönderilen veriler
    const { name, surname, email, password } = req.body;

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

    //Zorunlu Alan Kontrolü
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password Are Required!",
      });
    }

    //Veritabanına body'den gelen değerleri yakaldıktan sonra kaydetmek için
    const newUser = new Users({
      name,
      surname,
      email,
      password,
    });
    await newUser.save();

    //Kullanıcı Başarıyla Kayıt Olduğunda HTTP 200 Kodu Dönder
    res.status(200).json({ success: "A New User Created Successfully." });
  } catch (err) {
    //Sunucu İle İlgili Sorun Olması Durumunda İstemciye 500 kodu dönder
    res.status(500).json(err);
  }
};
