# RealtimeChat MERN Backend

## Project Overview
RealtimeChat is a simple chat application built using the MERN stack (MongoDB, Express, React, Node.js) that demonstrates real-time bidirectional communication using Socket.IO. This project is designed for beginners to understand how WebSockets work in practice and how to implement a real-time chat feature.

## Backend Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Navigate to the backend directory:
   ```
   cd realtimechat-mern/backend
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

### Running the Server
To start the backend server, run the following command:
```
node src/index.js
```

The server will start on `http://localhost:3000` (or the port specified in your code).

### Usage
- Open multiple browser tabs and connect to `http://localhost:3000` to start chatting.
- Messages sent from one client will be broadcasted to all connected clients in real-time.

## File Structure
- `src/index.js`: Entry point for the backend application, sets up the Express server and Socket.IO.
- `package.json`: Contains project metadata and dependencies.

## Additional Information
This backend does not include user authentication or message persistence. It is a simple implementation intended for educational purposes. You can expand upon this project by adding features such as user profiles, message history, or integrating a database for message storage.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features you would like to add.