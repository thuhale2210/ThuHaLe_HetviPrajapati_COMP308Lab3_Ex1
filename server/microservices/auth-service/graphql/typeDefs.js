// // // server/microservices/auth-service/graphql/typeDefs.js
// // // GraphQL type definitions
// // const typeDefs = `#graphql
// //   type User {
// //   id: ID!
// //   username: String!
// //   email: String!
// //   role: String!
// // }

// // type AuthPayload {
// //   token: String!  # This must not be null!
// //   user: User!
// // }

// // type Query {
// //   currentUser: User
// // }

// // type Mutation {
// //   login(username: String!, password: String!): AuthPayload  # Ensure the return type is AuthPayload
// //   register(username: String!, email: String!, password: String!, role: String!): Boolean
// // }

// // `;

// // // Export as an ES Module
// // export default typeDefs;


// const typeDefs = `#graphql
//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     role: String!
//     createdAt: String!  # ✅ Added missing field
//   }

//   type AuthPayload {
//     token: String!
//     user: User!
//   }

//   type Query {
//     currentUser: User
//   }

//   type Mutation {
//     login(username: String!, password: String!): AuthPayload
//     register(username: String!, email: String!, password: String!, role: String!): Boolean
//   }
// `;

// export default typeDefs;



const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!, role: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
