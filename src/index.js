require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const tasksRouter = require("../routes/tasks");
const usersRouter = require("../routes/users");
const config = require("../config");

const app = express();

mongoose.connect(config.mongoURI);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
