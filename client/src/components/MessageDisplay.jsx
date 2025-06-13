import React from 'react';

export default function MessageDisplay({ message }) {
  if (!message) return null;

  return (
    <div className={`p-3 mb-6 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} font-medium`}>
      {message}
    </div>
  );
}