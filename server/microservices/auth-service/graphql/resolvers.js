import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';

const resolvers = {
    Query: {
        currentUser: (_, __, context) => {
            console.log("🔍 Debugging context:", context);
            const { req } = context;

            if (!req || !req.cookies) {
                console.log("🚨 Request object is missing!");
                return null;
            }

            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            try {
                console.log("🔍 JWT_SECRET in resolvers.js:", config.JWT_SECRET);
                const decoded = jwt.verify(token, config.JWT_SECRET);
                return { username: decoded.username };
            } catch (error) {
                console.error("Error verifying token:", error);
                return null;
            }
        },
    },

    Mutation: {
        login: async (_, { username, password }, { res }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }

            console.log("🔍 Stored Hashed Password from DB:", user.password);
            console.log("🔍 Entered Password:", password);

            const match = await user.comparePassword(password);
            console.log("🔍 bcrypt.compare() result:", match);

            if (!match) {
                throw new Error('Invalid password');
            }

            // ✅ Ensure JWT_SECRET is set correctly
            if (!config.JWT_SECRET) {
                console.error("🚨 Missing JWT_SECRET in config!");
                throw new Error("Server configuration error");
            }

            // ✅ Fix: Generate JWT token properly
            const token = jwt.sign(
                { userId: user.id, username: user.username, email: user.email, role: user.role },
                config.JWT_SECRET,
                { expiresIn: '1d' }
            );

            if (!token) {
                throw new Error("Failed to generate token");
            }

            // ✅ Fix: Set cookie properly
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            console.log("✅ Generated Token:", token);

            return {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            };
        },

        register: async (_, { username, email, password, role }) => {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error('Username is already taken');
            }

            const newUser = new User({ username, email, password, role });
            await newUser.save();

            console.log("✅ New user registered:", newUser);
            return true;
        },
    },
};

export default resolvers;
