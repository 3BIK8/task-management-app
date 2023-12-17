const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Collection = require("../models/Collection");
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
		console.log(user);
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
	const { title, description, dueDate, priority, tags, status , important } = req.body;

	const task = new Task({
		title,
		description,
		user: req.user.userId,
		dueDate,
		priority,
		tags,
		status,
		important,
		createdAt: new Date()
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
		const deletedTask = await Task.findOneAndDelete({ _id: req.params.id });

		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post("/:taskId/atc/:collectionId", async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		const collection = await Collection.findById(req.params.collectionId);

		if (!task || !collection) {
			return res.status(404).json({ message: "Task or Collection not found" });
		}

		// Check if the task is already in the collection
		if (collection.tasks.includes(task._id)) {
			return res
				.status(400)
				.json({ message: "Task already exists in the collection" });
		}

		collection.tasks.push(task._id);
		await collection.save();

		res.json(collection);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// 8. Removing Tasks from Collections
router.delete("/:taskId/rfc/:collectionId", async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		const collection = await Collection.findById(req.params.collectionId);

		if (!task || !collection) {
			return res.status(404).json({ message: "Task or Collection not found" });
		}

		collection.tasks = collection.tasks.filter(
			(taskId) => taskId.toString() !== task._id.toString()
		);

		await collection.save();

		res.json(collection);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// 9. Counter for Total Tasks and Tasks per Collection
router.get("/count", async (req, res) => {
	try {
		const totalTasks = await Task.countDocuments();
		res.json({ totalTasks });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
