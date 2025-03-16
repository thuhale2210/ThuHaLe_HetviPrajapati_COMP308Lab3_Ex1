// import React, { useState } from 'react';
// import { useQuery, useMutation, gql } from '@apollo/client';
// import { Button, Form, Container, ListGroup, Alert, Tabs, Tab } from 'react-bootstrap';

// // GraphQL Queries & Mutations
// const GET_POSTS = gql`
//   query {
//     getAllPosts {
//       id
//       title
//       content
//       category
//       author
//     }
//   }
// `;

// const CREATE_POST = gql`
//   mutation CreatePost($title: String!, $content: String!, $category: String!) {
//     createPost(title: $title, content: $content, category: $category) {
//       id
//       title
//       content
//       category
//     }
//   }
// `;

// const GET_HELP_REQUESTS = gql`
//   query {
//     getAllHelpRequests {
//       id
//       description
//       location
//       isResolved
//     }
//   }
// `;

// const CREATE_HELP_REQUEST = gql`
//   mutation CreateHelpRequest($description: String!, $location: String) {
//     createHelpRequest(description: $description, location: $location) {
//       id
//       description
//       location
//     }
//   }
// `;

// function CommunityComponent() {
//     const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);
//     const { loading: helpLoading, error: helpError, data: helpData } = useQuery(GET_HELP_REQUESTS);

//     const [createPost, { loading: addingPost }] = useMutation(CREATE_POST, {
//         refetchQueries: [GET_POSTS],
//     });

//     const [createHelpRequest, { loading: addingHelp }] = useMutation(CREATE_HELP_REQUEST, {
//         refetchQueries: [GET_HELP_REQUESTS],
//     });

//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [category, setCategory] = useState('General');
//     const [description, setDescription] = useState('');
//     const [location, setLocation] = useState('');
//     const [activeTab, setActiveTab] = useState('posts');

//     const handlePostSubmit = async (e) => {
//         e.preventDefault();
//         if (!title.trim() || !content.trim()) return;
//         await createPost({ variables: { title, content, category } });
//         setTitle('');
//         setContent('');
//     };

//     const handleHelpSubmit = async (e) => {
//         e.preventDefault();
//         if (!description.trim()) return;
//         await createHelpRequest({ variables: { description, location } });
//         setDescription('');
//         setLocation('');
//     };

//     return (
//         <Container>
//             <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
//                 <Tab eventKey="posts" title="Community Posts">
//                     <h2>Create a New Post</h2>
//                     <Form onSubmit={handlePostSubmit}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter post title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Content</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Enter post content"
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Category</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 value={category}
//                                 onChange={(e) => setCategory(e.target.value)}
//                             >
//                                 <option value="General">General</option>
//                                 <option value="News">News</option>
//                                 <option value="Help">Help</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit" disabled={addingPost}>
//                             Submit Post
//                         </Button>
//                     </Form>
//                     <h3 className="mt-4">Community Posts</h3>
//                     {postsLoading ? <p>Loading...</p> : postsError ? <Alert variant="danger">Error fetching posts</Alert> : (
//                         <ListGroup>
//                             {postsData && postsData.getAllPosts.map(({ id, title, content, category, author }) => (
//                                 <ListGroup.Item key={id}>
//                                     <strong>{title}</strong> ({category}) by {author}
//                                     <p>{content}</p>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>
//                     )}
//                 </Tab>

//                 <Tab eventKey="help" title="Help Requests">
//                     <h2>Request Help</h2>
//                     <Form onSubmit={handleHelpSubmit}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 placeholder="Describe your help request"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Location (Optional)</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter location"
//                                 value={location}
//                                 onChange={(e) => setLocation(e.target.value)}
//                             />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" disabled={addingHelp}>
//                             Submit Help Request
//                         </Button>
//                     </Form>
//                     <h3 className="mt-4">Help Requests</h3>
//                     {helpLoading ? <p>Loading...</p> : helpError ? <Alert variant="danger">Error fetching help requests</Alert> : (
//                         <ListGroup>
//                             {helpData && helpData.getAllHelpRequests.map(({ id, description, location, isResolved }) => (
//                                 <ListGroup.Item key={id}>
//                                     <strong>{description}</strong>
//                                     <p>Location: {location || 'N/A'} | Status: {isResolved ? 'Resolved' : 'Pending'}</p>
//                                 </ListGroup.Item>
//                             ))}
//                         </ListGroup>
//                     )}
//                 </Tab>
//             </Tabs>
//         </Container>
//     );
// }

// export default CommunityComponent;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Discussions from '../src/pages/DiscussionPage';
import HelpRequests from '../src/pages/HelpRequestPage';
import News from '../src/pages/NewsPage';
import { Container, Navbar, Nav } from 'react-bootstrap';

// Set up Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4002/graphql', // GraphQL endpoint
    cache: new InMemoryCache(),
    credentials: 'include',
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Community</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/discussions">Discussions</Nav.Link>
                            <Nav.Link as={Link} to="/help-requests">Help Requests</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Container className="mt-4">
                    <Routes>
                        <Route path="/discussions" element={<Discussions />} />
                        <Route path="/help-requests" element={<HelpRequests />} />
                        <Route path="/" element={<News />} />
                    </Routes>
                </Container>
            </Router>
        </ApolloProvider>
    );
}

export default App;
