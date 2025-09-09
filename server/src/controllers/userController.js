import User from "../models/User.js";
import { setJwtCookie } from "../middlewares/jwtAuth.js";
import { createAuthResponse } from "../utils/authHelpers.js";

class UserAuthError extends Error {
	constructor(message, error_status) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = error_status;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export const login = async (req, res, next) => {
	try {
		const { login, password } = req.body;

		const user = await User.findOne({
			$or: [
				{ userName: login }, 
				{ email: login }
			],
		}).select("+password");

		if (!user)
			throw new UserAuthError(
				"Invalid username or password, please try again",
				401
			);

		const isPasswordValid = user.checkPassword(password);

		if (!isPasswordValid)
			throw new UserAuthError("Invalid username or password", 401);

		createAuthResponse(res, user, "Login successfully");
	} catch (err) {
		next(err);
	}
};

export const register = async (req, res, next) => {
	try {
		const register_user = req.body;

		const existing_user = await User.findOne({
			$or: [
				{ userName: register_user.userName },
				{ email: register_user.email },
			],
		});

		if (existing_user) {
			throw new UserAuthError("Username or email already exists", 409);
		}

		const new_user = await User.create({
			userName: register_user.userName,
			birthday: register_user.birthday,
			email: register_user.email,
			fullname: register_user.fullname,
			gender: register_user.gender,
			password: register_user.password,
		});

		createAuthResponse(res, new_user, "Registration successfully");
	} catch (err) {
		next(err);
	}
};
