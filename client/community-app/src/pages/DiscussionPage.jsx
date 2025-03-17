import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_POSTS = gql`
  query {
    getAllPosts {
      id
      title
      content
      category
      author
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $category: String!) {
    createPost(title: $title, content: $content, category: $category) {
      id
      title
      content
      category
    }
  }
`;

function DiscussionPage() {
    const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);
    const [createPost, { loading: addingPost }] = useMutation(CREATE_POST, {
        refetchQueries: [GET_POSTS],
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        await createPost({ variables: { title, content, category } });
        setTitle('');
        setContent('');
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white text-gray-900 rounded-xl shadow-md grid grid-cols-5 gap-6">
            {/* Left Column: Create Post */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
                <form onSubmit={handlePostSubmit} className="space-y-4 flex flex-col">
                    <input className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        type="text" placeholder="Enter post title" value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter post content" value={content}
                        onChange={(e) => setContent(e.target.value)}></textarea>
                    <select className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="General">General</option>
                        <option value="News">News</option>
                        <option value="Help">Help</option>
                    </select>
                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        type="submit" disabled={addingPost}>Submit Post</button>
                </form>
            </div>

            {/* Right Column: Community Posts */}
            <div className="col-span-3 bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Community Posts</h3>
                {postsLoading ? <p>Loading...</p> : postsError ? <p className="text-red-500">Error fetching posts</p> : (
                    <div className="space-y-4">
                        {postsData?.getAllPosts.map(({ id, title, content, category, author }) => (
                            <div key={id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                                <strong className="text-lg text-blue-600">{title}</strong>
                                <p className='mt-4'><strong>Category:</strong> {category}</p>
                                <p><strong>Author:</strong> {author}</p>
                                <p className="text-gray-700 mt-2"><strong>Content:</strong>{content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DiscussionPage;
