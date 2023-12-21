import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

const apiService = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add an interceptor to attach the Authorization header with the token to each request
apiService.interceptors.request.use(
	(config) => {
		const authToken = localStorage.getItem("authToken");

		// If a token exists, attach it to the Authorization header
		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Function to create a task
export const createTask = async (newTask) => {
	try {
		const response = await apiService.post("/tasks", newTask);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// Function to handle login
export const login = async (username, password) => {
	try {
		const response = await apiService.post("/login", { username, password });
		const authToken = response.data.token;

		// Store the token securely (localStorage, sessionStorage, or cookie)
		localStorage.setItem("authToken", authToken);

		console.log("Login successful");
	} catch (error) {
		throw error.response.data;
	}
};

// Add more functions for other API requests as needed

export default apiService;
