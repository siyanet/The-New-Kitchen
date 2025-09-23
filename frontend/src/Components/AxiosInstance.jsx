// import axios from "axios";

// // Extract subdomain from the URL path (e.g., /thekitchenethio/:subdomain)
// function getSubdomainFromPath() {
//   const match = window.location.pathname.match(/^\/thekitchenethio\/([^/]+)/);
//   if (!match || !match[1]) {
//     throw new Error("Subdomain is required in the URL path.");
//   }
//   return match[1];
// }

// const subdomain = getSubdomainFromPath();

// const AxiosInstance = axios.create({
//   baseURL: `http://${subdomain}.thekitchenethio.localhost:8000/api/`,
// });

// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("pizzaHutToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default AxiosInstance;


import axios from "axios";
import { getSubdomainFromPath } from "./utitlites";

// Extract subdomain from the URL path (e.g., /thekitchenethio/:subdomain)
// export function getSubdomainFromPath() {
//   const match = window.location.pathname.match(/^\/thekitchenethio\/([^/]+)/);
//   if (!match || !match[1]) {
//     throw new Error("Subdomain is required in the URL path.");
//   }
//   return match[1];
// }

const subdomain = getSubdomainFromPath();

const AxiosInstance = axios.create({
  baseURL: `http://${subdomain}.thekitchenethio.localhost:8000/api/`,
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
