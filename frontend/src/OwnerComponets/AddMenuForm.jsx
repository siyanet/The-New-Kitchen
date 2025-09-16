


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance from "../Components/AxiosInstance";
import { fetchCategories } from "../Redux/CategorySlice";
import { fetchMenus } from "../Redux/MenuSlice";
import useForm from "../hooks/useForm";
import { FileInput, InputField, OwnerButton } from "./InputField";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from "../Components/notify";
import { fetchLocations } from "../Redux/LocationSlice";
import { fetchMenuDetail } from "../Redux/MenuDetailSlice";


const AddMenuForm = ({ onClick, menuToEdit }) => {
   const { category, loading, error } = useSelector((state) => state.category); 
  const [categoryId, setCategoryId] = useState('');
  const {item,status} = useSelector((state)=>state.menuDetail);
  const dispatch = useDispatch();
  


  const validationRules = {
    name: { required: true, minLength: 3 },
    description: { required: false },
    image: { required: false },
    categoryId: { required: true },
    portions: { required: true },
    selectedLocation: { required: true },
  };

  const { formState, errors, handleChange, validateForm, setFormState, setErrors } = useForm(
    {
      name: "",
      description: "",
      image: null,
      categoryId: "",
      portions: [
        { name: "Small", price: 0 },
        { name: "Normal", price: 0 },
        { name: "Large", price: 0 },
      ],
      selectedLocation: "" ,
    },
    validationRules
  );

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    if (menuToEdit) {
      console.log("menutoedit")
      console.log(menuToEdit);
      dispatch(fetchMenuDetail(menuToEdit.menu_id));
    }
    
    if (item && menuToEdit) {
      // setFormState({
      //   name: item.menu_name,
      //   description: item.description,
      //   image: null,
      //   categoryId: item.category_id,
      //   portions: item.portions,
        
      // });

      setFormState({
        name: item.menu_name || "",
        description: item.description || "",
        image: null,
        categoryId: item.category_id || "",
        portions: item.portions || [
          { name: "Small", price: 0 },
          { name: "Normal", price: 0 },
          { name: "Large", price: 0 },
        ],

      });
    }
  }, [dispatch]);

  const handlePortionChange = (index, field, value) => {
    const updatedPortions = [...formState.portions];
    updatedPortions[index][field] = value;
    // field === "price" ? Number(value) : 
    setFormState({ ...formState, portions: updatedPortions });
  };



  // Loading and Error handling
  




  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", formState.name);
    
    formData.append("description", formState.description);
    if (formState.image) {
      formData.append("image", formState.image);
      
    }
    formData.append("category_id", formState.categoryId);
    formData.append("status", "active");

    formState.portions.forEach((portion, index) => {
      formData.append(`portions[${index}][name]`, portion.name);
      formData.append(`portions[${index}][price]`, portion.price);
    });

    setFormLoading(true);
    console.log(formData);
    try {
      const endpoint = menuToEdit ? `/menus/${menuToEdit.menu_id}` : "/menus";
      const response = await AxiosInstance.post(endpoint, formData);
      
      if (response.status === 201 || response.status === 200) {
        notify(`Menu ${menuToEdit ? 'Updated' : 'Added'} Successfully!`, "success");

        setTimeout(() => {
          setFormState({
            name: "",
            description: "",
            image: null,
            categoryId: "",
            portions: [
              { name: "Small", price: 0 },
              { name: "Normal", price: 0 },
              { name: "Large", price: 0 },
            ],
            location: ""
            
          });
         
          dispatch(fetchMenus());
          onClick();
        }, 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
      setErrors({ submit: errorMsg });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
        <ToastContainer position="top-right" className="mb-4" autoClose={2000} />

        <form onSubmit={handleSubmit}>
          <h2 className="font-fredoka text-2xl text-black text-center mb-10">
            {menuToEdit ? "Edit Menu" : "Add New Menu"}
          </h2>

          <InputField
            label="Menu Name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            error={errors.name}
            PlaceHolder="Enter Menu Name"
          />

          <InputField
            label="Menu Description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            error={errors.description}
            PlaceHolder="Enter Menu Description"
          />

          {item &&menuToEdit && item.image  && (
            <div className="mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-32 rounded-md mb-2"
              />
              <p className="text-gray-500 text-sm">Current Image</p>
            </div>
          )}

          <FileInput
            label="Menu Image"
            name="image"
            onChange={handleChange}
            error={errors.image}
          />


           <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
           <select
              // value={categoryId}
              // onChange={(e) => setCategoryId(e.target.value)}
              value={formState.categoryId} // Use formState.categoryId
              onChange={(e) => setFormState({ ...formState, categoryId: e.target.value })}

              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Category</option>
              {category.map((item) => (
                
                <option key={item.category_id} value={item.category_id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>






          {/* Portion Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Portions</label>
            {formState.portions.map((portion, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">{portion.name}</label>
                  <input
                    type="number"
                    value={portion.price}
                    onChange={(e) => handlePortionChange(index, "price", e.target.value)}
                    className="mt-1 w-32 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Price"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {errors.submit && <p className="text-red text-xs mb-4">{errors.submit}</p>}
          {formLoading && <p className="text-yellow text-xs">Submitting menu, please wait...</p>}

          <div className="flex justify-between mb-4 mt-16">
            <OwnerButton text={menuToEdit ? "Update Menu" : "Add Menu"} type="submit" isRed disabled={loading} />
            <OwnerButton text="Cancel" onclick={onClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuForm;
