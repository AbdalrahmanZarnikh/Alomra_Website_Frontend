import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://ecommerce-back-4.onrender.com",
  baseURL: "http://localhost:7000",
});

export default axiosInstance;

