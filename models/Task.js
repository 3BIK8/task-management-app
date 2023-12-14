const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	dueDate: {
		type: Date,
	},
	userId: {
		type: String,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("Task", taskSchema);
