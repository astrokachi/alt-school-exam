const request = require("supertest");
const { connect } = require("./database");
const userModel = require("../models/User");
const app = require("../app");

describe("Auth: Signup", () => {
	let conn;

	beforeAll(async () => {
		conn = await connect();
	});

	afterEach(async () => {
		await conn.cleanup();
	});

	afterAll(async () => {
		await conn.disconnect();
	});

	it("should signup a user", async () => {
		const response = await request(app)
			.post("/auth/signup")
			.set("content-type", "application/json")
			.send({
				password: "secrett",
				first_name: "astro",
				last_name: "kashi",
				email: "kashi@gmail.com",
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message");
		expect(response.body).toHaveProperty("user");
	});

	it("should login a user", async () => {
		// create user in out db
		const user = await userModel.create({
			password: "secrett",
			first_name: "astro",
			last_name: "kashi",
			email: "kashi@gmail.com",
		});

		// login user
		const response = await request(app)
			.post("/auth/login")
			.set("content-type", "application/json")
			.send({
				email: "kashi@gmail.com",
				password: "secrett",
			});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message", "successfully logged in");
	});
});
