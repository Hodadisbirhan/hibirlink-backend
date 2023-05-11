const client = require("../../config/client");
const update_subs_status = require("../../graphql/update_subscription_status");

const subscription_sucess = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await client.request(update_subs_status, {
      id: id,
      status: "paid",
    });
    console.log(result);
    return res.json({ message: "sucess" });
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = subscription_sucess;
