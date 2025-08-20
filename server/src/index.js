import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import logger from './utils/logger.js';
import dotenv from 'dotenv';
import { createWebsocketServer } from './sockets/socket.js';

dotenv.config();

logger.debug(`JWT_SECRET: ${process.env.JWT_SECRET}`);

const PORT = process.env.SERVER_PORT || 5000;

/**
 * Establishes a connection to the MongoDB database.
 * @returns {Promise<void>}
 */
const establishDatabaseConnection = async () => {
    logger.info('Establishing database connection...');
    await connectDB();
};

/**
 * Creates the HTTP server using Express app.
 * @returns {http.Server}
 */
const createHttpServer = () => {
    const server = http.createServer(app);
    logger.info('HTTP server instance created');
    return server;
};

/**
 * Starts the HTTP server and logs status messages.
 * @param {http.Server} server - The HTTP server instance
 */
const startServer = (server) => {
    server.listen(PORT, () => {
        logger.info(`🚀 Server running on port ${PORT}`);
        logger.info(`🔌 WebSocket ready at ws://localhost:${PORT}`);
        logger.info(`🌐 HTTP access at http://localhost:${PORT}`);
    });

    // Handle server errors
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            logger.error(`Port ${PORT} is already in use`);
        } else {
            logger.error(`Server error:`, error.message);
        }
        process.exit(1);
    });
};

/**
 * Handles critical startup errors and closes database connection if needed.
 * @param {Error} error - The error object
 */
const handleStartupError = (error) => {
    logger.error(`Critical startup failure:`, error.message);
    logger.debug('Error details:', error.stack);

    // Close existing database connection if it exists
    if (mongoose.connection?.readyState === 1) {
        mongoose.connection.close(false, () => {
            logger.info('Database connection closed due to startup failure');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

/**
 * Initializes the server: connects to DB, creates HTTP server, sets up WebSocket, and starts listening.
 * @returns {Promise<void>}
 */
const initializeServer = async () => {
    try {
        await establishDatabaseConnection();
        const server = createHttpServer();
        createWebsocketServer(server);
        startServer(server);
    } catch (err) {
        handleStartupError(err);
    }
};

/**
 * Start the application
 */
initializeServer();