const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const jwt = require("jsonwebtoken"); // ✅ Import JWT
require("dotenv").config(); // ✅ Ensure env is loaded
const connectDB = require("./config/mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express();
connectDB();

// ✅ Add Token Verification in Context
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }), // Enable Federation
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    let userId = null;

    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          userId = decoded.userId; // ✅ Extract userId
        } catch (error) {
          console.error("Invalid or Expired Token:", error.message);
        }
      }
    }

    return { userId }; // ✅ Ensure userId is now in context
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4002, () => console.log(`✅ Community Engagement Service running at http://localhost:4002/graphql`));
});
