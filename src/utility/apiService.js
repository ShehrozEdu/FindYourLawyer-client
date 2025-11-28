import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with base configuration
const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Send cookies with requests for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiService.interceptors.request.use(
  (config) => {
    // Add any request modifications here if needed
    // For example, adding auth tokens from cookies (handled automatically with withCredentials)
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiService.interceptors.response.use(
  (response) => {
    // Unwrap response.data as per project standard
    // The response.data contains the actual data from the API
    return response;
  },
  (error) => {
    // Handle errors
    const errorResponse = error.response;
    
    // Hide 400 errors as per memory preference
    if (errorResponse?.status === 400) {
      // Silently handle 400 errors - don't show toast
      console.error('API 400 Error (hidden):', errorResponse?.data);
      return Promise.reject(error);
    }

    // Handle other errors
    if (errorResponse) {
      // Error response from server
      const errorMessage = errorResponse?.data?.message || errorResponse?.data?.error || 'An error occurred';
      
      // Log error for debugging
      console.error('API Error:', {
        status: errorResponse.status,
        message: errorMessage,
        data: errorResponse.data,
      });

      // Show toast notification for non-400 errors
      if (errorResponse.status === 401) {
        toast.error('Authentication required. Please log in again.');
      } else if (errorResponse.status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (errorResponse.status === 404) {
        toast.error('Resource not found.');
      } else if (errorResponse.status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(errorMessage);
      }

      return Promise.reject(error);
    } else if (error.request) {
      // Request was made but no response received
      console.error('API Network Error:', error.request);
      toast.error('Network error. Please check your connection.');
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      console.error('API Error:', error.message);
      toast.error('An unexpected error occurred.');
      return Promise.reject(error);
    }
  }
);

export default apiService;

