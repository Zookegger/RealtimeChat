// Create a core logging function
const createLog =
	(level) =>
	(...args) => {
		const timestamp = new Date().toISOString();
		const message = `[${level.toUpperCase()}] ${timestamp} - ${args.join(
			" "
		)}`;
		switch (level) {
			case "error":
				console.error(message);
				break;
			case "warn":
				console.warn(message);
				break;
			case "debug":
				if (process.env.NODE_ENV === 'development') console.debug(message);
				break;
            default:
                console.log(message);
		}
	};

// HTTP-specific middleware
const httpLogger = () => {
    return (req, res, next) => {
        const start = Date.now();

		res.on("finish", () => {
			const duration = Date.now() - start;
			const level = 
                            res.statusCode >= 500 ? "error" : 
                            res.statusCode >= 400 ? "warn" : "info";

			const message = `${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`;
            
            logger[level](message);
		});
        
		next();
    };
};

const logger = {
    info: createLog('info'),
    warn: createLog('warn'),
    error: createLog('error'),
    debug: createLog('debug'),
    http: httpLogger
};

export default logger;
