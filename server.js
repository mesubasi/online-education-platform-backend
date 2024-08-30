const express = require("express");
const server = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (err) {
    throw err;
  }
};

//JSON body değerlerini ayrıştırmak için Middleware
server.use(express.json());

// form verilerini ayrıştırmak için middleware
server.use(express.urlencoded({ extended: false }));

//routes
server.use("/register", require("./routes/auth"));

server.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
