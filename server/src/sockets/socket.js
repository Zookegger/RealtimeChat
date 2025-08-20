import { Server as SocketIOServer } from 'socket.io';
import logger from '../utils/logger.js';
import Message from '../models/Message.js';

/**
 * Initializes the Socket.IO WebSocket server and sets up connection/disconnection handlers.
 * @param {import('http').Server} httpServer - The HTTP server instance to attach Socket.IO to
 * @returns {void}
 */
export const createWebsocketServer = (httpServer) => {
    const connections = new Map();

    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            credentials: true
        }
    });

    /**
     * Handles new WebSocket connections.
     * @param {import('socket.io').Socket} socket - The connected socket instance
     */
    io.on('connection', (socket) => {
        connections.set(socket.id, socket);
        logger.info(`[CONNECT] Total connections: ${connections.size}`);

        socket.on('join_room', (room) => {
            socket.join(room);
            logger.debug(`User ${socket.id} joined room: ${room}`);
        })

        socket.on('send_message', async (data) => {
            try {
                const { text, user, room } = data;
                if (!text || !user || !room) {
                    throw new Error('Invalid message format');
                }
                
                const message = new Message({ text: text, room: room, user: user });
                const result = await message.save();
                if (result) {
                    
                }
                
                io.to(room).emit('new_message', message);
                logger.debug(`Message sent to ${room} by ${user}`)
            } catch (err) {
                logger.error(`Message error: ${err}`);
                socket.emit(`error`, { type: 'MESSAGE_FAILED', details: err.message });
            }
        });
    });
    
    /**
     * Handles WebSocket disconnections.
     * @param {import('socket.io').Socket} socket - The disconnected socket instance
     */
    io.on('disconnect', (socket) => {
        connections.delete(socket.id);
        logger.info(`[DISCONNECT] Total connections: ${connections.size}`);

        logger.info(`WebSocket disconnected: ${socket.id}`)
    });
};