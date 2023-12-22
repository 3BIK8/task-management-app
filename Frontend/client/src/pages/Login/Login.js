import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../APIs/apiService";
import GoogleLogin from "../../components/logins/GoogleLogin/GoogleLogin";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
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

	const handleRegister = async () => {
		try {
			// Add the necessary fields for user registration
			const response = await apiService.post("users/register", {
				username,
				password,
				// Add other registration fields as needed
			});
			const authToken = response.data.token;

			localStorage.setItem("authToken", authToken);

			console.log("Registration successful");

			// Automatically log in after registration
			handleLogin();
		} catch (error) {
			console.error("Registration failed:", error.message);
		}
	};

	return (
		<div>
			<h2>{isRegistering ? "Register" : "Login"}</h2>
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
				<button
					type="button"
					onClick={isRegistering ? handleRegister : handleLogin}
				>
					{isRegistering ? "Register" : "Login"}
				</button>
			</form>
			{!isRegistering && (
				<p>
					Don't have an account?{" "}
					<button type="button" onClick={() => setIsRegistering(true)}>
						Register
					</button>
				</p>
			)}
			<GoogleLogin />
		</div>
	);
}

export default Login;
