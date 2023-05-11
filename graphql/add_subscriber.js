const {gql} = require("graphql-request")





const add_subscribe_mutation = gql`
  mutation add_susbscription(
    $object: subscription_insert_input!
  ) {
    update_customer_stripe: update_supplier_by_pk(
      pk_columns: { id: $id }
      _set: { stripe_id: $stripe_id }
    ) {
      stripe_id
    }

    insert_subscription_one(object: $object) {
      id
      status
    }
  }
`;

module.exports = add_subscribe_mutation;