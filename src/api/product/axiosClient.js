import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosClient;