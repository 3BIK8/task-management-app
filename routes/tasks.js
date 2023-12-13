const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticateToken(req, res, next) {
	const token = req.header("Authorization");

	// Check if the token starts with "Bearer "
	if (!token || !token.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	// Extract the token without the "Bearer " prefix
	const actualToken = token.split(" ")[1];

	console.log("Received token:", token);
	console.log("Actual token for verification:", actualToken);

	jwt.verify(actualToken, config.jwtSecret, (error, user) => {
		if (error) {
			console.error("JWT Verification Error:", error);
			return res.status(403).json({ message: "Forbidden" });
		}

		req.user = user;
		next();
	});
}

// Get all tasks
router.get("/", authenticateToken, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.userId });
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Create a new task
router.post("/", authenticateToken, async (req, res) => {
	const task = new Task({
		title: req.body.title,
		description: req.body.description,
		user: req.user.userId,
	});

	try {
		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Update a task
router.patch("/:id", authenticateToken, async (req, res) => {
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description,
			},
			{ new: true }
		);

		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json(updatedTask);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Delete a task
router.delete("/:id", authenticateToken, async (req, res) => {
	try {
		const deletedTask = await Task.findByIdAndRemove(req.params.id);

		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
