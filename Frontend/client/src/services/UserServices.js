import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

const userService = axios.create({
	baseURL: `${API_BASE_URL}/users`,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add an interceptor to attach the Authorization header with the token to each request
userService.interceptors.request.use(
	(config) => {
		const authToken = localStorage.getItem("authToken");

		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
export const getUserById = async (userId) => {
	try {
		const response = await userService.get(`/${userId}`);
		return response;
	} catch (error) {
		throw error.response;
	}
};
// Function to handle user registration or login if already registered
export const registerOrLoginUser = async (userObj) => {
	try {
		// Extract relevant information from userObj
		const { email, given_name, family_name, picture, name } = userObj;

		// Assume email as username and use a default password for simplicity
		const username = name;
		const password = "defaultPassword";

		// Check if the user already exists with the given userId
		const existingUser = await userService.getUserById(userObj.userId);

		if (existingUser) {
			// User with the same userId already exists, attempt login
			const loginResponse = await userService.post("/login", {
				username,
				password,
			});

			// If login successful, return the response
			return loginResponse.data;
		}

		// If the user does not exist, make the registration request
		const registerResponse = await userService.post("/register", {
			username,
			password,
			email,
			firstName: given_name,
			lastName: family_name,
			profilePicture: picture,
		});

		return registerResponse.data;
	} catch (error) {
		throw error.response.data;
	}
};

export default userService;
