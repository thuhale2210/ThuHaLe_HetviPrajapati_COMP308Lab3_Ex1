// import CommunityPost from '../models/CommunityPost.js';
// import HelpRequest from '../models/HelpRequest.js';

// const resolvers = {
//     Query: {
//         getCommunityPosts: async () => {
//             return await CommunityPost.find().populate('author');
//         },
//         getHelpRequests: async () => {
//             return await HelpRequest.find().populate('author').populate('volunteers');
//         },
//     },
//     Mutation: {
//         // createPost: async (_, { title, content, category }, { user }) => {
//         //     if (!user) throw new Error('Authentication required');
//         //     const post = new CommunityPost({ author: user.id, title, content, category });
//         //     await post.save();
//         //     return post;
//         // }
//         createPost: async (_, { title, content, category }, { user }) => {
//             if (!user) throw new Error('Authentication required');
    
//             const post = new CommunityPost({ 
//                 author: user.id, 
//                 title, 
//                 content, 
//                 category 
//             });
            
//             await post.save();
    
//             // ✅ Corrected: Use `await CommunityPost.findById(post._id).populate('author').exec()`
//             const populatedPost = await CommunityPost.findById(post._id).populate('author').exec();
    
//             return {
//                 id: populatedPost._id.toString(),
//                 title: populatedPost.title,
//                 content: populatedPost.content,
//                 category: populatedPost.category,
//                 author: {
//                     id: populatedPost.author._id.toString(),  // ✅ Convert ObjectId to String
//                 }
//             };
//         },
//         createHelpRequest: async (_, { description, location }, { user }) => {
//             if (!user) throw new Error('Authentication required');
//             const helpRequest = new HelpRequest({ author: user.id, description, location });
//             await helpRequest.save();
//             return helpRequest;
//         },
//         resolveHelpRequest: async (_, { id }, { user }) => {
//             if (!user) throw new Error('Authentication required');
//             const helpRequest = await HelpRequest.findById(id);
//             if (!helpRequest) throw new Error('Help Request not found');
//             helpRequest.isResolved = true;
//             await helpRequest.save();
//             return true;
//         },
//         volunteerForHelpRequest: async (_, { id }, { user }) => {
//             if (!user) throw new Error('Authentication required');
//             const helpRequest = await HelpRequest.findById(id);
//             if (!helpRequest) throw new Error('Help Request not found');
//             if (!helpRequest.volunteers.includes(user.id)) {
//                 helpRequest.volunteers.push(user.id);
//                 await helpRequest.save();
//             }
//             return helpRequest;
//         },
//     },
// };

// export default resolvers;















// const CommunityPost = require("../models/CommunityPost");
// const HelpRequest = require("../models/HelpRequest");

// const resolvers = {
//   Query: {
//     getAllPosts: async () => await CommunityPost.find(),
//     getAllHelpRequests: async () => await HelpRequest.find(),
//   },
  
//   Mutation: {
//     createPost: async (_, { author, title, content, category }) => {
//       return await new CommunityPost({ author, title, content, category }).save();
//     },
//     updatePost: async (_, { id, title, content, category }) => {
//       return await CommunityPost.findByIdAndUpdate(id, { title, content, category, updatedAt: Date.now() }, { new: true });
//     },
//     deletePost: async (_, { id }) => {
//       await CommunityPost.findByIdAndDelete(id);
//       return true;
//     },
//     createHelpRequest: async (_, { author, description, location }) => {
//       return await new HelpRequest({ author, description, location }).save();
//     },
//     resolveHelpRequest: async (_, { id }) => {
//       return await HelpRequest.findByIdAndUpdate(id, { isResolved: true }, { new: true });
//     },
//     volunteerForHelp: async (_, { id, volunteerId }) => {
//       return await HelpRequest.findByIdAndUpdate(id, { $push: { volunteers: volunteerId } }, { new: true });
//     },
//   },
// };

// module.exports = resolvers;






























// const CommunityPost = require("../models/CommunityPost");
// const HelpRequest = require("../models/HelpRequest");
// const authMiddleware = require("../middlewares/authMiddleware");

// const resolvers = {
//   Query: {
//     getAllPosts: async () => await CommunityPost.find(),
//     getAllHelpRequests: async () => await HelpRequest.find(),
//   },

//   Mutation: {
//     createPost: async (_, { title, content, category }, context) => {
//       const user = authMiddleware(context);
//       return await new CommunityPost({ author: user.userId, title, content, category }).save();
//     },

//     updatePost: async (_, { id, title, content, category }, context) => {
//       const user = authMiddleware(context);
//       const post = await CommunityPost.findById(id);
//       if (!post || post.author.toString() !== user.userId) {
//         throw new Error("Unauthorized to update this post");
//       }
//       return await CommunityPost.findByIdAndUpdate(id, { title, content, category, updatedAt: Date.now() }, { new: true });
//     },

//     deletePost: async (_, { id }, context) => {
//       const user = authMiddleware(context);
//       const post = await CommunityPost.findById(id);
//       if (!post || post.author.toString() !== user.userId) {
//         throw new Error("Unauthorized to delete this post");
//       }
//       await CommunityPost.findByIdAndDelete(id);
//       return true;
//     },

//     createHelpRequest: async (_, { description, location }, context) => {
//       const user = authMiddleware(context);
//       return await new HelpRequest({ author: user.userId, description, location }).save();
//     },

//     resolveHelpRequest: async (_, { id }, context) => {
//       const user = authMiddleware(context);
//       const helpRequest = await HelpRequest.findById(id);
//       if (!helpRequest || helpRequest.author.toString() !== user.userId) {
//         throw new Error("Unauthorized to mark this request as resolved");
//       }
//       return await HelpRequest.findByIdAndUpdate(id, { isResolved: true }, { new: true });
//     },

//     volunteerForHelp: async (_, { id }, context) => {
//       const user = authMiddleware(context);
//       return await HelpRequest.findByIdAndUpdate(id, { $push: { volunteers: user.userId } }, { new: true });
//     },
//   },
// };

// module.exports = resolvers;








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
