import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    fullName: '',
    number: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', user);
      alert('User registered successfully');
      navigate('/signin'); // Redirect to sign in page after registration
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Register Account Form</h2>
        <Form.Group controlId="formFullName" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="fullName" onChange={handleChange} placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formNumber" className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control type="text" name="number" onChange={handleChange} placeholder="Enter your number" />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} placeholder="Enter your password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Register</Button>
        <div className="text-center mt-3">
          <a href="/signin">Click here for Signin</a>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
