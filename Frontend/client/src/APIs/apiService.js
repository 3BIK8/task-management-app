import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

const apiService = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const createTask = async (newTask, authToken) => {
	try {
		const response = await apiService.post("/tasks", newTask, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const login = async (username, password) => {
	try {
		const response = await apiService.post("/api/users/login", {
			username,
			password,
		});
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// Add more functions for other API requests as needed

export default apiService;
