



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance from "../Components/AxiosInstance";
import { Category, fetchCategories } from "../Redux/CategorySlice";
import { fetchMenus } from "../Redux/MenuSlice";
import { fetchMenuDetail } from "../Redux/MenuDetailSlice";
import useForm from "../hooks/useForm";
import InputField, { FileInput, OwnerButton } from "./InputField";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../Components/notify";
import { AppDispatch, RootState } from "../Redux/Store";
import MenuDetail from "../Components/MenuDetail";

interface Portion {
  size: string;
  price: number;
}

interface FormState {
  name: string;
  description: string;
  image: File | null;
  categoryId: string;
  portions: Portion[];

}

interface MenuToEdit {
  menu_id: string;
}

interface AddMenuFormProps {
  onClick: () => void;
  menuToEdit?: MenuToEdit;
}

const AddMenuForm: React.FC<AddMenuFormProps> = ({ onClick, menuToEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, categoryLoading } = useSelector((state: RootState) => state.category);
  const { menuDetail } = useSelector((state: RootState) => state.menuDetail);

  const validationRules = {
    name: { required: true, minLength: 3 },
    description: { required: false },
    image: { required: false },
    categoryId: { required: true },
    portions: { required: true },
    selectedLocation: { required: true },
  };

  const {
    formState,
    errors,
    handleChange,
    handleFileChange,
    validateForm,
    setFormState,
    setErrors,
  } = useForm<FormState>(
    {
      name: "",
      description: "",
      image: null,
      categoryId: "",
      portions: [
        { size: "small", price: 0 },
        { size: "medium", price: 0 },
        { size: "medium", price: 0 },
      ],
  
    },
    validationRules
  );

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    if (menuToEdit) {
      dispatch(fetchMenuDetail(menuToEdit.menu_id));
    }
  }, [dispatch, menuToEdit]);

  useEffect(() => {
    if (menuDetail && menuToEdit) {
      setFormState({
        name: menuDetail.name || "",
        description: menuDetail.description || "",
        image: null,
        categoryId: menuDetail.category || "",
        portions: menuDetail.portions || [
          { size: "small", price: 0 },
          { size: "medium", price: 0 },
          { size: "large", price: 0 },
        ],
       
      });
    }
  }, [menuDetail, menuToEdit]);


const handlePortionChange = (index: number, field: keyof Portion, value: any) => {
  const updatedPortions = [...formState.portions];

  if (field === "price") {
    const parsed = parseFloat(value);
    updatedPortions[index][field] = isNaN(parsed) ? 0 : parsed;
  } else {
    updatedPortions[index][field] = value;
  }

  setFormState({ ...formState, portions: updatedPortions });
};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    // const payload: any = {
    //   name: formState.name,
    //   description: formState.description,
    //   category: formState.categoryId,
    //   small_price: formState.portions[0].price,
    //   medium_price: formState.portions[1].price,
    //   large_price: formState.portions[2].price,
    // };

    const formData = new FormData();
formData.append("name", formState.name);
formData.append("description", formState.description);
formData.append("category", formState.categoryId);
formData.append("small_price", formState.portions[0].price.toString());
formData.append("medium_price", formState.portions[1].price.toString());
formData.append("large_price", formState.portions[2].price.toString());

// Append image if it exists
if (formState.image) {
  formData.append("image", formState.image);
}
    setFormLoading(true);
    try {
      const endpoint = menuToEdit ? `items/menus/${menuToEdit.menu_id}/` : "items/menus/";
      // const response = await AxiosInstance.post(endpoint, payload,{withAuth:true});
      console.log(formData.append)
      const response = await AxiosInstance.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withAuth: true,
  });
      console.log("error")
      console.log(response.data)

      if ([200, 201].includes(response.status)) {
        notify(`Menu ${menuToEdit ? "Updated" : "Added"} Successfully!`, "success");
        setTimeout(() => {
          setFormState({
            name: "",
            description: "",
            image: null,
            categoryId: "",
            portions: [
              { size: "small", price: 0 },
              { size: "medium", price: 0 },
              { size: "large", price: 0 },
            ],
         
          });
          dispatch(fetchMenus());
          onClick();
        }, 2000);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "An error occurred";
      console.log(err)
      setErrors({ submit: errorMsg });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <ToastContainer position="top-right" autoClose={2000} />
        <form onSubmit={handleSubmit}>
          <h2 className="mb-10 text-2xl text-center text-black font-fredoka">
            {menuToEdit ? "Edit Menu" : "Add New Menu"}
          </h2>

          <InputField
            label="Menu Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            error={errors.name}
            // PlaceHolder="Enter Menu Name"
          />

          <InputField
            label="Menu Description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            error={errors.description}
            // PlaceHolder="Enter Menu Description"
          />

          <FileInput
            label="Menu Image"
            name="image"
            onChange={handleFileChange}
            error={errors.image}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formState.categoryId}
              onChange={(e) => setFormState({ ...formState, categoryId: e.target.value })}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Category</option>
              {category.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Portions</label>
            {formState.portions.map((portion, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">{portion.size}</label>
                  <input
                    type="number"
                    value={portion.price}
                    onChange={(e) => handlePortionChange(index, "price", e.target.value)}
                    className="w-32 mt-1 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Price"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {errors.submit && <p className="mb-4 text-xs text-red">{errors.submit}</p>}
          {formLoading && <p className="text-xs text-yellow">Submitting menu, please wait...</p>}

          <div className="flex justify-between mt-16 mb-4">
            <OwnerButton text={menuToEdit ? "Update Menu" : "Add Menu"} type="submit" isRed disabled={categoryLoading} />
            <OwnerButton text="Cancel" onclick={onClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuForm;
