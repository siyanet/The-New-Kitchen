// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Waiter } from '../Redux/waiterSlice'; // for typing only

// interface Props {
//   editData?: Waiter | null;
//   onClose: () => void;
// }

// const OwnerWaiterForm: React.FC<Props> = ({ editData, onClose }) => {
//   const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);
//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     phone_number: '',
//     password: '',
//     re_password: '',
//     branch_id: '',
//   });

//   useEffect(() => {
//     axios.get('/api/branches/').then((res) => {
//       setBranches(res.data);
//     });

//     if (editData) {
//       setFormData({
//         full_name: editData.staff?.user?.full_name ?? '',
//         email: editData.staff?.user?.email ?? '',
//         phone_number: editData.staff?.user?.phone_number ?? '',
//         password: '',
//         re_password: '',
//         branch_id: editData.staff?.branch?.id ?? '',
//       });
//     }
//   }, [editData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       staff: {
//         user: {
//           email: formData.email,
//           full_name: formData.full_name,
//           phone_number: formData.phone_number,
//           password: formData.password,
//           re_password: formData.re_password,
//         },
//         branch_id: formData.branch_id,
//       },
//     };

//     try {
//       if (editData) {
//         await axios.put(`/api/waiters/${editData.id}/`, payload);
//       } else {
//         await axios.post('/api/waiters/', payload);
//       }
//       onClose();
//     } catch (error) {
//       console.error('Failed to submit waiter form', error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-2xl px-8 pt-6 pb-8 mx-auto mb-4 bg-white rounded shadow-md"
//     >
//       <h2 className="mb-6 text-2xl font-bold text-center">
//         {editData ? 'Edit Waiter' : 'Add Waiter'}
//       </h2>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Full Name</label>
//         <input
//           type="text"
//           name="full_name"
//           value={formData.full_name}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//         <input
//           type="tel"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//           required
//         />
//       </div>

//       {!editData && (
//         <>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>
//             <input
//               type="password"
//               name="re_password"
//               value={formData.re_password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//         </>
//       )}

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Branch</label>
//         <select
//           name="branch_id"
//           value={formData.branch_id}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border rounded"
//           required
//         >
//           <option value="">Select a branch</option>
//           {branches.map((branch) => (
//             <option key={branch.id} value={branch.id}>
//               {branch.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 font-bold text-black bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
//         >
//           {editData ? 'Update Waiter' : 'Add Waiter'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default OwnerWaiterForm;


// // OwnerComponets/WaiterForm.tsx
// import { FC, FormEvent, useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import useForm from '../hooks/useForm';
// import AxiosInstance from '../Components/AxiosInstance';
// import { notify } from '../Components/notify';
// import InputField, { OwnerButton } from './InputField';
// import { AppDispatch } from '../Redux/Store';
// import { Waiter, fetchWaiters } from '../Redux/waiterSlice';

// interface WaiterFormProps {
//   onClick: () => void;
//   waiterToEdit?: Waiter;
// }

// const OwnerWaiterForm: FC<WaiterFormProps> = ({ onClick, waiterToEdit }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [loading, setLoading] = useState(false);

//   const validationRules = {
//     staff_id: { required: true },
//     branch_id: { required: true },
//   };

//   const {
//     formState,
//     errors,
//     handleChange,
//     validateForm,
//     setFormState,
//     setErrors,
//   } = useForm({
//     staff_id: '',
//     branch_id: '',
//   }, validationRules);

//   useEffect(() => {
//     if (waiterToEdit) {
//       setFormState({
//         staff_id: waiterToEdit.staff?.id || '',
//         branch_id: waiterToEdit.branch?.id || '',
//       });
//     }
//   }, [waiterToEdit, setFormState]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);

//     const endpoint = waiterToEdit
//       ? `waiters/${waiterToEdit.id}/`
//       : 'waiters/';

//     try {
//       const response = waiterToEdit
//         ? await AxiosInstance.put(endpoint, formState, { withAuth: true })
//         : await AxiosInstance.post(endpoint, formState, { withAuth: true });

//       if (response.status === 200 || response.status === 201) {
//         notify(`Waiter ${waiterToEdit ? 'Updated' : 'Added'} Successfully!`, 'success');
//         setTimeout(() => {
//           setFormState({ staff_id: '', branch_id: '' });
//           dispatch(fetchWaiters());
//           onClick();
//         }, 1500);
//       }
//     } catch (err: any) {
//       const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
//       setErrors({ submit: errorMsg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
//         <ToastContainer position="top-right" autoClose={2000} />
//         <form onSubmit={handleSubmit}>
//           <h2 className="mb-8 text-2xl font-semibold text-center">
//             {waiterToEdit ? 'Edit Waiter' : 'Add New Waiter'}
//           </h2>

