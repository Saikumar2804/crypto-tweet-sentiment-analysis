import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Prediction from './components/Prediction';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        
        {/* Protect the /predict route */}
        <Route path="/predict" element={<PrivateRoute><Prediction /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
