const Users = require("../models/Users");
const api = require("express").Router();
const bcrypt = require("bcrypt");

//POST Register
api.post("/register", async (req, res) => {
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
  } catch (err) {
    res.status(500).json(err);
  }
});
