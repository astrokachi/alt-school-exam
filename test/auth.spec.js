const request = require("supertest");
const { connect } = require("./database");
const userModel = require("../models/User");
const app = require("../app");

describe("Auth: Signup", () => {
	let conn;

	beforeAll(async () => {
		// establish connection to database before running tests
		conn = await connect();
	});

	afterEach(async () => {
		// clean up code after every test
		await conn.cleanup();
	});

	afterAll(async () => {
		// close the database connection at the end of the tests
		await conn.disconnect();
	});

	it("should signup a user", async () => {
		//Send data as JSON
		const response = await request(app)
			.post("/auth/signup")
			.set("content-type", "application/json")
			.send({
				password: "secrett",
				first_name: "astro",
				last_name: "kashi",
				email: "kashi@gmail.com",
			});

		// Make sure the response is successful
		expect(response.status).toBe(200);
		// Make sure that response contains a message
		expect(response.body).toHaveProperty("message");
		// Make sure that user information is included in response body
		expect(response.body).toHaveProperty("user");
	});

	it("should login a user", async () => {
		//create user in db
		const user = await userModel.create({
			password: "secrett",
			first_name: "astro",
			last_name: "kashi",
			email: "kashi@gmail.com",
		});

		//attempt to login the user
		const response = await request(app)
			.post("/auth/login")
			.set("content-type", "application/json")
			.send({
				email: "kashi@gmail.com",
				password: "secrett",
			});

		// ensure the response was successful
		expect(response.status).toBe(200);
		// make sure response contains the expected message
		expect(response.body).toHaveProperty("message", "successfully logged in");
	});
});
