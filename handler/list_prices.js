const stripe = require("../config/stripe");
const price_list = async (req, res) => {
  try {
    const price = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY,
    });
    return res.json({ prices: price.data });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(401);
  }
};

module.exports = price_list;
