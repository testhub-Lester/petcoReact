import './time.css'
import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div class="timePanel">
      <h2> TIME: </h2>
      <h2 id='time'>{time.toLocaleTimeString()}</h2>
    </div>
  );
};

export default Clock;