const { gql } = require("graphql-request");
 
const update_customer_subscription = gql `
mutation add_susbscription(
    $id: String!
    $stripe_id: String!
  ) {
update_customer_stripe: update_supplier_by_pk(
      pk_columns: { id: $id }
      _set: { stripe_id: $stripe_id }
    ) {
      stripe_id
    }
   }`


module.exports = update_customer_subscription;