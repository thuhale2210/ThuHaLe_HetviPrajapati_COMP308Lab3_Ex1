const CommunityPost = require("../models/CommunityPost");
const HelpRequest = require("../models/HelpRequest");

const resolvers = {
  Query: {
    getAllPosts: async () => await CommunityPost.find(),
    getAllHelpRequests: async () => await HelpRequest.find(),
  },
  
  Mutation: {
    createPost: async (_, { title, content, category }, { userId }) => {
      if (!userId) throw new Error("Unauthorized: Please log in");
      return await new CommunityPost({ author: userId, title, content, category }).save();
    },
    
    updatePost: async (_, { id, title, content, category }, { userId }) => {
      if (!userId) throw new Error("Unauthorized: Please log in");
      const post = await CommunityPost.findById(id);
      if (!post || post.author.toString() !== userId) throw new Error("Permission Denied: Cannot update this post");
      return await CommunityPost.findByIdAndUpdate(id, { title, content, category, updatedAt: Date.now() }, { new: true });
    },
    
    deletePost: async (_, { id }, { userId }) => {
      if (!userId) throw new Error("Unauthorized: Please log in");
      const post = await CommunityPost.findById(id);
      if (!post || post.author.toString() !== userId) throw new Error("Permission Denied: Cannot delete this post");
      await CommunityPost.findByIdAndDelete(id);
      return true;
    },

    createHelpRequest: async (_, { description, location }, { userId }) => {
      if (!userId) throw new Error("Unauthorized: Please log in");
      return await new HelpRequest({ author: userId, description, location }).save();
    },

    resolveHelpRequest: async (_, { id }, { userId }) => {
      if (!userId) throw new Error("Unauthorized: Please log in");
      const helpRequest = await HelpRequest.findById(id);
      if (!helpRequest || helpRequest.author.toString() !== userId) throw new Error("Permission Denied: Cannot resolve this request");
      return await HelpRequest.findByIdAndUpdate(id, { isResolved: true }, { new: true });
    },

    volunteerForHelp: async (_, { id }, { userId }) => {
      if (!userId) throw new Error("Unauthorized: Please log in");
      return await HelpRequest.findByIdAndUpdate(id, { $push: { volunteers: userId } }, { new: true });
    },
  },
};

module.exports = resolvers;
