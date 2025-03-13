import dotenv from 'dotenv';
dotenv.config();
// Configuration for engagement-service
export const config = {
    db: process.env.PRODUCT_MONGO_URI || 'mongodb://localhost:27017/lab3_commEngagementServiceDB',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',  // ✅ Shared JWT secret
    port: process.env.COMMUNITY_ENGAGEMENT_PORT || 4002,  // ✅ Correct port for product-service
};

// Log in development mode
if (process.env.NODE_ENV !== 'production') {
    console.log(`🔐 JWT_SECRET in product-service config: ${config.JWT_SECRET}`);
    console.log(`🚀 Product Microservice running on port: ${config.port}`);
}
