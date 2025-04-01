// schema.js
import { gql } from 'apollo-server';

export const typeDefs = gql`
  type NewsSummary {
    title: String
    summary: String
  }

  type ReviewAnalysis {
    originalReview: String
    sentiment: String
    score: Float
  }

  type Query {
    """
    AI-based local news summarization using the Gemini API.
    """
    getLocalNewsSummaries(location: String!): [NewsSummary]

    """
    Generate discussion topics using the Gemini API.
    """
    getDiscussionTopics(context: String!): [String!]

    """
    Perform sentiment analysis on customer reviews via the Gemini API.
    """
    analyzeReviews(reviews: [String!]!): [ReviewAnalysis!]

    """
    Suggest event topics using the Gemini API.
    """
    suggestEventTopics(context: String!): [String!]
  }
`;
