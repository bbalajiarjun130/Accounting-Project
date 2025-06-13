// src/components/ProductImportForm.js
import React from 'react';
import { BASE_API_URL } from '../config/api'; // Import BASE_API_URL

export default function ProductImportForm({ setLoading, setMessage, loading }) {

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const file = event.target.elements.file.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BASE_API_URL}/products/import`, { // Use BASE_API_URL
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Products CSV uploaded successfully!');
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Products CSV upload failed.');
      }
    } catch (error) {
      console.error('Error during products CSV upload:', error);
      setMessage('An error occurred during products CSV upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 p-6 border border-gray-200 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Import Products CSV</h2>
      <form onSubmit={handleFileUpload} className="flex flex-col items-center">
        <input
          type="file"
          name="file"
          accept=".csv"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            mb-6"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          Upload Products CSV
        </button>
      </form>
    </div>
  );
}

