import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [finalTime, setFinalTime] = useState(0); 
  const intervalRef = useRef(null);
  const [showFinalTime, setShowFinalTime] = useState(false); 

  const handleStartPause = () => {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);
     
      setShowFinalTime(false);
    }
    setRunning(!running);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setFinalTime(time); 
    setShowFinalTime(true); 
    setTimeout(() => {
      setShowFinalTime(false); 
      setFinalTime(0);
    }, 3000); 
    setTime(0);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setFinalTime(0); 
    setShowFinalTime(false);
  };

  return (
    <div className="card">
      <h1 className="heading">Stopwatch</h1>
      <div className="stopwatch-card">
        <h1>{new Date(time).toISOString().slice(11, 19)}</h1>
      </div>
      {showFinalTime && (
        <p className="final-time">Final Elapsed Time: {new Date(finalTime).toISOString().slice(11, 19)}</p>
      )}
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
