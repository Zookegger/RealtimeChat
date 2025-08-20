import { Router } from "express";
import { login } from "../../controllers/userController.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../../middlewares/requestValidation.js";

const loginValidation = [
	body("username").notEmpty().withMessage("Username is required"),
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
		.withMessage("Password must contain a letter"),
];

const router = Router();

router.post("/login", loginValidation, handleValidationErrors, login);

router.get("/health", (req, res) => {
	res.json("It's working!");
});

export default router;