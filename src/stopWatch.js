import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStartPause = () => {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);
    }
    setRunning(!running);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
  };

  return (
    <div className="card">
      <h1 className="heading">Stopwatch</h1>
      <div className="stopwatch-card">
        <h1>{new Date(time).toISOString().slice(11, 19)}</h1>
      </div>
      <div className="buttons">
        <button className={`button ${running ? 'pause' : 'start'}`} onClick={handleStartPause}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="button stop" onClick={handleStop}>Stop</button>
        <button className="button reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
