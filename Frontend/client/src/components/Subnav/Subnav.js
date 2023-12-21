import React, { useState } from "react";
import TaskCreate from "../TaskCreate/TaskCreate"; // Make sure to import the correct component path
import "./Subnav.css";

function Subnav({ title, buttonContent }) {
	const [isTaskModalOpen, setTaskModalOpen] = useState(false);

	const openTaskModal = () => {
		setTaskModalOpen(true);
	};

	const closeTaskModal = () => {
		setTaskModalOpen(false);
	};

	return (
		<div className="subnav">
			<h2 className="title">{title}</h2>
			<button className="create" onClick={openTaskModal}>
				{buttonContent}
			</button>

			{isTaskModalOpen && (
				<TaskCreate
					Modaltitle="Create Task"
					onClose={closeTaskModal}
					onSave={(newTask) => console.log("New Task:", newTask)}
				/>
			)}
		</div>
	);
}

export default Subnav;
