import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import errorHandler from './utils/errorHandler.js';
import router from './routes/index.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(logger.http());

app.use(router);

app.use((req, res, next) => {
    res.status(404).json({error: 'Route not found'});
})

app.use(errorHandler);

export default app;