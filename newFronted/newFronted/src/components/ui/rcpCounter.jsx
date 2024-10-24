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
    <div>
      <h1>RCP Count: {count}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default RCPCounter;