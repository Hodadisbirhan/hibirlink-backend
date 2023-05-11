const { gql } = require("graphql-request");

const fetch_supplier_by_id = gql`
  query fetch_supplier($id: String!) {
    customer: supplier_by_pk(id: $id) {
      id
      stripe_id
      userById {
        email
      }
      
    }
  }
`;

module.exports = fetch_supplier_by_id;
