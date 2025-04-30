import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "https://fynd-submission.onrender.com/api",   // Development and production URLs
  withCredentials: true,  // send cookies with requests
});

export default axiosInstance;