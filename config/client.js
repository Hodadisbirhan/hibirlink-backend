const { GraphQLClient } = require("graphql-request");

const client = new GraphQLClient(process.env.HASURA_END_POINT, {
  headers: {
    "x-hasura-admin-secret": process.env.ADMIN_SECRET,
  },
  timeout: 300000,
  
});

module.exports = client;
