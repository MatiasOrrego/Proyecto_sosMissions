import React, { useState, useEffect } from 'react';

const RCPCounter = () => {
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const start = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const stop = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    stop();
    setCount(0);
  };

  useEffect(() => {
    return () => {
      // Cleanup interval on component unmount
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="rcp-counter">
      <h1 className="text-2xl font-bold mb-4">RCP Count: {count}</h1>
      <div className="flex space-x-4">
        <button onClick={start} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Start</button>
        <button onClick={stop} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Stop</button>
        <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Reset</button>
      </div>
    </div>
  );
};

export default RCPCounter;