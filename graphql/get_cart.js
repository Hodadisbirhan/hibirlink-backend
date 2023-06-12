const { gql } = require("graphql-request");

const get_cart = gql`
  query ($userId: String!) {
    cart: shopping_cart(where: { user_id: { _eq: $userId } }) {
      product_id
      quantity
      product: physical_product {
        unit_price
        discount
        product_discount {
          rate
        }
      }
    }
  }
`;

module.exports = get_cart;
