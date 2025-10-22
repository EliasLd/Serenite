import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import { useState } from 'react';

const App: React.FC = () => {

  const [message, setMessage] = useState<string>("");

  const handleApiTest = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/test`);
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const data = await response.json();
      console.log(response)
      setMessage(data.message ?? JSON.stringify(data));
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-6"> Welcome Serenité</h1>
      <button
        onClick={handleApiTest}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
      >
        Test API
      </button>
      <div className="mt-5 text-lg text-gray-700">
        {message}
      </div>
    </div>
  );
}

export default App
