// export const getCurrentSubdomain = () => {
//   const host = window.location.hostname;
//   if (host.includes('localhost')) {
//     // For development with localhost:3000
//     const match = window.location.pathname.match(/^\/t\/([^/]+)/);
//     return match ? match[1] : null;
//   }
//   return host.split('.')[0];
// };

export const getCurrentSubdomain = () => {
  const match = window.location.pathname.match(/^\/t\/([^/]+)/);
  return match ? match[1] : null;
};


export const getBackendUrl = () => {
  const subdomain = getCurrentSubdomain();
  if (!subdomain) return `https://the-new-kitchen.onrender.com/api`;
  // return `http://${subdomain}.thekitchenethio.localhost:8000/api`;
  return `https://the-new-kitchen.onrender.com/t/${subdomain}/api`;
};

export const getFrontendUrl = (subdomain) => {
  if (!subdomain) return `http://localhost:${process.env.REACT_APP_FRONTEND_PORT}`;
  return `http://localhost:${process.env.REACT_APP_FRONTEND_PORT}/t/${subdomain}`;
};