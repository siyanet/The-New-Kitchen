import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentSubdomain } from '../utils/urlHelpers';

const SubdomainRouter = ({ children }) => {
  const navigate = useNavigate();
  const { subdomain } = useParams();

  useEffect(() => {
    const currentSubdomain = getCurrentSubdomain();
    
    // If accessing via localhost:3000 but URL has /t/:subdomain
    if (subdomain && !window.location.hostname.includes('thekitchenethio')) {
      // Update browser URL to show the subdomain
      window.history.replaceState(null, '', `/t/${subdomain}`);
    }
    
    // If accessing via subdomain.thekitchenethio.localhost:3000
    if (currentSubdomain && !subdomain) {
      // Redirect to /t/:subdomain format
      navigate(`/t/${currentSubdomain}`);
    }
  }, [subdomain, navigate]);

  return children;
};

export default SubdomainRouter;