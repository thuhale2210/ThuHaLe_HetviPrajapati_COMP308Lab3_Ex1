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