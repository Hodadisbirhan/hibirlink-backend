const stripe = require("../../config/stripe");

const stripe_create_post_session = async (req, res) => {
  const { id } = req.body;
  console.log("checking...");
  const checkout_session = await stripe.checkout.sessions.retrieve(id);
  console.log("id");

  const return_url = "http://localhost:3000";
  const portal_session = await stripe.billingPortal.sessions.create({
    customer: `${checkout_session.customer}`,
    return_url: return_url,
  });

  return res.json({ url: portal_session.url });
};

module.exports = stripe_create_post_session;
