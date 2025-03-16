import React from 'react';
import { Container, Alert } from 'react-bootstrap';

function News() {
    return (
        <Container>
            <h2>Community News</h2>
            <Alert variant="info">Stay tuned for the latest community updates!</Alert>
        </Container>
    );
}

export default News;
