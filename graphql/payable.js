const { gql } = require("graphql-request");

const payable = gql`
  query payable($userId: String!) {
    user: users_by_pk(id: $userId) {
      total_price
    }
  }
`;

module.exports = payable;
