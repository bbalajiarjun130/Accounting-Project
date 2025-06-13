// src/components/ManualProductForm.js
import React, { useState } from 'react';
import { BASE_API_URL } from '../config/api'; // Import BASE_API_URL

export default function ManualProductForm({ setLoading, setMessage, loading }) {
  const [newProduct, setNewProduct] = useState({
    RowLabel: '',
    AccountId: '',
    Memo: ''
  });

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${BASE_API_URL}/products/create`, { // Use BASE_API_URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Product created successfully!');
        setNewProduct({ RowLabel: '', AccountId: '', Memo: '' }); // Clear form
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to create product.');
      }
    } catch (error) {
      console.error('Error during product creation:', error);
      setMessage('An error occurred during product creation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 p-6 border border-gray-200 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Manually Add Product</h2>
      <form onSubmit={handleCreateProduct} className="flex flex-col items-center">
        <input
          type="text"
          name="RowLabel"
          placeholder="Row Label"
          value={newProduct.RowLabel}
          onChange={handleProductInputChange}
          className="p-2 border border-gray-300 rounded-md w-full mb-4 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
          required
        />
        <input
          type="text"
          name="AccountId"
          placeholder="Account ID"
          value={newProduct.AccountId}
          onChange={handleProductInputChange}
          className="p-2 border border-gray-300 rounded-md w-full mb-4 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
        />
        <input
          type="text"
          name="Memo"
          placeholder="Memo"
          value={newProduct.Memo}
          onChange={handleProductInputChange}
          className="p-2 border border-gray-300 rounded-md w-full mb-6 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
          disabled={loading}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

