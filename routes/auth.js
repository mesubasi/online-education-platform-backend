const Users = require("../models/Users");
const api = require("express").Router();
const bcrypt = require("bcrypt");

//POST Register
const handleNewUser = async (req, res) => {
  try {
    //HTTP Post isteğinde body'den gönderilen veriler
    const { name, surname, email, password } = req.body;

    //Bcrypt Hash oluşturmak için
    const salt = await bcrypt.genSalt(10);

    //password değerini oluşturulan hash ile şifrelemek için
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await Users.findOne({ email });

    //Kullanıcı Varsa Kontrolü
    if (existingUser) {
      return res.status(403).json({ error: "Email already in use!" });
    }

    //Kayıt Olurken Email veya Parola Olmadan Kayıt olmaya Çalışılırsa Zorunlu Olduğunu Belirt
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password Are Required!",
      });
    }

    //Veritabanına body'den gelen değerleri yakaldıktan sonra kaydetmek için
    const newUser = newUser({
      name,
      surname,
      email,
      password,
    });
    await newUser.save();

    //Kullanıcı Başarıyla Kayıt Olduğunda HTTP 200 Kodu Dönder.
    res.status(200).json({ success: "A New User Created Successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
};
