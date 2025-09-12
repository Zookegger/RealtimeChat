import { setJwtCookie } from '../middlewares/jwtAuth.js';
import logger from './logger.js';

export const createAuthResponse = (res, user, message) => {
    const payload = {
        user_id: user._id,
        username: user.userName,
        user_role: user.userRole,
    };
    
    setJwtCookie(res, payload);
    
    return res.json({
        success: true,
        message: message,
        user: {
            user_id: user._id,
            username: user.userName,
            user_role: user.userRole,
        },
    });
}

export const checkAuthStatus = (res, user) => {
    const payload = {
        user_id: user._id,
        username: user.userName,
        user_role: user.userRole,
    };

    return res.json({
        success: true,
        user: payload
    });
}