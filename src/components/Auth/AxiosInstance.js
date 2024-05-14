import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://find-your-lawyer-server.vercel.app/api/",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the config before the request is sent, such as adding headers
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response here
    return response;
  },
  (error) => {
    // Handle response error here
    return Promise.reject(error);
  }
);

export default axiosInstance;
