import React, { useState } from 'react';
import axios from 'axios';


export default function ManualProductForm({ setMessage }) {
    const [manual, setManual] = useState({
        RowLabel: '',
        AccountId: '',
        Memo: ''
    });

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/products/create", manual);
            setMessage(`Inserted: ${res.data.inserted} products, Skipped: ${res.data.skipped} products`);
        } catch (err) {
            console.error(err);
            setMessage('Error uploading file');
        }
    }
    return (
        <form onSubmit={handleManualSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Add Product Manually</h2>
          <input
            type="text"
            placeholder="Row Label"
            value={manual.RowLabel}
            onChange={(e) => setManual({ ...manual, RowLabel: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Account ID"
            value={manual.AccountId}
            onChange={(e) => setManual({ ...manual, AccountId: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Memo"
            value={manual.Memo}
            onChange={(e) => setManual({ ...manual, Memo: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Product
          </button>
        </form>
      );
    }