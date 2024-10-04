import React, { useState } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../Redux/CategorySlice';

const AddCategoryForm = ({onClick}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !image) {
      setError('Both fields are required');
      return;
    }

    // FormData to handle image file uploads
    console.log(name);
    console.log(image)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('status', 'active');
    console.log(...formData); // Set status to active

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Category added successfully!');
      setError('');
      setName('');
      setImage('');
      
      dispatch(fetchCategories());
      onClick();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMsg);
      setSuccess('');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Grab the image file from input
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-4">
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 p-5  rounded-lg shadow-md">
      <h2 className="text-xl font-normal text-center font-fredoka mb-4">Add New Category</h2>
      
      {/* Name Input Field */}
      <input
        placeholder="Category Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
       className="inline-block w-full px-2 sm:px-3 md:px-4 py-7 sm:py-6 md:py-3  h-full focus:outline-none focus:ring-black focus:border-black shadow-sm md:shadow-md lg:shadow-lg rounded-sm md:rounded-md lg:rounded:lg text-gray-black font-nunito font-medium md:font-semibold text-sm md:text-base"
      />

      {/* Image Input Field */}
      <div className="mt-20">
        <label className="block text-sm font-medium text-gray-700">Category Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-700"
        />
        {error && !image && <p className="text-red-600 text-xs mt-1">Image is required</p>}
      </div>

      {/* Error and Success Messages */}
      {error && <p className="text-red-600 text-xs mt-3">{error}</p>}
      {success && <p className="text-green-600 text-xs mt-3">{success}</p>}

      {/* Submit Button */}
      <div className="flex justify-between mt-20">
      <div className="relative inline-block ">
  {/* Background Rectangle */}
  <div className="absolute inset-0 border-2 border-red rounded-lg transform translate-x-2 scale-y-125"></div>
  
  {/* Add Category Button */}
  <button
    type="submit"
    className="relative pl-2 pr-2 pt-1 pb-1 bg-red text-white font-fredoka font-normal text-base rounded-md transition-transform duration-100 ease-in-out hover:scale-y-125 hover:translate-x-2"
  >
    Add Category
  </button>
</div>

{/* Yellow Button with No Margin */}
<div className="relative inline-block mt-2"> {/* Changed from mt-0 to mt-2 for proper spacing */}
  {/* Background Rectangle */}
  <div className="absolute inset-0 border-2 border-yellow rounded-lg transform translate-x-2 scale-y-125"></div>
  
  {/* Cancel Button */}
  <button
    onClick={onClick}
    className="relative pl-2 pr-2 pt-1 pb-1 bg-yellow text-black font-fredoka font-normal text-base rounded-md transition-transform duration-100 ease-in-out hover:scale-y-125 hover:translate-x-2"
  >
    Cancel
  </button>
</div>




      </div>
     
      



    </form>
      
    </div>
  </div>
    
  
  );
};
AddCategoryForm.propTypes = {
  onClick: PropTypes.func
}

export default AddCategoryForm;
