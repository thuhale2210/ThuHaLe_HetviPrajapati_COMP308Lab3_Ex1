import CommunityPost from '../models/CommunityPost.js';
import HelpRequest from '../models/HelpRequest.js';

const resolvers = {
    Query: {
        getCommunityPosts: async () => {
            return await CommunityPost.find().populate('author');
        },
        getHelpRequests: async () => {
            return await HelpRequest.find().populate('author').populate('volunteers');
        },
    },
    Mutation: {
        createPost: async (_, { title, content, category }, { user }) => {
            if (!user) throw new Error('Authentication required');
            const post = new CommunityPost({ author: user.id, title, content, category });
            await post.save();
            return post;
        },
        createHelpRequest: async (_, { description, location }, { user }) => {
            if (!user) throw new Error('Authentication required');
            const helpRequest = new HelpRequest({ author: user.id, description, location });
            await helpRequest.save();
            return helpRequest;
        },
        resolveHelpRequest: async (_, { id }, { user }) => {
            if (!user) throw new Error('Authentication required');
            const helpRequest = await HelpRequest.findById(id);
            if (!helpRequest) throw new Error('Help Request not found');
            helpRequest.isResolved = true;
            await helpRequest.save();
            return true;
        },
        volunteerForHelpRequest: async (_, { id }, { user }) => {
            if (!user) throw new Error('Authentication required');
            const helpRequest = await HelpRequest.findById(id);
            if (!helpRequest) throw new Error('Help Request not found');
            if (!helpRequest.volunteers.includes(user.id)) {
                helpRequest.volunteers.push(user.id);
                await helpRequest.save();
            }
            return helpRequest;
        },
    },
};

export default resolvers;
