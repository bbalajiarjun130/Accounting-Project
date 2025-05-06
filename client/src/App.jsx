import React from 'react';
import FileUpload from './components/FileUpload';
import ManualProductForm from './components/ManualProductForm';

export default function App() {
    const [message, setMessage] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('upload');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8">
                <h1 className="text-2xl font-bold text-center">Product Addition</h1>

                {/* Tabs */}
                <div className="flex justify-center space-x-4">
                <button
                    className={`px-4 py-2 rounded ${activeTab === "upload" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("upload")}
                >
                Upload CSV
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "manual" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("manual")}
                >
                Manual Entry
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "upload" && <FileUpload setMessage={setMessage} />}
            {activeTab === "manual" && <ManualProductForm setMessage={setMessage} />}

            {/* Message */}
            {message && (
            <div className="text-center text-sm text-gray-700 bg-yellow-100 border border-yellow-300 p-3 rounded">
                {message}
            </div>
            )}
        </div>
    </div>
  );
}