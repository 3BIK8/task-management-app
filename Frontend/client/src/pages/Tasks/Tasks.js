import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/SideBar/Navbar";
import Subnav from "../../components/Subnav/Subnav";
import "./Tasks.css";
import TaskContainer from "../../components/TaskContainer/TaskContainer";
import Logout from "../../components/Logout/Logout";
function Tasks() {
	return (
		<>
			<Header />
			<div className="wrapper">
				<Navbar />
				<div className="sub-wrapper">
					<Subnav title="my tasks" buttonContent="add task" />
					<TaskContainer />
					<Logout />
				</div>
			</div>
		</>
	);
}

export default Tasks;
