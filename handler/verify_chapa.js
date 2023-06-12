const axios = require("../config/axios");
const config = require("../config/chapa");
const update_order = require("../graphql/update_order");
const client = require("../config/client");

const verify = async (req, res) => {
  //verify the transaction
  console.log(req);
  await axios
    .get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
    .then(async (response) => {
      const orderId = Number(response.data.data.customization.description);
      await client.request(update_order, {
        orderId: orderId,
        orderStatus: "pending",
      });
    })
    .catch((err) => console.log("Payment can't be verfied", err));
};

module.exports = verify;
