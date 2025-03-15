// //server/microservices/auth-service/config/mongoose.js
// import mongoose from 'mongoose';
// import { config } from './config.js'; // Use default import
// //
// const connectDB = async () => {
//     try {
//         if (!config.db) {
//             throw new Error("MongoDB URI is undefined. Check your environment variables.");
//         }

//         await mongoose.connect(config.db);

//         console.log(`✅ Auth Service connected to MongoDB at ${config.db}`);
//     } catch (error) {
//         console.error('❌ Error connecting to MongoDB (Auth Service):', error.message);
//         process.exit(1);
//     }
// };
// //
// export default connectDB;


const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected (Auth Service)");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
