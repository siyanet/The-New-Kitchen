


// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import AxiosInstance from "../Components/AxiosInstance";
// import { fetchCategories } from "../Redux/CategorySlice";
// import useForm from "../hooks/useForm";
// import { FileInput, InputField, OwnerButton } from "./InputField";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { notify } from "../Components/notify";

// const CatagoryForm = ({ onClick, categoryToEdit }) => {
//   const validationRules = {
//     name: { required: true, minLength: 3 },
//     image: { required: false },
//   };

//   const { formState, errors, handleChange, validateForm, setFormState, setErrors } = useForm(
//     {
//       name: "",
//       image: null,
//     },
//     validationRules
//   );

//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   // Effect to pre-fill the form when editing
//   useEffect(() => {
//     if (categoryToEdit) {
//       setFormState({
//         name: categoryToEdit.name,
       
//          // You may want to handle existing images differently
//       });
//     }
   
//   }, [categoryToEdit, setFormState]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isValid = validateForm();
//     if (!isValid) return;
//  console.log(formState);
//     const formData = new FormData();
//     formData.append("name", formState.name);
//     // formData.append("image", formState.image);
//     if (formState.image) {
//       formData.append("image", formState.image);
//     }
//     formData.append("status", "active");

//     setLoading(true);
//     console.log(formData);
//     try {
//       // Determine if we are adding or editing
//       const endpoint = categoryToEdit ? `/categories/${categoryToEdit.category_id}` : "/categories";

//       // const response = await categoryToEdit? AxiosInstance.put(endpoint,formData):AxiosInstance.post(endpoint,formData);
      
//       const response = await AxiosInstance.post(endpoint, formData);

//       if (response.status === 201 || response.status === 200) {
//         notify(`Category ${categoryToEdit ? 'Updated' : 'Added'} Successfully!`, "success");

//         setTimeout(() => {
//           setFormState({ name: '', image: null });
//           dispatch(fetchCategories());
//           onClick(); // Close the form/modal if necessary
//         }, 2000);
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
//       setErrors({ submit: errorMsg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
//         <ToastContainer position="top-right" className="mb-4" autoClose={2000} />

//         <form onSubmit={handleSubmit}>
//           <h2 className="mb-10 text-2xl text-center text-black font-fredoka">
//             {categoryToEdit ? "Edit Category" : "Add New Category"}
//           </h2>

//           <InputField
//             label="Category Name"
//             name="name"
//             value={formState.name}
//             onChange={handleChange}
//             error={errors.name}
//             PlaceHolder="Enter Category name"
//           />

// {categoryToEdit && categoryToEdit.category_image &&!formState.image && (
//             <div className="mb-4">
//               <img
//                 src={`http://127.0.0.1:8000/${categoryToEdit.category_image}`}
//                 alt={categoryToEdit.category_name}
//                 className="object-cover w-full h-32 mb-2 rounded-md"
//               />
//               <p className="text-sm text-gray-500">Current Image</p>
//             </div>
//           )}

//           <FileInput
//             label="Category Image"
//             name="image"
//             onChange={handleChange}
//             error={errors.image}
//           />
//           {errors.submit && <p className="mb-4 text-xs text-red">{errors.submit}</p>}

//           {loading && <p className="text-xs text-yellow">Adding/Updating category, please wait...</p>}
//           <div className="flex justify-between mt-16 mb-4">
//             <OwnerButton text={categoryToEdit ? "Update Category" : "Add Category"} type="submit" isRed disabled={loading} />
//             <OwnerButton text="Cancel" onclick={onClick} />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CatagoryForm;


import { useEffect, useState, FC, FormEvent } from "react";
import { useDispatch } from "react-redux";
import AxiosInstance from "../Components/AxiosInstance";
import { Category, fetchCategories} from "../Redux/CategorySlice";
import useForm from "../hooks/useForm";
import InputField, { OwnerButton } from "./InputField";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from "../Components/notify";
import { AppDispatch } from "../Redux/Store";


interface CategoryFormProps {
  onClick: () => void;
  categoryToEdit?: Category;
}

const CategoryForm: FC<CategoryFormProps> = ({ onClick, categoryToEdit }) => {
  const validationRules = {
    name: { required: true, minLength: 3 }
  };

  const {
    formState,
    errors,
    handleChange,
    validateForm,
    setFormState,
    setErrors,
  } = useForm(
    { name: "" },
    validationRules
  );

  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryToEdit) {
      setFormState({ name: categoryToEdit.name });
    }
  }, [categoryToEdit, setFormState]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const data = {
      name: formState.name,
      status: "active",
    };

    setLoading(true);

    try {
      const endpoint = categoryToEdit
        ? `items/categories/${categoryToEdit.id}/`
        : "items/categories/";

      const response = categoryToEdit
        ? await AxiosInstance.put(endpoint, data,{withAuth: true})
        : await AxiosInstance.post(endpoint, data,{withAuth: true});

      if (response.status === 200 || response.status === 201) {
        notify(`Category ${categoryToEdit ? "Updated" : "Added"} Successfully!`, "success");

        setTimeout(() => {
          setFormState({ name: "" });
          dispatch(fetchCategories());
          onClick();
        }, 2000);
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
        <ToastContainer position="top-right" className="mb-4" autoClose={2000} />

        <form onSubmit={handleSubmit}>
          <h2 className="mb-10 text-2xl text-center text-black font-fredoka">
            {categoryToEdit ? "Edit Category" : "Add New Category"}
          </h2>

          <InputField
            label="Category Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            error={errors.name}
            // PlaceHolder="Enter category name"
          />

          {errors.submit && (
            <p className="mb-4 text-xs text-red">{errors.submit}</p>
          )}

          {loading && (
            <p className="text-xs text-yellow">
              Adding/Updating category, please wait...
            </p>
          )}

          <div className="flex justify-between mt-16 mb-4">
            <OwnerButton
              text={categoryToEdit ? "Update Category" : "Add Category"}
              type="submit"
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

export default CategoryForm;
