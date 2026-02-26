const { default: axios } = require("axios");

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseUrl = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;