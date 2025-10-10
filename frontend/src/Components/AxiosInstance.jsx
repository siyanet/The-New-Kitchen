

import axios from "axios";
import { getSubdomainFromPath } from "./utitlites";



const subdomain = getSubdomainFromPath();

const AxiosInstance = axios.create({
  // baseURL: `http://${subdomain}.thekitchenethio.localhost:8000/api/`,
  baseURL: `https://the-new-kitchen.onrender.com/t/${subdomain}/api`,
});


// Only attach token if config.withAuth is true
AxiosInstance.interceptors.request.use(
  (config) => {
    if (config.withAuth) {
      const token = localStorage.getItem(`kitchenethio${subdomain}`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;
