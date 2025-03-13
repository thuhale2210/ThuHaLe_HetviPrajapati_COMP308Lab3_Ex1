const typeDefs = `#graphql
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key"])

  type User @key(fields: "id") {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    register(username: String!, email: String!, password: String!, role: String!): Boolean
  }
`;

export default typeDefs;
