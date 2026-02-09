import { useEffect, useState } from "react";
import { calculateTimeRemaining } from "./utils/dateCalculations";

function App() {
  const [timeData, setTimeData] = useState(calculateTimeRemaining());

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setTimeData(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format time as DDD:HH:MM:SS
  const formatTime = (time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    const days = time.days.toString().padStart(3, "0");
    const hours = time.hours.toString().padStart(2, "0");
    const minutes = time.minutes.toString().padStart(2, "0");
    const seconds = time.seconds.toString().padStart(2, "0");

    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  // Calculate 2-week periods until May 16, 2026
  const twoWeekPeriods = Math.ceil(timeData.total.days / 14);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-slate-950">
      <div className="text-center space-y-4 w-full max-w-4xl px-4">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-slate-700/50">
          <h2 className="text-2xl font-semibold mb-4">Countdown to Bhutan!</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg">Total Time Remaining:</span>
              <span className="text-3xl font-bold text-yellow-300 font-mono tracking-wider">
                {formatTime(timeData.total)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Work Time Remaining:</span>
              <span className="text-3xl font-bold text-green-300 font-mono tracking-wider">
                {formatTime(timeData.work)}
              </span>
            </div>
          </div>
          <div className="text-sm text-slate-300 mt-4">
            <p>Excludes weekends, US federal holidays</p>
            <p className="mt-1 text-slate-400">
              Updates every second • Pacific Time
            </p>
            <p className="mt-1 text-slate-400">
              {twoWeekPeriods} two-week periods until trip
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
