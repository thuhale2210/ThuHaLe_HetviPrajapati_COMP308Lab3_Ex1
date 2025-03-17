// import gql from "graphql-tag";

// export const typeDefs = gql`
//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     role: String!
//     createdAt: String!
//   }

//   type AuthPayload {
//     user: User!
//     token: String!
//   }

//   type Query {
//     getUser(id: ID!): User
//   }

//   type Mutation {
//     signup(username: String!, email: String!, password: String!, role: String!): AuthPayload
//     login(email: String!, password: String!): AuthPayload
//   }
// `;

import gql from "graphql-tag"; 

export const typeDefs = gql`
  extend type Query {
    getUser(id: ID!): User
  }

  type User @key(fields: "id") {
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

  extend type Mutation {
    signup(username: String!, email: String!, password: String!, role: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;
