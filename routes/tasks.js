const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticateToken(req, res, next) {
	const token = req.header("Authorization");

	console.log("Received token:", token);

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	jwt.verify(token, config.jwtSecret, (error, user) => {
		if (error) {
			console.error("JWT Verification Error:", error); // Add this line for logging
			return res.status(403).json({ message: "Forbidden" });
		}
		req.user = user;
		next();
	});
}

router.get("/", authenticateToken, async (req, res) => {
	try {
		console.log("Decoded User:", req.user); // Add this line for logging
		const tasks = await Task.find();
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:id", authenticateToken, getTask, (req, res) => {
	res.json(res.task);
});

router.post("/", authenticateToken, async (req, res) => {
	const task = new Task({
		title: req.body.title,
		description: req.body.description,
	});

	try {
		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.patch("/:id", authenticateToken, getTask, async (req, res) => {
	if (req.body.title != null) {
		res.task.title = req.body.title;
	}

	if (req.body.description != null) {
		res.task.description = req.body.description;
	}

	try {
		const updatedTask = await res.task.save();
		res.json(updatedTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete("/:id", authenticateToken, getTask, async (req, res) => {
	try {
		await res.task.remove();
		res.json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

async function getTask(req, res, next) {
	let task;

	try {
		task = await Task.findById(req.params.id);

		if (task == null) {
			return res.status(404).json({ message: "Task not found" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.task = task;
	next();
}

module.exports = router;
