import { Router } from "express";
import { authenticate, login, register } from "../../controllers/userController.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../../middlewares/requestValidation.js";
import { authenticateJwt } from "../../middlewares/jwtAuth.js";

const loginValidation = [
	body("login").notEmpty().withMessage("Username or email is required"),
	body("password").notEmpty().withMessage("Password is required"),
];
const registerValidation = [
	body("username").notEmpty().withMessage("Username is required"),
	body("password")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters")
		.matches(/\d/)
		.withMessage("Password must contain a number")
		.matches(/[a-zA-Z]/)
		.withMessage("Password must contain a letter")
		.isStrongPassword()
		.withMessage("Password is not strong enough"),
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.normalizeEmail()
		.isEmail()
		.withMessage("Email must be in valid email format"),
	body("fullname").notEmpty().withMessage("Fullname is required"),
	body("gender")
		.notEmpty()
		.withMessage("Gender is required")
		.custom((value, { req }) => {
			const genders = ["male", "female", "other"];
			if (genders.indexOf(value) === -1) {
				throw new Error("Invalid Gender");
			}

			return true;
		}),
	body("birthday")
		.notEmpty()
		.withMessage("Birthday is required")
		.isDate()
		.withMessage("Birthday must be in valid date format"),
];

const router = Router();

router.get("/", (req, res) => {
	res.json("This is user route!");
});

router.post("/login", loginValidation, handleValidationErrors, login);

router.post("/register", registerValidation, handleValidationErrors, register);

router.get("/me", authenticateJwt, authenticate);

router.get("/health", (req, res) => {
	res.json("It's working!");
});

export default router;
