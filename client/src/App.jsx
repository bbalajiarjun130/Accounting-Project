// src/App.js
import React, { useState } from 'react';
import ProductImportForm from './components/ProductForm';
import ManualProductForm from './components/ManualProductForm';
import InputUploadMatchForm from './components/InputFormUploadMatch';
import MessageDisplay from './components/MessageDisplay';

export default function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
          CSV Uploader & Product Manager
        </h1>

        {/* Display messages to the user */}
        <MessageDisplay message={message} />

        {/* Product Import Section */}
        <ProductImportForm setLoading={setLoading} setMessage={setMessage} loading={loading} />

        {/* Manual Product Entry Section */}
        <ManualProductForm setLoading={setLoading} setMessage={setMessage} loading={loading} />

        {/* Input Data Upload and Match Section */}
        <InputUploadMatchForm setLoading={setLoading} setMessage={setMessage} loading={loading} />
      </div>
    </div>
  );
}

