import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type User @key(fields: "id") {
    id: ID! @external
    role: String! @external
    createdAt: String! @external
  }

  type CommunityPost {
    id: ID!
    author: User!
    title: String!
    content: String!
    category: String!
    createdAt: String!
  }

  type HelpRequest {
    id: ID!
    author: User!
    description: String!
    location: String
    isResolved: Boolean!
    volunteers: [User]
    createdAt: String!
    updatedAt: String
  }

  extend type Query {
    getCommunityPosts: [CommunityPost]
    getHelpRequests: [HelpRequest]
  }

  extend type Mutation {
    createPost(title: String!, content: String!, category: String!): CommunityPost
    createHelpRequest(description: String!, location: String): HelpRequest
    resolveHelpRequest(id: ID!): Boolean
    volunteerForHelpRequest(id: ID!): HelpRequest
  }
`;

export default typeDefs;
