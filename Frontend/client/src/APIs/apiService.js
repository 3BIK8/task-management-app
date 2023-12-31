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

		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

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

export const registerUser = async (userData) => {
	try {
		const response = await apiService.post("/register", userData);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// Function to create a task
export const createTask = async (newTask) => {
	try {
		const response = await apiService.post("/tasks", newTask);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};


export const getTasks = async () => {
	try {
		const response = await apiService.get("/tasks");
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export default apiService;
