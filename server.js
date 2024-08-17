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

server.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
