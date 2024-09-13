import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS styles for the component

function Home() {
  return (
    <Container fluid className="home-container">
      <Row className="align-items-center justify-content-center">
        <Col className="text-center">
          <h1 className="home-title">Analyzing the Impact of Tweets on Cryptocurrency Market Trends</h1>
          <p className="home-description">
            Discover how sentiment analysis on tweets can influence cryptocurrency price trends using advanced LSTM and GRU models.
            Leverage our state-of-the-art machine learning system to stay ahead in the volatile crypto market.
          </p>
          <div className="mt-5">
            <Button as={Link} to="/signup" variant="primary" className="mx-2 home-button">
              Sign Up
            </Button>
            <Button as={Link} to="/signin" variant="secondary" className="mx-2 home-button">
              Sign In
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
