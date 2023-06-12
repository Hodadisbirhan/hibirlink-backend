// const axios = require("../config/axios");
const config = require("../config/chapa");
const client = require("../config/client");
const get_cart = require("../graphql/get_cart");
const payable = require("../graphql/payable");
const handle_order = require("../graphql/handle_order");
const axios = require("axios").default;
const accept_payment = async (req, res) => {
  // chapa redirect you to this url when payment is successful
  const CALLBACK_URL = "http://localhost:4000/api/verify-payment/";
  const RETURN_URL = "http://localhost:4000/api/payment-success/";

  // a unique reference given to every transaction
  const { paymentArg } = req.body.input;
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();
  const shippingFee = paymentArg.deliveryOption ? 100 : 0;
  const transactionFee = 3;
  const data = [];

  console.log("update_data");

  try {
    const { cart } = await client.request(get_cart, {
      userId: paymentArg.userId,
    });
    for (each of cart) {
      data.push({
        product_id: each.product_id,
        quantity: each.quantity,
        unit_price: each.product.unit_price,
        discount: each.product.discount,
        special_discount_rate: each.product.product_discount?.rate,
        status: "unpaid",
      });
    }

    const { user } = await client.request(payable, {
      userId: paymentArg.userId,
    });

    const totalPayable =
      user.total_price +
      user.total_price * (transactionFee / 100) +
      shippingFee;

    const { ins_order, del_cart } = await client.request(handle_order, {
      userId: paymentArg.userId,
      data: {
        customer_id: paymentArg.userId,
        transaction_key: TEXT_REF,
        status: "pending",
        shipping_id: paymentArg.addressId,
        shipping_fee: shippingFee,
        with_delivery: paymentArg.deliveryOption,
        order_details: {
          data,
        },
      },
    });

    const description = `${ins_order.id}`;
    // console.log("the discription _i", description);
    const paymentData = {
      amount: totalPayable,
      currency: "ETB",
      email: ins_order?.user?.email,
      first_name: ins_order?.user?.first_name,
      last_name: ins_order?.user?.last_name,
      tx_ref: TEXT_REF,
      callback_url: CALLBACK_URL + TEXT_REF,
      return_url: RETURN_URL,
      customization: {
        description: description,
      },
    };
    const CHAPA_URL = process.env.CHAPA_URL;
    let paymentUrl = null;

    await axios
      .post(CHAPA_URL, paymentData, config)
      .then((response) => {
        paymentUrl = response.data.data.checkout_url;
      })
      .catch((err) => console.log(err));

    res.json({ success: true, paymentUrl: paymentUrl });
  } catch (err) {
    console.log(err);
  }
};

module.exports = accept_payment;
