// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// //

// const app = express();

// // ✅ Fix: Add middleware to parse JSON requests
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Enable CORS and Cookie Parsing
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
//     credentials: true,
// }));
// app.use(cookieParser());

// // Configure the Apollo Gateway for microservices
// const gateway = new ApolloGateway({
//     supergraphSdl: new IntrospectAndCompose({
//         subgraphs: [
//             { name: 'auth', url: 'http://localhost:4001/graphql' },
//             { name: 'community-engagement', url: 'http://localhost:4002/graphql' },
//         ],
//     }),
// });

// // Initialize Apollo Server
// const server = new ApolloServer({
//     gateway,
//     introspection: true,
// });

// async function startServer() {
//     await server.start();

//     // Apply Express middleware for Apollo Server
//     app.use('/graphql', expressMiddleware(server));

//     // Start Express server
//     app.listen(4000, () => {
//         console.log(`🚀 API Gateway ready at http://localhost:4000/graphql`);
//     });
// }

// startServer();

// // import express from 'express';
// // import { ApolloServer } from '@apollo/server';
// // import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

// // const gateway = new ApolloGateway({
// //     supergraphSdl: new IntrospectAndCompose({
// //         subgraphs: [
// //             { name: 'auth', url: 'http://localhost:4001/graphql' },
// //             { name: 'community-engagement', url: 'http://localhost:4002/graphql' },
// //         ],
// //     }),
// // });

// // const server = new ApolloServer({ gateway });

// // const app = express();
// // server.start().then
















// const { ApolloServer } = require("apollo-server");
// const { ApolloGateway } = require("@apollo/gateway");
// require("dotenv").config();

// const gateway = new ApolloGateway({
//   serviceList: [
//     { name: "auth", url: process.env.AUTH_SERVICE_URL },
//     { name: "community", url: process.env.COMMUNITY_SERVICE_URL }
//   ],
// });

// const server = new ApolloServer({
//   gateway,
//   context: ({ req }) => {
//     // Extract Authorization Header
//     const authHeader = req.headers.authorization || "";
//     const token = authHeader.replace("Bearer ", "");

//     if (token) {
//       try {
//         const jwt = require("jsonwebtoken");
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         return { userId: decoded.userId };
//       } catch (err) {
//         console.error("Invalid Token:", err.message);
//       }
//     }
//     return {};
//   },
//   subscriptions: false,
// });

// server.listen({ port: process.env.PORT }).then(({ url }) => {
//   console.log(`✅ API Gateway running at ${url}`);
// });




















// const { ApolloServer } = require("apollo-server-express");
// const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// // Define federated services
// const gateway = new ApolloGateway({
//   supergraphSdl: new IntrospectAndCompose({
//     subgraphs: [
//       { name: "auth-service", url: process.env.AUTH_SERVICE_URL },
//       { name: "community-service", url: process.env.COMMUNITY_SERVICE_URL },
//     ],
//   }),
// });

// // Initialize Express
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Start Apollo Server with Apollo Gateway
// const server = new ApolloServer({ gateway, subscriptions: false });

// async function startServer() {
//   await server.start();
//   server.applyMiddleware({ app });

//   const PORT = process.env.PORT || 4000;
//   app.listen(PORT, () => {
//     console.log(`✅ API Gateway running at http://localhost:${PORT}/graphql`);
//   });
// }

// startServer();



// const { ApolloServer } = require("apollo-server-express");
// const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// // Define Microservice URLs
// const gateway = new ApolloGateway({
//   supergraphSdl: new IntrospectAndCompose({
//     subgraphs: [
//       { name: "auth-service", url: process.env.AUTH_SERVICE_URL },
//       { name: "community-service", url: process.env.COMMUNITY_SERVICE_URL },
//     ],
//   }),
// });

// const app = express();
// app.use(cors());

// const server = new ApolloServer({ gateway, subscriptions: false });

// server.start().then(() => {
//   server.applyMiddleware({ app });

//   const PORT = process.env.PORT || 4000;
//   app.listen(PORT, () => console.log(`✅ API Gateway running at http://localhost:${PORT}/graphql`));
// });



















// const { ApolloServer } = require("apollo-server-express");
// const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// // Define federated services
// const gateway = new ApolloGateway({
//   supergraphSdl: new IntrospectAndCompose({
//     subgraphs: [
//       { name: "auth-service", url: process.env.AUTH_SERVICE_URL },
//       { name: "community-service", url: process.env.COMMUNITY_SERVICE_URL },
//     ],
//   }),
// });

// // Initialize Express
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Start Apollo Server with Apollo Gateway
// const server = new ApolloServer({ gateway, subscriptions: false });

// async function startServer() {
//   await server.start();
//   server.applyMiddleware({ app });

//   const PORT = process.env.PORT || 4000;
//   app.listen(PORT, () => {
//     console.log(`✅ API Gateway running at http://localhost:${PORT}/graphql`);
//   });
// }

// startServer();

















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
