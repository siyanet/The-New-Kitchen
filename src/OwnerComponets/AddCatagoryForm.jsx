import React, { useState } from 'react';

import axios from 'axios';


const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-center mb-4">Add New Category</h2>
      
      {/* Name Input Field */}
      <input
        placeholder="Category Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
       
      />

      {/* Image Input Field */}
      <div className="mt-4">
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
      <button
        type="submit"
        className="mt-5 w-full bg-red text-white py-2 rounded-md hover:bg-red-dark focus:ring-2 focus:ring-offset-2 focus:ring-red"
      >
        Add Category
      </button>
    </form>
      
    </div>
  </div>
    
  
  );
};

export default AddCategoryForm;
