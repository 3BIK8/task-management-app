const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

// Create a collection
router.post("/", async (req, res) => {
	try {
		const collection = new Collection({
			name: req.body.name,
			name: req.body.name,
			tasks: req.body.tasks || [],
			tags: req.body.tags || [],
			status: req.body.status || "active",
			priority: req.body.priority || "medium",
			dueDate: req.body.dueDate || null,
			important: req.body.important || false,
			coverPhoto: req.body.coverPhoto || null,
		});

		const savedCollection = await collection.save();
		res.json(savedCollection);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Read all collections
router.get("/", async (req, res) => {
	try {
		const collections = await Collection.find();
		res.json(collections);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Read a specific collection
router.get("/:collectionId", async (req, res) => {
	try {
		const collection = await Collection.findById(req.params.collectionId);
		res.json(collection);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update a collection
router.patch("/:collectionId", async (req, res) => {
	try {
		await Collection.updateOne(
			{ _id: req.params.collectionId },
			{ $set: { name: req.body.name } }
		);
		res.status(201).json({ message: "Collection Updated successfully" });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Delete a collection
router.delete("/:collectionId", async (req, res) => {
	try {
		await Collection.deleteOne({
			_id: req.params.collectionId,
		});
		res.status(201).json({ message: "Collection Deleted successfully" });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// counter
router.get("/count", async (req, res) => {
	try {
		const totalCollections = await Collection.countDocuments();
		res.json({ totalCollections });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
module.exports = router;
