import React from "react";

const Task = ({ task }) => {
	return (
		<div>
			<h3>{task.title}</h3>
			<p>Description: {task.description}</p>
			<p>Due Date: {task.dueDate}</p>
			<p>Priority: {task.priority}</p>
			{/* Add more details as needed */}
		</div>
	);
};

export default Task;
