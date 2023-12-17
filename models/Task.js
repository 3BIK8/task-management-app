const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	dueDate: {
		type: Date,
	},
	deleted: {
		type: Boolean,
		default: false,
	},
	important: {
		type: Boolean,
		default: false,
	},
	status: {
		type: String,
		enum: ["completed", "in progress", "pending"],
		default: "pending",
	},
	priority: {
		type: String,
		enum: ["High", "Medium", "Low"],
		required: false,
		default: "Normal",
	},
	tags: {
		type: [String],
		required: false,
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Task", taskSchema);
