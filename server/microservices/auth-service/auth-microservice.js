// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });

// import { config } from './config/config.js';
// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { buildSubgraphSchema } from "@apollo/subgraph";
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import jwt from 'jsonwebtoken';
// import connectDB from './config/mongoose.js';
// import resolvers from './graphql/resolvers.js';
// import { typeDefs } from "./graphql/typeDefs.js";

// // Connect to MongoDB
// connectDB();

// const app = express();
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:4000', 'https://studio.apollographql.com'],
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

// // 
// const server = new ApolloServer({
//   schema,
//   introspection: true,
// });
// // 
// async function startServer() {
//   await server.start();
//   // 
//   app.use('/graphql', expressMiddleware(server, {
//     context: async ({ req, res }) => {
//       console.log("🔍 Auth Microservice: Checking request cookies:", req.cookies);
//       // Check for token in cookies or headers
//       const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
//       console.log("🔍 Raw Cookie Header:", req.headers.cookie);
//       console.log("🔍 Token:", token);
//       let user = null;
//       // Verify token
//       if (token) {
//         try {
//           const decoded = jwt.verify(token, config.JWT_SECRET);
//           user = { username: decoded.username };
//           console.log("✅ Authenticated User:", user);
//         } catch (error) {
//           console.error("🚨 Token verification failed:", error);
//         }
//       }
//       // Return context
//       return { user, req, res };
//     }
//   }));

//   //
//   //
//   app.listen(config.port, () => console.log(`🚀 Auth Microservice running at http://localhost:${config.port}/graphql`));
// }
// //
// startServer();


import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import connectDB from './config/mongoose.js';
import { config } from './config/config.js';
import { typeDefs } from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import User from './models/User.js';

console.log("🔍 JWT_SECRET in service:", process.env.JWT_SECRET);

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Fix CORS to Allow Cookies
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true, // ✅ Required for cookies to work
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Middleware Setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Fix: Do NOT parse `typeDefs` again, it’s already valid
const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

// ✅ Initialize Apollo Server
const server = new ApolloServer({
  schema,
  introspection: true,
});

async function startServer() {
  await server.start();

  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      console.log("🔍 Request Cookies:", req.cookies);
      console.log("🔍 Authorization Header:", req.headers.authorization);

      const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

      if (!token) {
        console.warn("🚨 No token found in cookies or headers");
        return { user: null }; // ✅ Prevent calling `findById(undefined)`
      }

      let user = null;
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        if (!decoded.userId) {
          console.warn("🚨 Token is missing userId");
        } else {
          user = await User.findById(decoded.userId);
          if (!user) {
            console.warn("🚨 User not found in database!");
          }
        }
      } catch (error) {
        console.error("🚨 Token verification failed:", error);
      }

      return { user };
    }
  }));

  // ✅ Start Express Server
  app.listen(config.port, () => {
    console.log(`🚀 Auth Microservice running at http://localhost:${config.port}/graphql`);
  });
}

startServer();
