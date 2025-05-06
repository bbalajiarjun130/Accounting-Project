import React, { useState } from 'react';
import axios from 'axios';

export default function FileUpload({setMessage}) {
    const [file, setFile] = useState(null);

    const handleFileUpload = async (e) => {
        e.preventDefault()
        if (!file) return setMessage('Please select a file to upload.');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post("http://localhost:5000/api/products/import", formData)
            setMessage(`Inserted: ${res.data.inserted} products, Skipped: ${res.data.skipped} products`);
        } catch (err) {
            console.error(err);
            setMessage('Error uploading file');
        }
    };
    return (
        <form onSubmit={handleFileUpload} className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Upload CSV</h2>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Upload
          </button>
        </form>
    );

    
}