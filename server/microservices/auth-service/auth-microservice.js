const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const connectDB = require("./config/mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4001, () => {
    console.log(`✅ Auth Service running at http://localhost:4001/graphql`);
  });
}

startServer();
