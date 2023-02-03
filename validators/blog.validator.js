const Joi = require("joi");

const BlogSchema = Joi.object({
	title: Joi.string().required().min(1).max(255).trim(),
	state: Joi.string().required().min(1).max(255).trim(),
	description: Joi.string().optional().trim(),
	tags: Joi.string().trim(),
	author: Joi.string().trim(),
	read_count: Joi.number().min(0),
	reading_time: Joi.number().min(0),
	body: Joi.string().required().trim(),
});

async function BlogValidationMiddleWare(req, res, next) {
	const BlogPayload = req.body;

	try {
		await BlogSchema.validateAsync(BlogPayload);
		next();
	} catch (error) {
		next({
			message: error.details[0].message,
			status: 400,
		});
	}
}

module.exports = BlogValidationMiddleWare;
