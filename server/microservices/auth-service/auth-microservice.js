// // server/microservices/auth-service/auth-microservice.js
// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });

// import { parse } from 'graphql';  // Import GraphQL parser
// import { config } from './config/config.js';
// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { buildSubgraphSchema } from '@apollo/subgraph';

// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import jwt from 'jsonwebtoken';
// import connectDB from './config/mongoose.js';
// import typeDefs from './graphql/typeDefs.js';
// import resolvers from './graphql/resolvers.js';
// //
// console.log("🔍 JWT_SECRET in service:", process.env.JWT_SECRET);

// // Connect to MongoDB
// connectDB();

// const app = express();
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:4000', 'https://studio.apollographql.com'],
//     credentials: true,
// }));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // ✅ Fix: Parse `typeDefs` before passing it to `buildSubgraphSchema`
// const schema = buildSubgraphSchema([{ typeDefs: parse(typeDefs), resolvers }]);
// // 
// const server = new ApolloServer({
//     schema,
//     introspection: true,
// });
// // 
// async function startServer() {
//     await server.start();
//     // 
//     app.use('/graphql', expressMiddleware(server, {
//         context: async ({ req, res }) => {
//             console.log("🔍 Auth Microservice: Checking request cookies:", req.cookies);
//             // Check for token in cookies or headers
//             const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
//             let user = null;
//             // Verify token
//             if (token) {
//                 try {
//                     const decoded = jwt.verify(token, config.JWT_SECRET);
//                     user = { username: decoded.username };
//                     console.log("✅ Authenticated User:", user);
//                 } catch (error) {
//                     console.error("🚨 Token verification failed:", error);
//                 }
//             }
//             // Return context
//             return { user, req, res };
//         }
//     }));

//     //
//     //
//     app.listen(config.port, () => console.log(`🚀 Auth Microservice running at http://localhost:${config.port}/graphql`));
// }
// //
// startServer();













// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const connectDB = require("./config/mongoose");
// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");
// const cors = require("cors");

// require("dotenv").config();

// // Initialize Express
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Start Apollo Server
// const server = new ApolloServer({ typeDefs, resolvers });
// async function startServer() {
//   await server.start();
//   server.applyMiddleware({ app });

//   const PORT = process.env.PORT || 4001;
//   app.listen(PORT, () => {
//     console.log(`✅ Auth Service running at http://localhost:${PORT}/graphql`);
//   });
// }

// startServer();






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
  schema: buildSubgraphSchema({ typeDefs, resolvers }), // Enable Federation
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4001, () => {
    console.log(`✅ Auth Service running at http://localhost:4001/graphql`);
  });
}

startServer();
