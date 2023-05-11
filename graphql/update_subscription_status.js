const { gql } = require("graphql-request");

const update_subs_status = gql`
  mutation update_subscription_status($status: String!, $id: Int!) {
    update_subscription_by_pk(
      pk_columns: { id: $id }
      _set: { status: $status }
    ) {
      status
    }
  }
`;

module.exports = update_subs_status;
