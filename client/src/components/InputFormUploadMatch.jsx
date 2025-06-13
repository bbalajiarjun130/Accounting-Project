// src/components/InputUploadMatchForm.js
import React, { useState } from 'react'; // Import useState
import { BASE_API_URL } from '../config/api'; // Import BASE_API_URL

export default function InputUploadMatchForm({ setLoading, setMessage, loading }) {
  // State for ToAccount and Ref inputs
  const [toAccount, setToAccount] = useState('');
  const [ref, setRef] = useState('');

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const file = event.target.elements.file.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // Append ToAccount and Ref as query parameters
    const queryParams = new URLSearchParams();
    if (toAccount) {
      queryParams.append('ToAccount', toAccount);
    }
    if (ref) {
      queryParams.append('Ref', ref);
    }

    // Construct the URL with query parameters
    const url = `${BASE_API_URL}/inputs/upload-match?${queryParams.toString()}`;

    try {
      const response = await fetch(url, { // Use the constructed URL
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const contentDisposition = response.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition && contentDisposition.match(/filename="([^"]+)"/);
        const filename = filenameMatch ? filenameMatch[1] : 'matched_results.csv';

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setMessage('CSV matched and downloaded successfully!');
        // Clear inputs after successful upload and download
        setToAccount('');
        setRef('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Input CSV upload and match failed.');
      }
    } catch (error) {
      console.error('Error during input CSV upload and match:', error);
      setMessage('An error occurred during input CSV upload and match.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Upload Input Data & Match</h2>
      <form onSubmit={handleFileUpload} className="flex flex-col items-center">
        {/* New input for ToAccount */}
        <input
          type="number" // Assuming it's a number based on your controller
          name="ToAccount"
          placeholder="To Account (optional)"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full mb-4 focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
        {/* New input for Ref */}
        <input
          type="number" // Assuming it's a number based on your controller
          name="Ref"
          placeholder="Reference (optional)"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full mb-6 focus:ring-2 focus:ring-green-300 focus:border-transparent"
        />
        <input
          type="file"
          name="file"
          accept=".csv"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100
            mb-6"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          disabled={loading}
        >
          Upload Input CSV & Match
        </button>
      </form>
    </div>
  );
}

