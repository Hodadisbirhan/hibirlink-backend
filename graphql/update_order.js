const { gql } = require("graphql-request");

const update_order = gql`
  mutation updateOrder($orderId: bigint!, $orderStatus: String!) {
    update_order_detail(
      where: { order_id: { _eq: $orderId } }
      _set: { status: $orderStatus }
    ) {
      affected_rows
    }
  }
`;

module.exports = update_order;
