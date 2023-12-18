const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	tags: [
		{
			type: String,
		},
	],
	status: {
		type: String,
		enum: ["active", "archived"],
		default: "active",
	},
	priority: {
		type: String,
		enum: ["high", "medium", "low"],
		default: "medium",
	},
	dueDate: {
		type: Date,
	},
	important: {
		type: Boolean,
		default: false,
	},
	coverPhoto: {
		type: String,
	},
});

module.exports = mongoose.model("Collection", collectionSchema);
