import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, Form, Container, ListGroup, Alert } from 'react-bootstrap';

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

function Discussions() {
    const { loading, error, data } = useQuery(GET_POSTS);
    const [createPost, { loading: addingPost }] = useMutation(CREATE_POST, {
        refetchQueries: [GET_POSTS],
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        await createPost({ variables: { title, content, category } });
        setTitle('');
        setContent('');
    };

    return (
        <Container>
            <h2>Create a New Post</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter post content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="General">General</option>
                        <option value="News">News</option>
                        <option value="Help">Help</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={addingPost}>
                    Submit Post
                </Button>
            </Form>

            <h3 className="mt-4">Community Posts</h3>
            {loading ? <p>Loading...</p> : error ? <Alert variant="danger">Error fetching posts</Alert> : (
                <ListGroup>
                    {data && data.getAllPosts.map(({ id, title, content, category, author }) => (
                        <ListGroup.Item key={id}>
                            <strong>{title}</strong> ({category}) by {author}
                            <p>{content}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
}

export default Discussions;
