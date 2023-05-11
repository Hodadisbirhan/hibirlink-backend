const stripe = require("../../config/stripe");

const checkout_ssession_stripe = async (req, res) => {
  const { priceID } = { priceID: "price_1MnSbnFtsvRvg0TQS9JErSpR" };
try{

    const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      success_url: "https://hodadisportifoiliocms.netlify.app",
      cancel_url: "https://food-recipe-app-hodadis.netlify.app",
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  console.log(req);

  return res.json({ session });
  
}
catch(e){



  res.sendStatus(401);
}

};

module.exports = checkout_ssession_stripe;
