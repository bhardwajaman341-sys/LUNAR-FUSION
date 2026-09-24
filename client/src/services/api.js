import axios from 'axios';

// Dynamically use Vercel environment variable in production, falling back to localhost for local development
const API_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'http://localhost:5000/api';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

/**
 * Attaches the Clerk JWT token to requests dynamically.
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