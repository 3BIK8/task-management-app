import React from "react";
import { Link } from "react-router-dom";
import { LuHome, LuFolder, LuClipboardList, LuClock } from "react-icons/lu";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<ul className="nav-items">
				<li>
					<Link to="/">
						<LuHome />
						<span>Home</span>
					</Link>
				</li>
				<li>
					<Link to="/tasks">
						<LuClipboardList />
						<span>Tasks</span>
					</Link>
				</li>
				<li>
					<Link to="/collections">
						<LuFolder />
						<span>Collections</span>
					</Link>
				</li>
				<li>
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
