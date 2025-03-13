import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const resolvers = {
    Mutation: {
        login: async (_, { username, password }) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    throw new Error('User not found');
                }

                console.log("🔍 Stored Hashed Password:", user.password);
                console.log("🔍 Entered Password:", password);

                // ✅ Ensure bcrypt.compare is used correctly
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) {
                    console.error("❌ Password does not match!");
                    throw new Error('Incorrect password');
                }

                // ✅ Generate JWT Token
                const token = jwt.sign(
                    { userId: user.id, username: user.username, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                return {
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                };
            } catch (error) {
                console.error("❌ Login Error:", error);
                throw new Error("Login failed: " + error.message);
            }
        }
    }
};

export default resolvers;
