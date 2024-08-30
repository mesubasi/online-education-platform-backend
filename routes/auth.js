const Users = require("../models/Users");
const api = require("express").Router();
const bcrypt = require("bcrypt");

//POST Register
api.post("/register", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "Email already in use!" });
    }
  } catch (err) {
    console.log(err);
  }
});
