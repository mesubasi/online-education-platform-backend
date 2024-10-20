const express = require("express");
const server = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const reqHandler = require("./middleware/reqHandler");
const verifyJWT = require("./middleware/verifyJWT");

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

server.use(reqHandler);

//middlewares
server.use(logger("combined"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

// JWT doğrulaması olmayan Auth routes
server.use(errorHandler);
server.use("/api", require("./routes/register"));
server.use("/api", require("./routes/login"));
server.use(verifyJWT);
server.use("/api", require("./routes/course"));
server.use("/refreshtoken", require("./routes/refreshToken"));

server.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
