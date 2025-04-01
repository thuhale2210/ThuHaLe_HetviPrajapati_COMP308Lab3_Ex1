// ai-microservice.js
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

// Use a fallback port (you can change it as needed)
const PORT = process.env.AI_SERVICE_PORT || 4003;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.listen(PORT).then(({ url }) => {
    console.log(`🚀 AI Service (Gemini API Integration) running at ${url}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start AI Service:", err);
});
