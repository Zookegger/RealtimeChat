# RealtimeChat MERN Frontend

## Overview
RealtimeChat is a simple chat application built using the MERN stack (MongoDB, Express, React, Node.js) that demonstrates real-time bidirectional communication using Socket.IO. This frontend application connects to the backend server to facilitate real-time chat functionality.

## Project Structure
- **public/index.html**: The main HTML file that serves the React application.
- **src/App.js**: The main component that renders the Chat component.
- **src/index.js**: The entry point of the React application.
- **src/components/Chat.js**: The component responsible for handling chat messages and user input.

## Setup Instructions

1. **Install Dependencies**  
   Navigate to the `frontend` directory and run:
   ```
   npm install
   ```

2. **Start the Application**  
   To start the frontend application, run:
   ```
   npm start
   ```
   This will launch the application in your default web browser at `http://localhost:3000`.

3. **Connect to Backend**  
   Ensure that the backend server is running. The frontend will connect to the backend for real-time chat functionality.

## Usage
- Open multiple browser tabs at `http://localhost:3000` to simulate different users.
- Type messages in the chat input box and press enter to send.
- All connected clients will see the messages in real-time.

## Additional Notes
- This project is intended for educational purposes to help beginners understand real-time communication using Socket.IO in a MERN stack application.
- Feel free to modify and expand the project as you learn more about React and Socket.IO.