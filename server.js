const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3334;

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		app.listen(PORT, () => {
			console.log("server is listening on port", PORT);
		});
	} catch (error) {
		console.log(error);
	}
}

start();
