require("dotenv").config();

const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = env;
