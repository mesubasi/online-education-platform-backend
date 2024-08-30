const express = require("express");
const server = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const authRoute = require("./routes/auth");

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

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use("/api/register", authRoute);

server.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
