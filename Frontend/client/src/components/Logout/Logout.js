import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear the authentication token
		localStorage.removeItem("authToken");

		// Redirect to the login page
		navigate("/login");
	};

	// Call the handleLogout function immediately (e.g., in useEffect)
	// if you want to perform the logout action on component mount.

	return (
		<div>
			<h2>Logout</h2>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Logout;
