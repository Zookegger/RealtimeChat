# RealtimeChat MERN Stack

## Project Overview
RealtimeChat is a simple chat application built using the MERN stack (MongoDB, Express, React, Node.js) that demonstrates real-time bidirectional communication using Socket.IO. This project is designed for beginners to understand how to implement real-time features in a web application.

## Project Structure
```
realtimechat-mern
├── backend
│   ├── src
│   │   └── index.js          # Entry point for the backend application
│   ├── package.json          # Backend dependencies and scripts
│   └── README.md             # Documentation for the backend
├── frontend
│   ├── public
│   │   └── index.html        # Main HTML file for the frontend
│   ├── src
│   │   ├── App.js            # Main React component
│   │   ├── index.js          # Entry point for the frontend application
│   │   └── components
│   │       └── Chat.js       # Chat component for handling messages
│   ├── package.json          # Frontend dependencies and scripts
│   └── README.md             # Documentation for the frontend
└── README.md                 # Overall documentation for the project
```

## Installation

### Backend
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install the necessary dependencies:
   ```
   npm install express socket.io
   ```
3. Start the backend server:
   ```
   node src/index.js
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install the necessary dependencies:
   ```
   npm install react react-dom socket.io-client
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the chat application.
- Open multiple tabs to simulate different users chatting in real-time.

## Features
- Real-time messaging using Socket.IO.
- Simple and clear structure for easy understanding and expansion.
- No authentication or user profiles for simplicity.

## Future Enhancements
- Implement user authentication.
- Add message persistence using a database.
- Enhance the UI for a better user experience.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features you would like to add.