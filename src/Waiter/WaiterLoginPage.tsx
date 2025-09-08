import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import QrScanner from 'react-qr-scanner';
import AxiosInstance from '../Components/AxiosInstance';
import { getCurrentSubdomain } from '../utils/urlHelpers';
import { getSubdomainFromPath } from '../Components/utitlites';

const WaiterQRLogin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const navigate = useNavigate();
  const subdomain = getCurrentSubdomain();
  
  const handleScan = async (data: string | null) => {
    if (data && data !== scanResult) {
      setScanResult(data);
      setError(null);
      setLoading(true);
       console.log("qrtoken");
      console.log(data);

      try {
        const response = await AxiosInstance.post('staffs/auth/login/qr-token/', {
          qr_token: data.text,
        });

        if (response.status === 200) {
            const token = response.data.access;
              const subdomain = getSubdomainFromPath(); // Make sure this matches your implementation
              localStorage.setItem(`kitchenethio${subdomain}`, token);
             
          navigate(`/thekitchenethio/${subdomain}/waiterHomePage`);
        } 
        
        else {
          setError('Invalid QR code or login failed.');
        }
      } catch (err) {
        setError('Failed to login. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError('Error accessing camera or scanning QR code.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="mb-6 text-2xl font-bold">Waiter QR Code Login</h1>

      <div className="w-full max-w-md">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />

        {loading && <p className="mt-4 text-blue-600">Logging in...</p>}

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {scanResult && !loading && !error && (
          <p className="mt-4 text-green-600">QR code scanned: {scanResult}</p>
        )}
      </div>
    </div>
  );
};

export default WaiterQRLogin;
