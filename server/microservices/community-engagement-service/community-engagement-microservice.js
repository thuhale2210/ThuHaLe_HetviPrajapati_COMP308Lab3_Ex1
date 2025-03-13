// Import required modules
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { config } from './config/config.js';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import connectDB from './config/mongoose.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

console.log("🔍 JWT_SECRET in service:", process.env.JWT_SECRET);

// ✅ Connect to MongoDB
connectDB();

// ✅ Create Express app
const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:4000', 'https://studio.apollographql.com'],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Fix: No need to manually parse `typeDefs`
const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
    schema,
    introspection: true, // Allow GraphQL Playground
});

async function startServer() {
    await server.start();

    // ✅ Apply Apollo GraphQL middleware
    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req, res }) => {
            const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
            let user = null;

            if (token) {
                try {
                    const decoded = jwt.verify(token, config.JWT_SECRET);
                    user = { id: decoded.userId, username: decoded.username, role: decoded.role };  // ✅ Extract `id`, `role`
                } catch (error) {
                    console.error("❌ Error verifying token:", error);
                }
            }
            return { user, res };
        }
    }));

    app.listen(config.port, () => console.log(`🚀 Community Engagement Service running at http://localhost:${config.port}/graphql`));
}

startServer();
