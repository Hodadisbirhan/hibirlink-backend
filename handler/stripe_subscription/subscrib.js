const client = require("../../config/client");
const fetch_supplier_by_id = require("../../graphql/fetch_supplier_by_id");
const get_subscriber_url = require("../../helper/get_subscriber_url");

const subscribe = async (req, res) => {
  const { id, lookup_key } = req.body;
  console.log(id, lookup_key);
  try {
    const customer_by_id = await client.request(fetch_supplier_by_id, {
      id: id,
    });

    console.log(customer_by_id);
    let stripe_id = customer_by_id?.customer?.stripe_id
      ? customer_by_id?.customer?.stripe_id
      : false;
    console.log(customer_by_id);

    const { url, error, should_update } = await get_subscriber_url(lookup_key, {
      email: customer_by_id.customer.userById.email,
      stripe_id: stripe_id,
      subscriber_id: id,
    });
    console.log("Paid");

    // if (should_update) {
    // }

    if (error) {
      console.log(error);

      return res.sendStatus(401);
    }
    return res.json({ url: url });
  } catch (error) {
    console.log(error);
  }
};

module.exports = subscribe;
