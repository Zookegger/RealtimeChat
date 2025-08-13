const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const connectDB = require('./config/db'); 

const PORT = 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: '*'}});

let total_connections = 0; 

app.use(express.static(path.join(__dirname, '../../client/public')));

io.on('connection', (socket) => {
    total_connections++;
    console.log('Total connections: ', total_connections);
    console.log('A user connected: ', socket.id);
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', {sender: socket.id, text: msg});
    });

    socket.on('disconnect', () => {
        total_connections--;
        console.log('Total connections: ', total_connections);
        console.log('User disconnected: ', socket.id);
    });
});

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });