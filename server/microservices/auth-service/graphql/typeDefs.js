// server/microservices/auth-service/graphql/typeDefs.js
// GraphQL type definitions
const typeDefs = `#graphql
  type User {
  id: ID!
  username: String!
  email: String!
  role: String!
}

type AuthPayload {
  token: String!  # This must not be null!
  user: User!
}

type Query {
  currentUser: User
}

type Mutation {
  login(username: String!, password: String!): AuthPayload  # Ensure the return type is AuthPayload
  register(username: String!, email: String!, password: String!, role: String!): Boolean
}

`;

// Export as an ES Module
export default typeDefs;
