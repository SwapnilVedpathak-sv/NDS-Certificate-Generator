const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.generateToken = (payload) => {
  return jwt.sign(payload, "process.env.TOKEN_SECRET", {
      expiresIn: "90d",
  });
};
