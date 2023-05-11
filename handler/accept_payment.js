// const axios = require("../config/axios");
const config = require("../config/chapa");
const axios = require("axios").default;
const accept_payment = async (req, res) => {
  // chapa redirect you to this url when payment is successful
  const CALLBACK_URL = "http://localhost:4000/api/verify-payment/";
  const RETURN_URL = "http://localhost:4000/api/payment-success/";

  // a unique reference given to every transaction
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();

  // form data
  const { amount, first_name, currency, last_name, description, email } =
    req.body;
  console.log(req.body);

  const data = {
    amount: amount,
    currency: currency,
    email: email,
    first_name: first_name,
    last_name: last_name,
    tx_ref: TEXT_REF,
    callback_url: CALLBACK_URL + TEXT_REF,
    return_url: RETURN_URL,
    customization: {
      description: description,
    },
  };

  const CHAPA_URL = process.env.CHAPA_URL;

  await axios
    .post(CHAPA_URL, data, config)
    .then((response) => {
      res.json({ url: response.data.data.checkout_url });
    })
    .catch((err) => console.log(err));
};

module.exports = accept_payment;
