const { gql } = require("graphql-request");

const update_verify_token = gql`
  mutation update_token($id: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { invite_token: null }) {
      id
    }
  }
`;

module.exports = update_verify_token;
