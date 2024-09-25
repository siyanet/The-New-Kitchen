
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../Redux/CategorySlice';
import { useEffect, useState } from 'react';

const AddMenuForm = () => {
  const dispatch = useDispatch();
  const { category, loading, error } = useSelector((state) => state.category);

  // State variables for menu details
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [portions, setPortions] = useState([
    { name: 'Small', price: 0 },
    { name: 'Normal', price: 0 },
    { name: 'Large', price: 0 },
  ]);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Loading and Error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const handlePortionChange = (index, field, value) => {
    const updatedPortions = [...portions];
    updatedPortions[index][field] = field === 'price' ? Number(value) : value; // Ensure price is a number
    setPortions(updatedPortions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation to check if required fields are filled
    if (!name || !categoryId) {
      setFormError('Please fill all the required fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('location_id', 1); // Always set location_id to 1
    formData.append('category_id', categoryId); // Ensure this is the category ID
    formData.append('status', 'active');
  
    // Prepare portions array for submission as an array of objects
    portions.forEach((portion, index) => {
        formData.append(`portions[${index}][name]`, portion.name);
        formData.append(`portions[${index}][price]`, portion.price);
    });
    console.log('Submitting Form Data:', [...formData]);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/menus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Menu added successfully!');
      setFormError('');
      // Reset the form
      setName('');
      setDescription('');
      setImage(null);
      setCategoryId('');
      setPortions([
        { name: 'Small', price: 0 },
        { name: 'Normal', price: 0 },
        { name: 'Large', price: 0 },
      ]);
    } catch (err) {
        setFormError('Failed to add the menu: ' + err.response.data.message);
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 p-5 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-center mb-4">Add New Menu</h2>

          {/* Menu Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Menu Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Pizza"
              required
            />
          </div>

          {/* Menu Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Delicious pizza with various toppings"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
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
            {portions.map((portion, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">{portion.name}</label>
                  <input
                    type="number"
                    value={portion.price}
                    onChange={(e) => handlePortionChange(index, 'price', e.target.value)}
                    className="mt-1 w-32 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Price"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Error and Success Messages */}
          {formError && <p className="text-red-600 text-xs mt-3">{formError}</p>}
          {successMessage && <p className="text-green-600 text-xs mt-3">{successMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-5 w-full bg-red text-white py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            Add Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuForm;
