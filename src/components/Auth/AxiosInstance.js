import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://findyourlawyer.netlify.app/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("Request config: ", config);
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Response: ", response);
    return response;
  },
  (error) => {
    console.error("Response error: ", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;