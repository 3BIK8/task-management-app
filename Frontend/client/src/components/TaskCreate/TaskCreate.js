import React, { useState } from "react";
import "./TaskCreate.css";
import { MdClose } from "react-icons/md";
import apiService from "../../APIs/apiService";
function TaskCreate({ onClose, Modaltitle }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [priority, setPriority] = useState("Normal");
	const [tags, setTags] = useState("");

	const handleSave = async () => {
		const newTask = {
			title,
			description,
			dueDate,
			priority,
			tags: tags.split(",").map((tag) => tag.trim()),
		};

		try {
			const response = await apiService.post("/tasks", newTask);

			console.log("Task saved:", response);

			// Close the modal or perform other actions as needed
			onClose();
		} catch (error) {
			console.error("Error saving task:", error.message);
			// Handle the error (e.g., show an error message to the user)
		}
	};

	return (
		<div className="task-modal">
			<div className="modal-content">
				<div className="top-wrapper">
					<h2 className="modal-title">{Modaltitle}</h2>
					<span className="close" onClick={onClose}>
						<MdClose />
					</span>
				</div>
				<label>Title:</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label>Description:</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label>Due Date:</label>
				<input
					type="date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
				/>
				<label>Priority:</label>
				<select value={priority} onChange={(e) => setPriority(e.target.value)}>
					<option value="High">High</option>
					<option value="Medium">Medium</option>
					<option value="Low">Low</option>
				</select>
				<label>Tags (comma-separated):</label>
				<input
					type="text"
					value={tags}
					onChange={(e) => setTags(e.target.value)}
				/>
				<button onClick={handleSave}>Save Task</button>
			</div>
		</div>
	);
}

export default TaskCreate;
