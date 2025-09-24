import React, { useState } from 'react';
import axios from 'axios';

interface TenantResponse {
  message: string;
  tenant: {
    id: string;
    name: string;
    schema_name: string;
    domain: string;
  };
  owner: {
    id: string;
    email: string;
    full_name: string;
    phone_number: string;
    role: string;
  };
}

const TenantRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone_number: '',
    email: '',
    opening_time: '',
    closing_time: '',
    owner_email: '',
    owner_password: '',
    owner_name: '',
    owner_phone: '',
    // paid_until: '',
    // on_trial: true,
  });

  const [response, setResponse] = useState<TenantResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
      const payload = {
    ...formData,
    on_trial: true,
    paid_until: '2025-10-06',
  };
    try {
      // const res = await axios.post<TenantResponse>('register', payload);
      const res = await axios.post<TenantResponse>('http://127.0.0.1:8000/register/', payload);

      setResponse(res.data);
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.[0] || 'Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-red font-nunito">
      <h1 className="mb-6 text-4xl font-bold text-red">Register Tenant</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white border shadow-lg border-yellow rounded-2xl">
        {[ 
          { name: 'name', label: 'Business Name' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'phone_number', label: 'Phone Number' },
          { name: 'email', label: 'Email' },
          { name: 'opening_time', label: 'Opening Time', type: 'time' },
          { name: 'closing_time', label: 'Closing Time', type: 'time' },
          { name: 'owner_name', label: 'Owner Full Name' },
          { name: 'owner_email', label: 'Owner Email' },
          { name: 'owner_password', label: 'Owner Password', type: 'password' },
          { name: 'owner_phone', label: 'Owner Phone' },
          // { name: 'paid_until', label: 'Paid Until', type: 'date' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-black">{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-yellow"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-yellow"
              />
            )}
          </div>
        ))}

        {/* <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="on_trial"
              checked={formData.on_trial}
              onChange={handleChange}
              className="w-4 h-4 form-checkbox text-yellow"
            />
            <span className="ml-2 text-black">On Trial?</span>
          </label>
        </div> */}

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white rounded bg-red hover:bg-red/90"
        >
          Submit
        </button>
      </form>

      {error && <p className="mt-4 font-medium text-red">{error}</p>}

      {response && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 text-black bg-white border shadow-xl border-yellow rounded-xl">
            <h2 className="mb-2 text-xl font-bold text-green-700">{response.message}</h2>
           <p className="mb-1">
  <strong>Tenant:</strong>{' '}
  {/* <a
    href={`http://localhost:5173/thekitchenethio/${response.tenant.domain}`}
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-red"
  >
    {`http://localhost:5173/thekitchenethio/${response.tenant.domain}`}
  </a> */}
  <a
  href={`http://localhost:5173/thekitchenethio/${response.tenant.domain.split('.')[0]}`}
  target="_blank"
  rel="noopener noreferrer"
  className="underline text-red"
>
  {`http://localhost:5173/thekitchenethio/${response.tenant.domain.split('.')[0]}`}
</a>

</p>

            <p>
              <strong>Owner:</strong> {response.owner.full_name} ({response.owner.email})
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setResponse(null)}
                className="px-4 py-2 text-white rounded bg-red hover:bg-red/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantRegistration;
