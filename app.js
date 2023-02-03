const express = require("express");
require("dotenv").config();
const app = express();
require("./middleware/authentication");
require("express-async-errors");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blogs");
const cors = require('cors')


app.use(cors())
app.use(express.json());


app.use("/auth", authRouter);
app.use("/blogs", blogRouter);

app.get("/", (req, res) => {
	res.send("Welcome home");
});

app.use((req, res) => {
	res.status(404).json({ message: "page not found" });
});

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

module.exports = app;
