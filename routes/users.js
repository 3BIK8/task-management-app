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

module.exports = router;
