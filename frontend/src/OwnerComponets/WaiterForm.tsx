
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
    handleSelectChange,
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
        // branch_id: waiterToEdit.branch?.id || '',
         branch_id:  '',
      });
    }
  }, [waiterToEdit, setFormState]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const endpoint = waiterToEdit
      ? `staffs/waiters/${waiterToEdit.id}/`
      : 'staffs/waiters/';

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
      console.log("payload");
      console.log(payload);
      const response = waiterToEdit
        ? await AxiosInstance.put(endpoint, payload, { withAuth: true })
        : await AxiosInstance.post(endpoint, payload, { withAuth: true });
        console.log("waiter response");
        console.log(response);
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
      console.log("err")
      console.log(err);
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
              onChange={handleSelectChange}
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
