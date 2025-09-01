import React, { useState, useEffect } from 'react';
import { calculateDaysRemaining } from './utils/dateCalculations';

function App() {
  const [daysData, setDaysData] = useState(calculateDaysRemaining());

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setDaysData(calculateDaysRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-slate-950">
      <div className="text-center space-y-4">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-slate-700/50">
          <h2 className="text-2xl font-semibold mb-4">Countdown to May 15, 2026</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg">Total Days Remaining:</span>
              <span className="text-3xl font-bold text-yellow-300 font-['Orbitron'] tracking-wider">
                {daysData.totalDaysRemaining.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Work Days Remaining:</span>
              <span className="text-3xl font-bold text-green-300 font-['Orbitron'] tracking-wider">
                {daysData.workDaysRemaining.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="text-sm text-slate-300 mt-4">
            <p>Excludes weekends, US federal holidays, and 20 vacation days</p>
            <p className="mt-1 text-slate-400">Updates every second • Pacific Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
