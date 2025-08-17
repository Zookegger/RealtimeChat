import { Server as SocketIOServer } from 'socket.io';
import logger from '../utils/logger.js';

/**
 * Initializes the Socket.IO WebSocket server and sets up connection/disconnection handlers.
 * @param {import('http').Server} httpServer - The HTTP server instance to attach Socket.IO to
 * @returns {void}
 */
export const createWebsockeServer = (httpServer) => {
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
    io.on('connect', (socket) => {
        connections.set(socket.id, socket);
        logger.info(`[CONNECT] Total connections: ${connections.size}`);

        logger.info(`WebSocket connected: ${socket.id}`);
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