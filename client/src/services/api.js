import axios from 'axios';

// Node.js Express Backend URL
const API_URL = 'http://localhost:5000/api';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

/**
 * Attaches the Clerk JWT token to requests dynamically.
 * Call this function once in your app or pass window.Clerk directly.
 */
apiClient.interceptors.request.use(
  async (config) => {
    // Access Clerk token from global window object if available
    if (window.Clerk && window.Clerk.session) {
      const token = await window.Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerImages = async (formData) => {
  try {
    const response = await apiClient.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to connect to Express backend server.';
  }
};

export default apiClient;