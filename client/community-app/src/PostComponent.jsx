import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

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

function PostComponent() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const [createPost] = useMutation(CREATE_POST);

  const [newPost, setNewPost] = useState({ title: "", content: "", category: "news" });

  const handleCreatePost = async () => {
    await createPost({ variables: newPost });
    refetch();
    setNewPost({ title: "", content: "", category: "news" });
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts!</p>;

  return (
    <div className="container">
      <h2>Community Posts</h2>
      <ul className="list-group">
        {data.getAllPosts.map((post) => (
          <li key={post.id} className="list-group-item">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>Category: {post.category}</small>
          </li>
        ))}
      </ul>

      <h3 className="mt-4">Create a New Post</h3>
      <input type="text" className="form-control mt-2" placeholder="Title"
        value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
      <textarea className="form-control mt-2" placeholder="Content"
        value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}></textarea>
      <select className="form-control mt-2" value={newPost.category}
        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
        <option value="news">News</option>
        <option value="discussion">Discussion</option>
      </select>
      <button className="btn btn-primary mt-3" onClick={handleCreatePost}>Create Post</button>
    </div>
  );
}

export default PostComponent;
