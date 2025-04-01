// resolvers.js
import axios from 'axios';

// Use a fallback API key (replace with your actual Gemini API key)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBuGdC3W41Gf9bGfQqK7l55boBdg2wSZ4c';

// Helper functions to call the Gemini API endpoints
async function geminiSummarizeNews(location) {
  try {
    const response = await axios.post(
      'https://api.gemini.ai/summarize',
      { location },
      { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } }
    );
    // Assuming the API returns { summary: "..." } for each article
    return [
      {
        title: `News for ${location}`,
        summary: response.data.summary || "AI-generated summary not available."
      }
    ];
  } catch (error) {
    console.error("Gemini Summarize Error:", error.message);
    return [
      { title: `News for ${location}`, summary: "Error summarizing news." }
    ];
  }
}

async function geminiDiscussionTopics(context) {
  try {
    const response = await axios.post(
      'https://api.gemini.ai/discussion',
      { context },
      { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } }
    );
    // Assuming the API returns { topics: ["Topic 1", "Topic 2", ...] }
    return response.data.topics || [`No topics generated for ${context}`];
  } catch (error) {
    console.error("Gemini Discussion Error:", error.message);
    return [`Error generating topics for ${context}`];
  }
}

async function geminiSentimentAnalysis(review) {
  try {
    const response = await axios.post(
      'https://api.gemini.ai/sentiment',
      { text: review },
      { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } }
    );
    // Assuming the API returns { sentiment: "Positive", score: 0.9 }
    return {
      sentiment: response.data.sentiment || "Unknown",
      score: response.data.score || 0.0
    };
  } catch (error) {
    console.error("Gemini Sentiment Error:", error.message);
    return { sentiment: "Neutral", score: 0.5 };
  }
}

async function geminiEventSuggestions(context) {
  try {
    const response = await axios.post(
      'https://api.gemini.ai/event-suggestions',
      { context },
      { headers: { Authorization: `Bearer ${GEMINI_API_KEY}` } }
    );
    // Assuming the API returns { suggestions: ["Event 1", "Event 2", ...] }
    return response.data.suggestions || [`No event suggestions for ${context}`];
  } catch (error) {
    console.error("Gemini Event Suggestions Error:", error.message);
    return [`Error suggesting events for ${context}`];
  }
}

export const resolvers = {
  Query: {
    getLocalNewsSummaries: async (_, { location }) => {
      return await geminiSummarizeNews(location);
    },
    getDiscussionTopics: async (_, { context }) => {
      return await geminiDiscussionTopics(context);
    },
    analyzeReviews: async (_, { reviews }) => {
      // Call sentiment analysis for each review using Gemini API
      const results = await Promise.all(
        reviews.map(async (review) => {
          const analysis = await geminiSentimentAnalysis(review);
          return {
            originalReview: review,
            sentiment: analysis.sentiment,
            score: analysis.score
          };
        })
      );
      return results;
    },
    suggestEventTopics: async (_, { context }) => {
      return await geminiEventSuggestions(context);
    }
  }
};
