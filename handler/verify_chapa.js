const axios = require("../config/axios");
const config = require("../config/chapa");

const verify = async (req, res) => {
  //verify the transaction
  console.log(req);
  await axios
    .get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
    .then((response) => {
      console.log("Payment was successfully verified");
      console.log(response.data);
    })
    .catch((err) => console.log("Payment can't be verfied", err));
};

module.exports = verify;
