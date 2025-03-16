import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button, Form, Container, ListGroup, Alert } from 'react-bootstrap';

const GET_HELP_REQUESTS = gql`
  query {
    getAllHelpRequests {
      id
      author
      description
      location
      isResolved
      volunteers
      createdAt
      updatedAt
    }
  }
`;

const CREATE_HELP_REQUEST = gql`
  mutation CreateHelpRequest($description: String!, $location: String) {
    createHelpRequest(description: $description, location: $location) {
      id
      description
      location
      isResolved
    }
  }
`;

function HelpRequests() {
    const { loading, error, data } = useQuery(GET_HELP_REQUESTS);
    const [createHelpRequest, { loading: addingHelp }] = useMutation(CREATE_HELP_REQUEST, {
        refetchQueries: [GET_HELP_REQUESTS],
    });

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        await createHelpRequest({ variables: { description, location } });
        setDescription('');
        setLocation('');
    };

    return (
        <Container>
            <h2>Request Help</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Describe your help request"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location (Optional)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={addingHelp}>
                    Submit Help Request
                </Button>
            </Form>

            <h3 className="mt-4">Help Requests</h3>
            {loading ? <p>Loading...</p> : error ? <Alert variant="danger">Error fetching help requests</Alert> : (
                <ListGroup>
                    {data && data.getAllHelpRequests.map(({ id, author, description, location, isResolved, volunteers, createdAt, updatedAt }) => (
                        <ListGroup.Item key={id}>
                            <strong>{description}</strong>
                            <p><strong>Author:</strong> {author}</p>
                            <p><strong>Location:</strong> {location || 'N/A'}</p>
                            <p><strong>Status:</strong> {isResolved ? 'Resolved' : 'Pending'}</p>
                            <p><strong>Volunteers:</strong> {volunteers.length > 0 ? volunteers.join(', ') : 'None'}</p>
                            <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
                            {updatedAt && <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</p>}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
}

export default HelpRequests;
