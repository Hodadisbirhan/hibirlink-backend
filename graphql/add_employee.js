const { gql } = require("graphql-request");

const add_employer = gql`
  mutation add_employeer($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;

module.exports = add_employer;
