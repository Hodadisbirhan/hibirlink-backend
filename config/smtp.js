const nodemailer = require("nodemailer");

const transfer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // secure: false,
  service: "gmail",
  secure: true,
  logger: true,
  debug: true,
  ignoreTLS: true,
  auth: {
    user: "hodadisbirhan80@gmail.com",
    pass: "bagymcsrrzwqhjzo",
  },
});

module.exports = transfer;
