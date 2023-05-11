const { gql } = require("graphql-request");

const add_driver_mutation = gql`
  mutation add_driver(
    $object: users_insert_input!
    $driver: delivery_driver_insert_input!
  ) {
    insert_users_one(object: $object) {
      id
    }
    insert_delivery_driver_one(object: $driver) {
      id
    }
  }
`;

module.exports = add_driver_mutation;
