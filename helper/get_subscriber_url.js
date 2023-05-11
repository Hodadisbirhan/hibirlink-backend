const client = require("../config/client");
const stripe = require("../config/stripe");
const add_subscribe_mutation = require("../graphql/add_subscriber");
const update_customer_subscription = require("../graphql/set_customer_subscription");

const get_subscriber_url = async (lookup_key, user) => {
  const prices = await stripe.prices.retrieve(lookup_key);

  const { email, stripe_id, subscriber_id } = user;
  // here is creating new customer for stripe subscription
  let customer = "";
  let should_update = true;
  if (!stripe_id) {
    should_update = true;
    customer = await stripe.customers.create({ email: email });

    const result = await client.request(update_customer_subscription, {
      // object: {
      //   price_id: prices.id,
      //   price_type: "ETB",
      //   quantity: 1,
      //   status: "unpaid",
      //   subscriber_id: subscriber_id,
      // },
      id: subscriber_id,
      stripe_id: customer.id,
    });

    console.log(result);
  } else {
    const result = await client.request(update_customer_subscription, {
      // object: {
      //   price_id: prices.id,
      //   price_type: "ETB",
      //   quantity: 1,
      //   status: "unpaid",

      //   subscriber_id: subscriber_id,
      // },
      id: subscriber_id,
      stripe_id: stripe_id,
    });
    // subscription_id = result.insert_subscription_one.id;
    console.log("result at this point", result);
  }

  // creating the session for the customer to perform subscrition billing.

  try {
    const session = await stripe.checkout.sessions.create(
      {
        billing_address_collection: "auto",
        line_items: [
          {
            price: prices.id,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:3000/cancel",
        customer: customer?.id || stripe_id,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    console.log("Well Done");
    /* here is the store the value of  in database.
    
know let me create the subscription session of the customer to the my subscription table.
    */

    //
    return { url: session.url, should_update };
  } catch (e) {
    return { error: e };
  }
  // in order to send the http only cookie in the we use headers:useRequestHeader(["cookie_name"])
};

module.exports = get_subscriber_url;
