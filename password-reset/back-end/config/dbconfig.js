// server/config.js
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.SECRET_KEY,
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
