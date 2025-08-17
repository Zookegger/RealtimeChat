# RealtimeChat

A full-stack realtime chat application using Node.js, Express, Socket.IO, MongoDB, React, and Docker Compose.

## Features
- Realtime messaging with WebSocket (Socket.IO)
- RESTful API for chat history and user management
- MongoDB for persistent storage
- Frontend built with React
- Docker Compose for easy multi-service orchestration

## Prerequisites
- Docker and Docker Compose installed

## Quick Start (Docker Compose)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zookegger/RealtimeChat.git
   cd RealtimeChat
   ```

2. **Configure environment variables:**
   - Edit `.env.docker` (or `.env`) to set MongoDB credentials, JWT secrets, etc.
   - Example:
     ```env
     MONGO_INITDB_ROOT_USERNAME=root
     MONGO_INITDB_ROOT_PASSWORD=yourpassword
     MONGO_URI=mongodb://root:yourpassword@mongo:27017/realtimechat?authSource=admin
     JWT_SECRET=your_jwt_secret
     ```

3. **Build and start all services:**
   ```bash
   docker compose --env-file .env.docker up --build
   ```
   Or, if using classic Compose:
   ```bash
   cp .env.docker .env
   docker-compose up --build
   ```

4. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)
   - Mongo Express (DB UI): [http://localhost:8081](http://localhost:8081)

## Project Structure
```
RealtimeChat/
  client/           # React frontend
  server/           # Node.js backend
  docker-compose.yml
  .env.docker       # Environment variables for Docker Compose
```

## Useful Commands
- Stop all services:
  ```bash
  docker compose down
  ```
- View logs:
  ```bash
  docker compose logs -f
  ```
- Rebuild images:
  ```bash
  docker compose build
  ```

## Troubleshooting
- Make sure your environment variables are correct in `.env.docker`.
- If you change `.env.docker`, restart Compose to reload variables.
- For classic Compose, always use `.env` for variable substitution.

## License
MIT
