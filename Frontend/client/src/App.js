import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Clocks from "./pages/Clocks/Clocks";
import Collections from "./pages/Collections/Collections";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import Login from "./pages/Login/Login";

/* 
 TODO : STYLE THE LOGIN PAGE AND THE REGISTER VIA GMAIL TWITTER GITHUB AND FACEBOOK
 TODO : ADD THE LOGOUT BUTTON
 TODO : STYLE THE TASKS CONTAINER AND THE TASK 
 TODO : ADD THE OTHER FUNCTIONALITIES TO THE TASKS
*/
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/tasks" element={<Tasks />} />
				<Route path="/collections" element={<Collections />} />
				<Route path="/clocks" element={<Clocks />} />
			</Routes>
		</Router>
	);
};

export default App;
