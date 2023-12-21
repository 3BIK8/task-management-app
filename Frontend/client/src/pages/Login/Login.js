import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../APIs/apiService";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await apiService.post("users/login", {
				username,
				password,
			});
			const authToken = response.data.token;

			localStorage.setItem("authToken", authToken);

			console.log("Login successful");

			navigate("/home");
		} catch (error) {
			console.error("Login failed:", error.message);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form>
				<label>Username:</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="button" onClick={handleLogin}>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
