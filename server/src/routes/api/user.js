import { Router } from "express";
import userController from "../../controllers/userController";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
	"login/",
	[
		body("username").notEmpty().withMessage("Username is required"),
		body("password")
			.isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
			.matches(/\d/).withMessage("Password must contain a number")
			.matches(/[a-zA-Z]/).withMessage("Password must contain a letter"),
	],
	async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

		const { username, password } = req.body;
		await userController.login(username, password, res, next);
	}
);

export default router;