import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    email: '',   // Updated to use 'email' instead of 'username'
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending 'email' and 'password' in the login request
      const response = await axios.post('http://localhost:5000/api/login', {
        email: user.email,
        password: user.password
      });

      // Assuming the response contains a JWT token
      const token = response.data.token;

      // Save JWT token to localStorage (or sessionStorage)
      localStorage.setItem('token', token);

      // Navigate to the prediction page after login
      navigate('/predict');
      
    } catch (err) {
      console.error(err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login Account Form</h2>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} placeholder="Enter your password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Login</Button>
        <div className="text-center mt-3">
          <a href="/signup">Click here for Signup</a>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
