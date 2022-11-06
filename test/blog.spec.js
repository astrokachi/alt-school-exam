const request = require("supertest");
const { connect } = require("./database");
const app = require("../app");
const blogPostModel = require("../models/Blog");
const userModel = require("../models/User");

describe("Blog Route", () => {
	let conn;
	let token;

	beforeAll(async () => {
		conn = await connect();

		await userModel.create({
			password: "secrett",
			first_name: "astro",
			last_name: "kashi",
			email: "kashi@gmail.com",
		});

		const loginResponse = await request(app)
			.post("/auth/login")
			.set("content-type", "application/json")
			.send({
				password: "secrett",
				email: "kashi@gmail.com",
			});

		token = loginResponse.body.user.token;
	});

	afterEach(async () => {
		await conn.cleanup();
	});

	afterAll(async () => {
		await conn.disconnect();
	});

	it("should return all published blogs", async () => {
		// create order in our db
		await blogPostModel.create({
			title: "testing new routes",
			description: "not much to say",
			tags: "sense",
			body: "omo, i have nothing to say to you do your worse",
		});
		await blogPostModel.create({
			title: "baby",
			description: "not much to say",
			tags: "sense",
			body: "omo, i have nothing to say to you do your worse",
		});

		const response = await request(app)
			.get("/blogs")
			.set("content-type", "application/json")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
	});

	it("should return a blog that has a tag = church", async () => {
		// create order in our db
		await blogPostModel.create({
			title: "testing new routes",
			description: "not much to say",
			tags: "sense",
			body: "omo, i have nothing to say to you do your worse",
		});
		await blogPostModel.create({
			title: "baby",
			description: "not much to say",
			tags: "sense",
			body: "omo, i have nothing to say to you do your worse",
		});

		const response = await request(app)
			.get("/blogs")
			.set("content-type", "application/json")
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(200);
	});
});
