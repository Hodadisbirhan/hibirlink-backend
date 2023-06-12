const transfer = require("../config/smtp");

const send_email_handler = async (data) => {
  const { from, to, subject, html, text } = data;
  const mailOption = {
    from,
    to,
    subject,
    text,
    html,
  };
  console.log(to);
  return new Promise((resolve, reject) => {
    transfer.sendMail(mailOption, (error, info) => {
      if (error) {
        return reject({ status: 400, data: error });
      } else {
        return resolve({ status: 200, data: info.response });
      }
    });
  });
};




module.exports = send_email_handler;
