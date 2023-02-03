const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./logger/logger");

const PORT = process.env.PORT || 3334;

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		app.listen(PORT, () => {
			logger.info(`server is listening on port, ${PORT}`);
		});
	} catch (error) {
		logger.error(error);
	}
}

start();
