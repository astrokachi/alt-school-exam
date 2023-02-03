const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const {
	signUpValidationMiddleware,
	logInValidationMiddleware,
} = require("../validation/user.validation");

authRouter.post(
	"/login",
	logInValidationMiddleware,
	passport.authenticate("login", { session: false }),
	async (req, res) => {
		res.json({
			message: "successfully logged in",
			user: req.user,
			token: req.token,
		});
	}
);

authRouter.post(
	"/signup",
	signUpValidationMiddleware,
	passport.authenticate("signup", { session: false }),
	async (req, res) => {
		res.json({
			message: "Sign up successful",
			user: req.user,
			token: req.token,
		});
	}
);

module.exports = authRouter;
