import React from "react";
import Task from "../Task/Task";

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
