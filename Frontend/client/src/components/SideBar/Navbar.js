import React from "react";
import { Link } from "react-router-dom";
import { LuHome, LuFolder, LuClipboardList, LuClock } from "react-icons/lu";
import "./Navbar.css";

import { useLocation } from "react-router-dom";

const Navbar = () => {
	const location = useLocation();
	return (
		<nav className="navbar">
			<ul className="nav-items">
				<li className={location.pathname === "/home" ? "active" : ""}>
					<Link to="/home">
						<LuHome />
						<span>Home</span>
					</Link>
				</li>
				<li className={location.pathname === "/tasks" ? "active" : ""}>
					<Link to="/tasks">
						<LuClipboardList />
						<span>Tasks</span>
					</Link>
				</li>
				<li className={location.pathname === "/collections" ? "active" : ""}>
					<Link to="/collections">
						<LuFolder />
						<span>Collections</span>
					</Link>
				</li>
				<li className={location.pathname === "/clocks" ? "active" : ""}>
					<Link to="/clocks">
						<LuClock />
						<span>Clocks</span>
					</Link>
				</li>
			</ul>
			<div className="settings">Settings</div>
		</nav>
	);
};
export default Navbar;
