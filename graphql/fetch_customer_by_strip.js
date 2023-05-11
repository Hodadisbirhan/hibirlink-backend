const { gql } = require("graphql-request");

const customer = gql`
  query fetchCustomer_by_stripe_id($stripe_id: String!) {
    supplier(where: { stripe_id: { _eq: $stripe_id } }) {
      id
    }
  }
`;

module.exports = customer;
