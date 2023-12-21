import React, { useEffect, useState } from "react";
import { getTasks } from "../../APIs/apiService";
import TaskList from "../TaskList/TaskList";

const TaskContainer = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const tasksData = await getTasks();
				setTasks(tasksData);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	if (loading) {
		return <p>Loading tasks...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return <TaskList tasks={tasks} />;
};

export default TaskContainer;
