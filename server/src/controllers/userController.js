import User from '../models/User.js';

const login = async (username, password, res, next) => {
    try {
        const user = await User.findOne({ userName: username }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password, please try again'
            });
        }
        const isPasswordValid = user.checkPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
        return res.json({
            success: true,
            user: user
        })

    } catch (err) {
        next(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export default {
    login,
};