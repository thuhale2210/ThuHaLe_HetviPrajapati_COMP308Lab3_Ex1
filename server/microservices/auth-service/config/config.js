require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4001,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