//           <InputField
//             name="staff_id"
//             label="Staff ID"
//             value={formState.staff_id}
//             onChange={handleChange}
//             error={errors.staff_id}
//           />
//           <InputField
//             name="branch_id"
//             label="Branch ID"
//             value={formState.branch_id}
//             onChange={handleChange}
//             error={errors.branch_id}
//           />

//           {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
//           {loading && <p className="text-yellow-600">Please wait...</p>}

//           <div className="flex justify-between mt-6">
//             <OwnerButton
//               type="submit"
//               text={waiterToEdit ? 'Update Waiter' : 'Add Waiter'}
//               isRed
//               disabled={loading}
//             />
//             <OwnerButton text="Cancel" onclick={onClick} />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OwnerWaiterForm;









import { FC, FormEvent, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import AxiosInstance from '../Components/AxiosInstance';
import { notify } from '../Components/notify';
import InputField, { OwnerButton } from './InputField';
import { AppDispatch, RootState } from '../Redux/Store';
import { Waiter, fetchWaiters } from '../Redux/waiterSlice';
import { fetchBranches } from '../Redux/branchSlice';

interface WaiterFormProps {
  onClick: () => void;
  waiterToEdit?: Waiter;
}

const OwnerWaiterForm: FC<WaiterFormProps> = ({ onClick, waiterToEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
 const { branches, loading, error } = useSelector((state: RootState) => state.branch);
  const [waiterloading, setLoading] = useState(false);

  const validationRules = {
    email: { required: true },
    full_name: { required: true },
    phone_number: { required: true },
    password: { required: true },
    re_password: { required: true },
    branch_id: { required: true },
  };

  const {
    formState,
    errors,
    handleChange,
    validateForm,
    setFormState,
    setErrors,
  } = useForm({
    email: '',
    full_name: '',
    phone_number: '',
    password: '',
    re_password: '',
    branch_id: '',
  }, validationRules);

  useEffect(() => {
    dispatch(fetchBranches());
    console.log("branches")
    console.log(branches)
  }, [dispatch]);

  useEffect(() => {
    if (waiterToEdit) {
      setFormState({
        email: waiterToEdit.staff?.user?.email || '',
        full_name: waiterToEdit.staff?.user?.full_name || '',
        phone_number: waiterToEdit.staff?.user?.phone_number || '',
        password: '',
        re_password: '',
        branch_id: waiterToEdit.branch?.id || '',
      });
    }
  }, [waiterToEdit, setFormState]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const endpoint = waiterToEdit
      ? `waiters/${waiterToEdit.id}/`
      : 'waiters/';

    const payload = {
      staff: {
        user: {
          email: formState.email,
          full_name: formState.full_name,
          phone_number: formState.phone_number,
          password: formState.password,
          re_password: formState.re_password,
        },
        branch_id: formState.branch_id,
      },
    };

    try {
      const response = waiterToEdit
        ? await AxiosInstance.put(endpoint, payload, { withAuth: true })
        : await AxiosInstance.post(endpoint, payload, { withAuth: true });

      if (response.status === 200 || response.status === 201) {
        notify(`Waiter ${waiterToEdit ? 'Updated' : 'Added'} Successfully!`, 'success');
        setTimeout(() => {
          setFormState({
            email: '',
            full_name: '',
            phone_number: '',
            password: '',
            re_password: '',
            branch_id: '',
          });
          dispatch(fetchWaiters());
          onClick();
        }, 1500);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  };
  if(loading){
    return <p>loading...</p>
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <ToastContainer position="top-right" autoClose={2000} />
        <form onSubmit={handleSubmit}>
          <h2 className="mb-8 text-2xl font-semibold text-center">
            {waiterToEdit ? 'Edit Waiter' : 'Add New Waiter'}
          </h2>

          <InputField
            name="email"
            label="Email"
            value={formState.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            name="full_name"
            label="Full Name"
            value={formState.full_name}
            onChange={handleChange}
            error={errors.full_name}
          />
          <InputField
            name="phone_number"
            label="Phone Number"
            value={formState.phone_number}
            onChange={handleChange}
            error={errors.phone_number}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            name="re_password"
            label="Confirm Password"
            type="password"
            value={formState.re_password}
            onChange={handleChange}
            error={errors.re_password}
          />

          {/* Branch Select Dropdown */}
          <div className="mt-4">
            <label htmlFor="branch_id" className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              name="branch_id"
              id="branch_id"
              value={formState.branch_id}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            {errors.branch_id && <p className="text-sm text-red-500">{errors.branch_id}</p>}
          </div>

          {errors.submit && <p className="mt-2 text-sm text-red-500">{errors.submit}</p>}
          {loading && <p className="mt-2 text-yellow-600">Please wait...</p>}

          <div className="flex justify-between mt-6">
            <OwnerButton
              type="submit"
              text={waiterToEdit ? 'Update Waiter' : 'Add Waiter'}
              isRed
              disabled={loading}
            />
            <OwnerButton text="Cancel" onclick={onClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerWaiterForm;
