export const getCurrentSubdomain = () => {
  const host = window.location.hostname;
  if (host.includes('localhost')) {
    // For development with localhost:3000
    const match = window.location.pathname.match(/^\/t\/([^/]+)/);
    return match ? match[1] : null;
  }
  return host.split('.')[0];
};

export const getBackendUrl = () => {
  const subdomain = getCurrentSubdomain();
  if (!subdomain) return `http://thekitchenethio.localhost:8000/api`;
  return `http://${subdomain}.thekitchenethio.localhost:8000/api`;
};

export const getFrontendUrl = (subdomain) => {
  if (!subdomain) return `http://localhost:${process.env.REACT_APP_FRONTEND_PORT}`;
  return `http://localhost:${process.env.REACT_APP_FRONTEND_PORT}/t/${subdomain}`;
};