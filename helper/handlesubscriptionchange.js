const client = require("../config/client");
const add_subscribe_mutation = require("../graphql/add_subscriber");
const customer = require("../graphql/fetch_customer_by_strip");

const handle_subscription_change = async (subscription, lastEventDate) => {
  const stripe_customer_id = subscription.customer;

  try {
    // to fetch the supplier_id through the stripe id
    const result_customer = await client.request(customer, {
      stripe_id: stripe_customer_id,
    });

    console.log(result);

    const add_subscription_result = await client.request(
      add_subscribe_mutation,
      {
        object: {
          price_id: subscription.items.data[0].price.id,
          price_type: "ETB",
          quantity: subscription.description,
          status: subscription.status,
          subscriber_id: result_customer.supplier[0].id,
        },
      }
    );

    console.log(add_subscription_result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = handle_subscription_change;
