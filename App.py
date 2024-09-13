from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
import numpy as np
import tensorflow as tf
from flask_cors import CORS
import re
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import datetime

app = Flask(__name__)
CORS(app)

# MongoDB connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/crypto_db"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Secret key for JWT
app.config['JWT_SECRET_KEY'] = '0169813ddd7f429867bef0dd9051e43e6dcf21f8ed8e7f7dc4dfad54aec6c190'

# Load your trained model
model = tf.keras.models.load_model('C:/Users/HP/crypto-tweet-analysis/notebooks/lstm_gru_cryptocurrency_tweet_model.h5')

# Load the tokenizer
with open('C:/Users/HP/crypto-tweet-analysis/notebooks/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Function to preprocess the tweet (similar to how it was done during training)
def preprocess_tweet(tweet):
    # Tokenize and pad the tweet
    sequence = tokenizer.texts_to_sequences([tweet])
    padded_sequence = pad_sequences(sequence, maxlen=100)  # Use the same maxlen as used during training
    return padded_sequence

# Function to predict sentiment using the loaded model
def predict_sentiment(tweet):
    preprocessed_tweet = preprocess_tweet(tweet)
    prediction = model.predict(preprocessed_tweet)
    
    # Use argmax to get the index of the highest probability
    predicted_class = np.argmax(prediction, axis=1)[0]  # Get the class with the highest probability
    
    # Map predicted class index to sentiment labels
    sentiment_map = {0: "Negative", 1: "Neutral", 2: "Positive"}  # Example class-to-sentiment mapping
    sentiment = sentiment_map.get(predicted_class, "Unknown")
    
    return sentiment

# User registration (Sign Up)
@app.route('/api/register', methods=['POST'])
def register():
    users = mongo.db.users
    full_name = request.json['fullName']
    number = request.json['number']
    email = request.json['email']
    password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')

    if users.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400

    user_id = users.insert_one({
        'fullName': full_name,
        'number': number,
        'email': email,
        'password': password
    })

    return jsonify({'message': 'User registered successfully', 'user_id': str(user_id)})

# User login (Sign In)
@app.route('/api/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({'error': 'Invalid input format, expected JSON'}), 400

    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    users = mongo.db.users
    user = users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity={'email': user['email']})
        return jsonify({'message': 'Login successful', 'token': access_token})

    return jsonify({'error': 'Invalid email or password'}), 401

# Flask route to handle prediction
@app.route('/predict', methods=['POST'])
def predict_sentiment_route():
    data = request.get_json(force=True)
    tweet = data['tweet']
    
    # Use the model to predict sentiment
    sentiment = predict_sentiment(tweet)

    # Store prediction data in MongoDB
    predictions = mongo.db.predictions
    prediction_data = {
        'tweet': tweet,
        'sentiment': sentiment,
        'created_at': datetime.datetime.utcnow()  # Timestamp when the prediction was made
    }
    
    # Insert the prediction data into MongoDB
    predictions.insert_one(prediction_data)

    # Return the predicted sentiment
    return jsonify({"sentiment": sentiment})

if __name__ == '__main__':
    app.run(debug=True)
