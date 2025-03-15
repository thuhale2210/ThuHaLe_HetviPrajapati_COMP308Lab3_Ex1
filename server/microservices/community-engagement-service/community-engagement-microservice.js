// // Import required modules
// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });

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

// console.log("🔍 JWT_SECRET in service:", process.env.JWT_SECRET);

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Create Express app
// const app = express();
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:4000', 'https://studio.apollographql.com'],
//     credentials: true,
// }));

// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // ✅ Fix: No need to manually parse `typeDefs`
// const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

// const server = new ApolloServer({
//     schema,
//     introspection: true, // Allow GraphQL Playground
// });

// async function startServer() {
//     await server.start();

//     // ✅ Apply Apollo GraphQL middleware
//     app.use('/graphql', expressMiddleware(server, {
//         context: async ({ req, res }) => {
//             const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
//             let user = null;

//             if (token) {
//                 try {
//                     const decoded = jwt.verify(token, config.JWT_SECRET);
//                     user = { id: decoded.userId, username: decoded.username, role: decoded.role };  // ✅ Extract `id`, `role`
//                 } catch (error) {
//                     console.error("❌ Error verifying token:", error);
//                 }
//             }
//             return { user, res };
//         }
//     }));

//     app.listen(config.port, () => console.log(`🚀 Community Engagement Service running at http://localhost:${config.port}/graphql`));
// }

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

//   const PORT = process.env.PORT || 4002;
//   app.listen(PORT, () => {
//     console.log(`✅ Community Engagement Service running at http://localhost:${PORT}/graphql`);
//   });
// }

// startServer();











// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const connectDB = require("./config/mongoose");
// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");

// const app = express();
// connectDB();

// const server = new ApolloServer({ typeDefs, resolvers });
// server.start().then(() => {
//   server.applyMiddleware({ app });
//   app.listen(4002, () => console.log(`✅ Community Engagement Service running at http://localhost:4002/graphql`));
// });
























// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const connectDB = require("./config/mongoose");
// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");

// const app = express();
// connectDB();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req }), // Pass request context
// });

// server.start().then(() => {
//   server.applyMiddleware({ app });
//   app.listen(4002, () => console.log(`✅ Community Engagement Service running at http://localhost:4002/graphql`));
// });



// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const jwt = require("jsonwebtoken");
// const connectDB = require("./config/mongoose");
// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");
// require("dotenv").config();

// const app = express();
// connectDB();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     const token = req.headers.authorization || "";
//     if (token) {
//       try {
//         const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         return { userId: decoded.userId };
//       } catch (err) {
//         console.error("Invalid Token:", err.message);
//         throw new Error("Unauthorized: Invalid Token");
//       }
//     }
//     throw new Error("Unauthorized: Token Required");
//   },
//   introspection: true,
// });

// server.start().then(() => {
//   server.applyMiddleware({ app });
//   app.listen(4002, () => console.log(`✅ Community Engagement Service running at http://localhost:4002/graphql`));
// });




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
