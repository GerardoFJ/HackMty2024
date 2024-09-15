import { useState, useEffect } from "react";

interface CountdownProps {
  targetTime: number; // target time in seconds
  text: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetTime, text }) => {
  const [timeLeft, setTimeLeft] = useState(targetTime);

  useEffect(() => {
    if (timeLeft <= 0) return; // stop the timer when it reaches 0

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // cleanup the interval on component unmount
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      Time until {text}: {timeLeft > 0 ? <span>{formatTime(timeLeft)}</span> : <span>Smile!</span>}
    </div>
  );
};

export default Countdown;
