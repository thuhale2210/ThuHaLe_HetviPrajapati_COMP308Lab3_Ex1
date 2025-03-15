// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, required: true },
// }, { timestamps: true });

// // ✅ Pre-save hook to hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // Only hash if password is modified
//     try {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//         console.log("✅ Password hashed BEFORE saving:", this.password);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

// // ✅ Method to compare passwords (for login)
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model('User', userSchema);



const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["resident", "business_owner", "community_organizer"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
