const { gql } = require("graphql-request");

const users_by_token = gql`
  query fetch_user_by_token($token: String!) {
    users(where: { invite_token: { _eq: $token } }) {
      id
      email
      first_name
      last_name
    }
  }
`;

module.exports = users_by_token;
