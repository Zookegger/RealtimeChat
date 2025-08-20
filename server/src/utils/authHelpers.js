import { setJwtCookie } from '../middlewares/jwtAuth.js';

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