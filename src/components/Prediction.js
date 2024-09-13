import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnalyzeTweet() {
    const [tweet, setTweet] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();	
        setLoading(true);
        try {
            // Make POST request to your backend API
            const response = await axios.post('http://localhost:5000/predict', {
                tweet: tweet
            });

            // Update result with the returned sentiment
            setResult(`The sentiment of the tweet is ${response.data.sentiment}`);
        } catch (error) {
            console.error("There was an error!", error);
            setResult("An error occurred while analyzing the tweet.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Enter Tweet for Sentiment Analysis</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tweet</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter your tweet"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Predict'}
                </button>
            </form>
            {result && <h3 className="text-center mt-4">{result}</h3>}
        </div>
    );
}

export default AnalyzeTweet;
