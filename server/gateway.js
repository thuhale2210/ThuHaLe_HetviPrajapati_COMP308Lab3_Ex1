const { ApolloServer } = require("apollo-server-express");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Define federated services
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "auth-service", url: process.env.AUTH_SERVICE_URL },
      { name: "community-service", url: process.env.COMMUNITY_SERVICE_URL },
    ],
  }),
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  },
});

class AuthenticatedDataSource extends require("@apollo/gateway").RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    if (context.token) {
      request.http.headers.set("Authorization", `Bearer ${context.token}`);
    }
  }
}

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Start Apollo Server with Apollo Gateway
const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    // Extract token from request headers
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

    return { token }; // ✅ Now forwarding token to subgraphs
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`✅ API Gateway running at http://localhost:${PORT}/graphql`);
  });
}

startServer();
