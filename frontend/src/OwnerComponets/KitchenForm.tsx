import { FC, FormEvent, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store';
import useForm from '../hooks/useForm';
import AxiosInstance from '../Components/AxiosInstance';
import { notify } from '../Components/notify';
import InputField, { OwnerButton } from './InputField';
import { fetchBranches } from '../Redux/branchSlice';

import { fetchKitchens } from '../Redux/kitchenSlice';
import { fetchCategories } from '../Redux/CategorySlice';

interface KitchenFormProps {
  onClick: () => void;
}

const KitchenForm: FC<KitchenFormProps> = ({ onClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { branches } = useSelector((state: RootState) => state.branch);
  const { category } = useSelector((state: RootState) => state.category);

  const [loading, setLoading] = useState(false);

  const validationRules = {
    email: { required: true },
    full_name: { required: true },
    phone_number: { required: true },
    password: { required: true },
    re_password: { required: true },
    branch_id: { required: true },
    selectedCategories: { required: true },
  };

  const {
    formState,
    errors,
    handleChange,
    handleSelectChange,
    handleFileChange,
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
    selectedCategories: [],
  }, validationRules);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    // setFormState(prev => ({ ...prev, selectedCategories: selectedOptions }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

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
      categories: formState.selectedCategories,
    };

    try {
      const response = await AxiosInstance.post('staffs/kitchens/', payload, { withAuth: true });

      if (response.status === 201 || response.status === 200) {
        notify('Kitchen Staff Added Successfully!', 'success');
        setTimeout(() => {
          setFormState({
            email: '',
            full_name: '',
            phone_number: '',
            password: '',
            re_password: '',
            branch_id: '',
            selectedCategories: [],
          });
          onClick();
          dispatch(fetchKitchens());
        }, 1500);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="w-full max-w-md max-h-[80vh] overflow-y-auto p-10 bg-white rounded-lg shadow-lg">
    <ToastContainer position="top-right" autoClose={2000} />
    <form onSubmit={handleSubmit}>
      <h2 className="mb-8 text-2xl font-semibold text-center">Add Kitchen Staff</h2>

      <InputField name="email" label="Email" value={formState.email} onChange={handleChange} error={errors.email} />
      <InputField name="full_name" label="Full Name" value={formState.full_name} onChange={handleChange} error={errors.full_name} />
      <InputField name="phone_number" label="Phone Number" value={formState.phone_number} onChange={handleChange} error={errors.phone_number} />
      <InputField name="password" label="Password" value={formState.password} onChange={handleChange} error={errors.password} type="password" />
      <InputField name="re_password" label="Confirm Password" value={formState.re_password} onChange={handleChange} error={errors.re_password} type="password" />

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Select Branch</label>
        <select
          name="branch_id"
          value={formState.branch_id}
          onChange={handleSelectChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">-- Choose Branch --</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
        {errors.branch_id && <p className="text-sm text-red-500">{errors.branch_id}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Select Categories</label>
        <select
          multiple
          value={formState.selectedCategories}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          {category.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        {errors.selectedCategories && <p className="text-sm text-red-500">{errors.selectedCategories}</p>}
      </div>

      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
      {loading && <p className="text-yellow-600">Please wait...</p>}

      <div className="flex justify-between mt-6">
        <OwnerButton type="submit" text="Add Kitchen Staff" isRed disabled={loading} />
        <OwnerButton text="Cancel" onclick={onClick} />
      </div>
    </form>
  </div>
</div>

  );
};

export default KitchenForm;
