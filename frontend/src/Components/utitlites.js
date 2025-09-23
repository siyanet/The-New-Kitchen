export function getSubdomainFromPath() {
  const match = window.location.pathname.match(/^\/thekitchenethio\/([^/]+)/);
  if (!match || !match[1]) {
    throw new Error("Subdomain is required in the URL path.");
  }
  return match[1];
}



