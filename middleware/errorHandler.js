const { Unauthorized } = require("../errors/unauthorized");

function handleErrors(err, req, res, next) {
	let error = {
		statusCode: err.statusCode || 500,
		msg: err.message || "Something went wrong",
	};

	if (err instanceof Unauthorized) {
		return res.status(err.statusCode).json({ msg: err.message });
	}

	if (err.code && err.code === 11000) {
		error.message = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)}. Please choose another value`;
		error.statusCode = 400;
	}
	if (err.name === "ValidationError") {
		error.message = Object.values(err.errors)
			.map((err) => err.message)
			.join(", ");
		error.statusCode = 400;
	}
	if (err.name === "CastError") {
		error.message = `No item found with Id : ${err.value}`;
		error.statusCode = 404;
	}

	return res.status(error.statusCode).json({ message: error.message });
}

module.exports = handleErrors;
