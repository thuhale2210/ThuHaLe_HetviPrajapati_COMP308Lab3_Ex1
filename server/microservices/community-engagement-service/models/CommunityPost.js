import mongoose from 'mongoose';

const communityPostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, enum: ["news", "discussion"] },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('CommunityPost', communityPostSchema);
