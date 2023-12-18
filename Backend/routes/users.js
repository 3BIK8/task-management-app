// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Register a new user
router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = new User({ username, password });
		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Login
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
			expiresIn: "24h",
		});

		console.log("Received token:", token);

		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
// Read all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Read a specific user
router.get("/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		res.json(user);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update a user
router.patch("/:userId", async (req, res) => {
	try {
		await User.updateOne(
			{ _id: req.params.userId },
			{ $set: { username: req.body.username, email: req.body.email } }
		);
		res.status(201).json({ message: "User Updated successfully" });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Delete a user
router.delete("/:userId", async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.userId });
		res.status(201).json({ message: "User Deleted successfully" });
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
