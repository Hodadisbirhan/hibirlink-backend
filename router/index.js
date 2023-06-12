const express = require("express");
const accept_payment = require("../handler/accept_payment");
const runCompletion = require("../handler/chat_open_ai");
const price_list = require("../handler/list_prices");
const send_email_handler = require("../helper/send_email");
const checkout_ssession_stripe = require("../handler/stripe_subscription/checkout_ssession");
const stripe_create_post_session = require("../handler/stripe_subscription/stripe_create_port_session");
const subscribe = require("../handler/stripe_subscription/subscrib");
const subscription_sucess = require("../handler/stripe_subscription/subscription_sucess");
const strip_webhook = require("../handler/stripe_subscription/webhook");
const verify = require("../handler/verify_chapa");
const send_email_message = require("../handler/email_send_with_token");
const user_exist_checker = require("../middleware/check_user_exists");
const verify_user_by_token = require("../handler/verify_user_by_token");
const verify_token = require("../middleware/verify_token");
const add_driver_handler = require("../handler/add_driver_handler");
const add_delivery = require("../handler/add_delivery");

const router = express.Router();

router.post("/", subscribe);

router.get("/", async (req, res) => {
  console.log("the Server is Running Here");
  console.log(req);
  return res.json({ success: "showd" });
});

router.get("/api/payment-success", async (req, res) => {
  res.render("success");
});

router.get("/", (req, res) => {
  res.render("index");
});
router.post("/api/make-payment", accept_payment);

router.get("/api/verify-payment/:id", verify);

router.post("/create-checkout-session", subscribe);
router.post("/manage_subscription", stripe_create_post_session);
router.get("/prices", price_list);
router.post("/chat", runCompletion);
router.post("/stripe/webhook", strip_webhook);
router.post("/subscription_success", subscription_sucess);
router.post("/add_employer", user_exist_checker, send_email_message);
router.post("/verify_token", verify_token, verify_user_by_token);
router.post("/add_driver", user_exist_checker, add_driver_handler);
router.post("/sendEmail", async (req, res) => {
  const { from, to, text, subject } = req.body.input.input;

  try {
    const response = await send_email_handler({ from, to, text, subject });

    return res.status(200).json({ message: "sent" });
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post("/add_delivery", user_exist_checker, add_delivery);

module.exports = router;
