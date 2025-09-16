


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AxiosInstance from "../Components/AxiosInstance";
import { fetchCategories } from "../Redux/CategorySlice";
import useForm from "../hooks/useForm";
import { FileInput, InputField, OwnerButton } from "./InputField";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from "../Components/notify";

const CatagoryForm = ({ onClick, categoryToEdit }) => {
  const validationRules = {
    name: { required: true, minLength: 3 },
    image: { required: false },
  };

  const { formState, errors, handleChange, validateForm, setFormState, setErrors } = useForm(
    {
      name: "",
      image: null,
    },
    validationRules
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Effect to pre-fill the form when editing
  useEffect(() => {
    if (categoryToEdit) {
      setFormState({
        name: categoryToEdit.category_name,
        image: null,
         // You may want to handle existing images differently
      });
    }
   
  }, [categoryToEdit, setFormState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;
 console.log(formState);
    const formData = new FormData();
    formData.append("name", formState.name);
    // formData.append("image", formState.image);
    if (formState.image) {
      formData.append("image", formState.image);
    }
    formData.append("status", "active");

    setLoading(true);
    console.log(formData);
    try {
      // Determine if we are adding or editing
      const endpoint = categoryToEdit ? `/categories/${categoryToEdit.category_id}` : "/categories";

      // const response = await categoryToEdit? AxiosInstance.put(endpoint,formData):AxiosInstance.post(endpoint,formData);
      
      const response = await AxiosInstance.post(endpoint, formData);

      if (response.status === 201 || response.status === 200) {
        notify(`Category ${categoryToEdit ? 'Updated' : 'Added'} Successfully!`, "success");

        setTimeout(() => {
          setFormState({ name: '', image: null });
          dispatch(fetchCategories());
          onClick(); // Close the form/modal if necessary
        }, 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
      setErrors({ submit: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
        <ToastContainer position="top-right" className="mb-4" autoClose={2000} />

        <form onSubmit={handleSubmit}>
          <h2 className="font-fredoka text-2xl text-black text-center mb-10">
            {categoryToEdit ? "Edit Category" : "Add New Category"}
          </h2>

          <InputField
            label="Category Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            error={errors.name}
            PlaceHolder="Enter Category name"
          />

{categoryToEdit && categoryToEdit.category_image &&!formState.image && (
            <div className="mb-4">
              <img
                src={`http://127.0.0.1:8000/${categoryToEdit.category_image}`}
                alt={categoryToEdit.category_name}
                className="object-cover w-full h-32 rounded-md mb-2"
              />
              <p className="text-gray-500 text-sm">Current Image</p>
            </div>
          )}

          <FileInput
            label="Category Image"
            name="image"
            onChange={handleChange}
            error={errors.image}
          />
          {errors.submit && <p className="text-red text-xs mb-4">{errors.submit}</p>}

          {loading && <p className="text-yellow text-xs">Adding/Updating category, please wait...</p>}
          <div className="flex justify-between mb-4 mt-16">
            <OwnerButton text={categoryToEdit ? "Update Category" : "Add Category"} type="submit" isRed disabled={loading} />
            <OwnerButton text="Cancel" onclick={onClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatagoryForm;
