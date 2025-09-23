// BranchForm.tsx
import { FC, FormEvent, useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import useForm from "../hooks/useForm";
import AxiosInstance from "../Components/AxiosInstance";
import { notify } from "../Components/notify";
import InputField, { OwnerButton } from "./InputField";
import { AppDispatch } from "../Redux/Store";
import { Branch, fetchBranches } from "../Redux/branchSlice";

interface BranchFormProps {
  onClick: () => void;
  branchToEdit?: Branch;
}

const BranchForm: FC<BranchFormProps> = ({ onClick, branchToEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const validationRules = {
    name: { required: true },
    latitude: { required: true },
    longitude: { required: true },
    phone_number: { required: true },
  };

  const {
    formState,
    errors,
    handleChange,
    validateForm,
    setFormState,
    setErrors,
  } = useForm({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
    phone_number: ""
  }, validationRules);

  useEffect(() => {
    if (branchToEdit) {
      setFormState({ ...branchToEdit });
    }
  }, [branchToEdit, setFormState]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const endpoint = branchToEdit
      ? `branches/${branchToEdit.id}/`
      : "branches/";

    try {
      const response = branchToEdit
        ? await AxiosInstance.put(endpoint, formState, { withAuth: true })
        : await AxiosInstance.post(endpoint, formState, { withAuth: true });

      if (response.status === 200 || response.status === 201) {
        notify(`Branch ${branchToEdit ? "Updated" : "Added"} Successfully!`, "success");
        setTimeout(() => {
          setFormState({
            name: "",
            latitude: "",
            longitude: "",
            description: "",
            phone_number: "",
          });
          dispatch(fetchBranches());
          onClick(); // Close the form
        }, 1500);
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || err.message || "An error occurred";
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <ToastContainer position="top-right" autoClose={2000} />
        <form onSubmit={handleSubmit}>
          <h2 className="mb-8 text-2xl font-semibold text-center">
            {branchToEdit ? "Edit Branch" : "Add New Branch"}
          </h2>

          <InputField name="name" label="Branch Name" value={formState.name} onChange={handleChange} error={errors.name} />
          <InputField name="phone_number" label="Phone Number" value={formState.phone_number} onChange={handleChange} error={errors.phone_number} />
          <InputField name="latitude" label="Latitude" value={formState.latitude} onChange={handleChange} error={errors.latitude} />
          <InputField name="longitude" label="Longitude" value={formState.longitude} onChange={handleChange} error={errors.longitude} />
          <InputField name="description" label="Description" value={formState.description} onChange={handleChange} />

          {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
          {loading && <p className="text-yellow-600">Please wait...</p>}

          <div className="flex justify-between mt-6">
            <OwnerButton
              type="submit"
              text={branchToEdit ? "Update Branch" : "Add Branch"}
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

export default BranchForm;
