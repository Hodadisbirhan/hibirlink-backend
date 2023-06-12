const { gql } = require("graphql-request");

const handle_order = gql`
  mutation handleOrder($userId: String!, $data: product_order_insert_input!) {
    ins_order: insert_product_order_one(object: $data) {
      id
      user {
        email
        first_name
        last_name
      }
    }
    del_cart: decrease_cart_from_product(args: { u_id: $userId }) {
      id
    }
  }
`;

module.exports = handle_order;
