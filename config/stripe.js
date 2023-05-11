const Stripe = require("stripe").default;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
  timeout: 30000,
});

module.exports = stripe;
