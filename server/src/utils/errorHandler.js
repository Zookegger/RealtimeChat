import logger from "./logger.js";
import { validationResult } from "express-validator";

export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true, errors = []) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errors = errors;
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class ValidationError extends AppError {
    constructor(errors, message = "Validation failed") {
        super(message, 400, true, errors);
    }
}

export class AuthenticationError extends AppError {
    constructor(message = "Authentication required") {
        super(message, 401);
    }
}

export class AuthorizationError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export const validateRequest = (validations) => {
    return async (req, res, next) => {
        try {
            await Promise.all(validations.map(validation => validation.run(req)));
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                const formattedErrors = errors.array().map(error => ({
                    field: error.path || error.param,
                    message: error.msg,
                    value: error.value,
                    location: error.location
                }));
                return next(new ValidationError(formattedErrors));
            }
            
            next();
        } catch (err) {
            next(err);
        }
    };
};

export const errorHandler = (err, req, res, next) => {
    // 1. Handle missing error object
    if (!err || typeof err !== 'object') {
        err = new AppError('Unknown server error', 500);
    }

    // 2. Safeguard against missing request context
    const requestContext = req ? {
        method: req.method,
        path: req.path,
        ip: req.ip,
        user: req.user ? req.user.id : "anonymous",
        originalUrl: req.originalUrl
    } : {
        method: 'N/A',
        path: 'N/A',
        ip: 'N/A',
        user: 'no-request-context',
        originalUrl: 'N/A'
    };

    // 3. Log with safe context
    logger.error(`${err.name} [${err.statusCode || 500}] - ${err.message}`, {
        ...requestContext,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });

    // 4. Prepare response
    const statusCode = err.statusCode || 500;
    const response = {
        error: {
            type: err.name,
            message: statusCode === 500 ? "Internal Server Error" : err.message,
            timestamp: new Date().toISOString()
        }
    };

    // 5. Add request context if available
    if (req) {
        response.error.path = requestContext.originalUrl;
        response.error.method = requestContext.method;
    }

    // 6. Add validation errors
    if (err.errors?.length > 0) {
        response.error.details = err.errors.map(e => ({
            field: e.field || e.path,
            message: e.message
        }));
    }

    // 7. Add stack trace in development
    if (process.env.NODE_ENV === "development") {
        response.error.stack = err.stack;
    }

    // 8. Send response if possible
    if (res && !res.headersSent) {
        res.status(statusCode).json(response);
    } else {
        // Last resort logging if no response object
        console.error('Fatal: No response object available', response);
    }
};