const { gql } = require("graphql-request");

const users_by_email = gql`
  query select_user_by_email($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;

module.exports = users_by_email;
