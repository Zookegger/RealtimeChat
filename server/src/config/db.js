import mongoose from "mongoose";
import logger from "../utils/logger.js";

/**
 * MongoDB connection URI
 * @type {string}
 */

// Configuration options
const MONGO_URI =
	process.env.MONGO_URI || "mongodb://localhost:27017/realtimechat";

/**
 * Mongoose connection options
 * @type {import('mongoose').ConnectOptions}
 */
const CONNECTION_OPTIONS = {
    serverSelectionTimeoutMS: 5000,     // Fail faster if no server is found
    maxPoolSize: 10,                    // Manage connection pool size
    socketTimeoutMS: 45000,             // Close sockets after 45s of inactivity
    family: 4,                          // Use IPv4, skip trying IPv6
    heartbeatFrequencyMS: 10000,        // Send heartbeat every 10s
};

// Connection events

// Connection established
/**
 * Event handler for successful MongoDB connection
 */
mongoose.connection.on("connected", () => {
	const connInfo = {
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        db: mongoose.connection.name,
        readyState: mongoose.connection.readyState
    };
    logger.info('MongoDB connected', connInfo);
});

// Connection error
/**
 * Event handler for MongoDB connection errors
 * @param {Error} err
 */
mongoose.connection.on("error", (err) => {
	logger.error(`MongoDB connection error: ${err.message}`);
	process.exit(1); // Exit process on initial connection error
});

// Connection lost
/**
 * Event handler for MongoDB disconnection
 */
mongoose.connection.on("disconnected", () => {
	logger.warn("MongoDB disconnected!");
});

/**
 * Gracefully shuts down the MongoDB connection
 * @param {string} signal - The signal that triggered the shutdown
 * @returns {Promise<void>}
 */
const shutdown = async (signal) => {
	try {
		await mongoose.connection.close();
		logger.info(`MongoDB disconnected through ${signal}`);
		process.exit(0);
	} catch (err) {
		logger.error(`Error disconnecting MongoDB: ${err.message}`);
		process.exit(1);
	}
};

// Handle application termination signals for graceful shutdown
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

/**
 * Connects to MongoDB using Mongoose
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
	if (mongoose.connection.readyState >= 1) {
		logger.warn('MongoDB already connected!');
		return; // Avoid duplicate connections
	}

	try {
		logger.info('Attempting MongoDB connection...');
		await mongoose.connect(MONGO_URI, CONNECTION_OPTIONS);
        logger.info('✅ MongoDB connected successfully');
	} catch (err) {
		logger.error(`Initial MongoDB connection failed: ${err.message}`);
		process.exit(1);
	}
};

/**
 * Disconnects from MongoDB using Mongoose
 * @returns {Promise<void>}
 */
export const disconnectDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        logger.info('MongoDB manually disconnected');
    }
};

/**
 * Returns the current status of the MongoDB connection
 * @returns {{status: string, host: string, port: number, dbName: string}}
 */
export const dbStatus = () => ({
	status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
	host: mongoose.connection.host,
	port: mongoose.connection.port,
	dbName: mongoose.connection.name,
});