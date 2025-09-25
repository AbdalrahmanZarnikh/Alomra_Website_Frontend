import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://alomra-website-backend.onrender.com",
  // baseURL: "http://localhost:7000",
});

export default axiosInstance;

