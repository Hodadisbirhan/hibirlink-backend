const stripe = require("../../config/stripe");
const handle_subscription_change = require("../../helper/handlesubscriptionchange");

const strip_webhook = async (req, res) => {
  console.log("here is the stripe subscription hook is called");
  const sig = req.headers["stripe-signature"];
  console.log(sig);
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      const customerSubscriptionCreated = event.data.object;
      handle_subscription_change(customerSubscriptionCreated, event.created);
      console.log("here is the same thing");
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case "customer.subscription.deleted":
      const customerSubscriptionDeleted = event.data.object;
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case "customer.subscription.paused":
      const customerSubscriptionPaused = event.data.object;
      // Then define and call a function to handle the event customer.subscription.paused
      break;
    case "customer.subscription.pending_update_applied":
      const customerSubscriptionPendingUpdateApplied = event.data.object;
      // Then define and call a function to handle the event customer.subscription.pending_update_applied
      break;
    case "customer.subscription.pending_update_expired":
      const customerSubscriptionPendingUpdateExpired = event.data.object;
      // Then define and call a function to handle the event customer.subscription.pending_update_expired
      break;
    case "customer.subscription.resumed":
      const customerSubscriptionResumed = event.data.object;
      // Then define and call a function to handle the event customer.subscription.resumed
      break;
    case "customer.subscription.trial_will_end":
      const customerSubscriptionTrialWillEnd = event.data.object;
      // Then define and call a function to handle the event customer.subscription.trial_will_end
      break;
    case "customer.subscription.updated":
      const customerSubscriptionUpdated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case "invoice.payment_action_required":
      const invoicePaymentActionRequired = event.data.object;
      // Then define and call a function to handle the event invoice.payment_action_required
      break;
    case "invoice.payment_succeeded":
      const invoicePaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 to acknowledge receipt of the event
  res.send();
};

module.exports = strip_webhook;
