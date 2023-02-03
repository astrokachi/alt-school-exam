const express = require("express");
require("dotenv").config();
const app = express();
require("./middleware/authentication");
const errorHandler = require("./middleware/errorHandler");
require("express-async-errors");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blogs");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

//swagger
const swaggerDocument = YAML.load("./swagger.yaml");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

//base routes
app.use("/auth", authRouter);
app.use("/blogs", blogRouter);

//error handler
app.use(errorHandler);

//swagger implementation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//index page
app.get("/", (req, res) => {
	res.send('<h1>Blogs API</h1><a href="/api-docs">Documentation</a>');
});

app.use((req, res) => {
	res.status(404).json({ message: "page not found" });
});

module.exports = app;
