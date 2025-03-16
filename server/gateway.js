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
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
//   credentials: true,
// }));
// app.use(cookieParser());

// // Configure the Apollo Gateway for microservices
// // const gateway = new ApolloGateway({
// //   supergraphSdl: new IntrospectAndCompose({
// //     subgraphs: [
// //       { name: 'auth', url: 'http://localhost:4001/graphql' },
// //       { name: 'products', url: 'http://localhost:4002/graphql' },
// //     ],
// //   }),
// // });

// const gateway = new ApolloGateway({
//   supergraphSdl: new IntrospectAndCompose({
//     subgraphs: [
//       { name: "auth", url: "http://localhost:4001/graphql" },
//       { name: "community", url: "http://localhost:4002/graphql" },
//     ],
//   }),
// });


// // Initialize Apollo Server
// const server = new ApolloServer({
//   gateway,
//   introspection: true,
// });

// async function startServer() {
//   await server.start();

//   // Apply Express middleware for Apollo Server
//   app.use('/graphql', expressMiddleware(server));

//   // Start Express server
//   app.listen(4000, () => {
//     console.log(`🚀 API Gateway ready at http://localhost:4000/graphql`);
//   });
// }

// startServer();


import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import cors from "cors";
import cookieParser from "cookie-parser";

// ✅ Define Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

// ✅ Configure Express
const app = express();
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Explicitly Define Subgraphs
const gateway = new ApolloGateway({
  debug: true, // ✅ Enable debugging logs
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "auth-service", url: "http://localhost:4001/graphql" },
      { name: "community-service", url: "http://localhost:4002/graphql" },
    ],
  }),
});

// ✅ Start Apollo Server
const server = new ApolloServer({
  gateway,
  introspection: true,
});

async function startServer() {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split("Bearer ")[1] || null;
        return { token };
      },
    })
  );

  app.listen(4000, () => {
    console.log(`🚀 API Gateway running at http://localhost:4000/graphql`);
  });
}

startServer();
