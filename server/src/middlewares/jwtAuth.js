import jwt from "jsonwebtoken";

// Configuration
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_ISSUER = process.env.JWT_ISSUER ?? 'realtime-chat';
const JWT_AUDIENCE = process.env.JWT_AUDIENCE ?? 'chat-users';
// const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;

if (JWT_SECRET) throw new Error("Missing JWT_SECRET environment variable");

/**
 * Generates a JWT token for user authentication
 *
 * @function generateJwt
 * @param {Object} payload - Data to encode in the JWT (e.g., user_id, user_role)
 * @param {Object} [options] - Optional JWT signing options (expiresIn, issuer, audience, etc.)
 * @returns {string} JWT token string
 * @example
 * const token = generateJwt({ user_id: 1, user_role: 'admin' }, { expiresIn: '2h' });
 */
export const generateJwt = (payload, options = {}) => {
	const default_options = {
		expiresIn: JWT_EXPIRES_IN ?? "2h",
		issuer: JWT_ISSUER ?? 'realtime-chat',
		audience: JWT_AUDIENCE ?? 'chat-users',
	};

	return jwt.sign(payload, JWT_SECRET, { ...default_options, ...options });
};

/**
 * Express middleware to authenticate requests using JWT
 *
 * Checks for a JWT token in the Authorization header (Bearer scheme), verifies it,
 * and attaches the decoded payload to req.user. Responds with 401/403 on failure.
 *
 * @function authenticateJwt
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * @example
 * app.get('/protected', authenticateJwt, (req, res) => {
 *   // req.user contains decoded JWT payload
 * });
 */
export const authenticateJwt = (req, res, next) => {
	const token =
		(req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null) || req.cookies?.jwt_token;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "You need to be logged in",
		});
	}

	jwt.verify(
		token,
		JWT_SECRET,
		{
			issuer: JWT_ISSUER,
			audience: JWT_AUDIENCE,
		},
		(err, user) => {
			if (err) {
                const error_message = err.name === 'TokenExpiredError' 
                    ? 'Token expired' 
                    : 'Invalid token';

                return res.status(401).json({ 
                    success: false, 
                    message: error_message 
                });
            }

			req.user = user;
			next();
		}
	);
};

/**
 * Sets JWT token as HTTP-only cookie
 * @param {Object} res - Express response object  
 * @param {Object} payload - Data to encode in JWT
 */
export const setJwtCookie = (res, payload) => {
	const jwt_token = generateJwt(payload);

	res.cookie("jwt_token", jwt_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		path: "/",
	});
};