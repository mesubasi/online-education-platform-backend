const express = require("express");
const server = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
