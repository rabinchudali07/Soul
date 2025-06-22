import React, { useState, useEffect } from 'react';

const words = ['hello', 'world', 'this', 'is', 'auto', 'typing', 'simulation'];

const Delete: React.FC = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => (prev ? prev + ' ' + words[index] : words[index]));
      index++;
      if (index >= words.length) clearInterval(interval);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Delete Account</h1>
      <p className="text-gray-700 mb-6">{text}</p>
    </div>
  );
};

export default Delete;
