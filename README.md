
# Project: Analyzing the Impact of Tweets on Cryptocurrency Market Trends

## Overview

This project uses sentiment analysis of tweets to predict cryptocurrency market trends. It implements a deep learning model combining LSTM and GRU to analyze tweets and provides insights into how public sentiment impacts cryptocurrency prices. 

## Features

- **User Authentication**: Users can register, log in, and access the sentiment analysis dashboard.
- **Sentiment Analysis**: Analyze the sentiment of tweets in real-time using a pre-trained LSTM-GRU model to classify the sentiment as positive, negative, or neutral.
- **Prediction Dashboard**: Once logged in, users can input tweets and receive sentiment predictions.
- **Protected Routes**: The sentiment prediction functionality is restricted to authenticated users.
- **MongoDB Integration**: User information is stored in a MongoDB database.

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Flask (or Django), REST API
- **Machine Learning**: TensorFlow, Keras (LSTM and GRU models)
- **Database**: MongoDB (for user authentication)
- **Model**: Pre-trained `lstm_gru_cryptocurrency_tweet_model.h5`
- **HTTP Client**: Axios

## Screenshots

### Home Page

![Home Page](./screenshots/home.png)

### Register Page

![Register Page](./screenshots/register.png)

### Login Page

![Login Page](./screenshots/login.png)

### Prediction Page

![Prediction Page](./screenshots/prediction.png)

## Installation and Setup

### Prerequisites

1. **Node.js** (for frontend)
2. **Python 3.8+** (for backend and model)
3. **MongoDB** (as the database)
4. **Virtual Environment** (for Python dependencies)
5. **Flask** or **Django** (for serving backend API)
6. **Dependencies**:
   - Python: `Flask`, `TensorFlow`, `Keras`, `Numpy`, `Pandas`, `pymongo`
   - Frontend: `React`, `Axios`, `Bootstrap`

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/crypto-tweet-sentiment.git
cd crypto-tweet-sentiment
```

### Step 2: Set Up the Backend

1. Navigate to the backend directory.
2. Set up a Python virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # For Mac/Linux
venv\Scripts\activate     # For Windows
```

3. Install required Python packages:

```bash
pip install Flask tensorflow keras numpy pandas pymongo
```

4. Set up MongoDB and create a database for user data. Update the MongoDB URI in the backend to connect to your MongoDB instance.

5. Run the Flask server:

```bash
export FLASK_APP=app.py
flask run
```

The backend server will be available at `http://localhost:5000`.

### Step 3: Set Up the Frontend

1. Navigate to the `frontend` directory.
2. Install the necessary packages:

```bash
npm install
```

3. Run the React development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

### Step 4: Connect Frontend with Backend

- Ensure the backend is running before accessing the frontend.
- The frontend makes HTTP requests to the backend API at `http://localhost:5000`. Ensure that this endpoint matches the one in the backend configuration.

## Project Structure

```
crypto-tweet-sentiment/
│
├── backend/
│   ├── app.py              # Flask backend
│   ├── lstm_gru_model.py    # LSTM-GRU model for sentiment analysis
│   └── lstm_gru_cryptocurrency_tweet_model.h5  # Pre-trained model
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js          # Homepage component
│   │   │   ├── Login.js         # Login component
│   │   │   ├── Register.js      # Register component
│   │   │   ├── Prediction.js    # Tweet sentiment prediction page
│   │   │   ├── PrivateRoute.js  # Route protection based on authentication
│   │   └── App.js              # Main application routing
│   ├── App.css                 # Custom CSS styles
│   └── index.js                # React entry point
└── README.md                   # Project documentation
```

### Frontend Components

- **`App.js`**: Main component that sets up routing for the app.
- **`Home.js`**: Landing page describing the project.
- **`Login.js`**: Page for user authentication (login).
- **`Register.js`**: Page for new user registration.
- **`Prediction.js`**: Form to input a tweet and display sentiment analysis results.
- **`PrivateRoute.js`**: Protects the prediction page, ensuring only authenticated users have access.

### Backend Files

- **`app.py`**: The main Flask app handling user registration, login, and prediction.
- **`lstm_gru_model.py`**: Script containing the LSTM-GRU sentiment analysis model.
- **`lstm_gru_cryptocurrency_tweet_model.h5`**: Pre-trained model file for sentiment prediction.

## How to Use

### 1. Register and Login

- Go to `http://localhost:3000/signup` to create a new account.
- After registration, log in at `http://localhost:3000/signin`.

### 2. Analyze Tweets

- Once logged in, go to `http://localhost:3000/predict`.
- Enter a tweet into the text area and submit it to receive the sentiment prediction.

### 3. JWT Token Authentication

- After a successful login, a JWT token is stored in `localStorage`.
- This token is used to access protected routes such as `/predict`.

## Backend API Endpoints

| Endpoint        | Method | Description                   |
|-----------------|--------|-------------------------------|
| `/api/register` | POST   | Registers a new user           |
| `/api/login`    | POST   | Logs in an existing user       |
| `/predict`      | POST   | Receives a tweet and returns its sentiment analysis |

## Model Details

- The **LSTM-GRU hybrid model** processes each tweet to predict the sentiment (positive, negative, or neutral).
- The model was trained on a large dataset of cryptocurrency-related tweets using TensorFlow and Keras.
- **`lstm_gru_cryptocurrency_tweet_model.h5`** is the pre-trained model file that the backend uses for predictions.

## Future Enhancements

- **Advanced Sentiment Analysis**: Add more detailed sentiment analysis, including multiple emotions (joy, anger, etc.).
- **Cryptocurrency Price Integration**: Direct integration of cryptocurrency prices and trends with tweet sentiment.
- **Real-Time Predictions**: Enable real-time analysis and visualization of live tweet streams.

## License

This project is licensed under the MIT License.
