import React from 'react';
import { calculateDaysRemaining } from './utils/dateCalculations';

function App() {
  const { totalDaysRemaining, workDaysRemaining } = calculateDaysRemaining();

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Hello World</h1>
      
      <div className="text-center space-y-4">
        <div className="bg-purple-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Countdown to May 15, 2026</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg">Total Days Remaining:</span>
              <span className="text-3xl font-bold text-yellow-300">{totalDaysRemaining}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Work Days Remaining:</span>
              <span className="text-3xl font-bold text-green-300">{workDaysRemaining}</span>
            </div>
          </div>
          <div className="text-sm text-purple-200 mt-4">
            <p>Excludes weekends, US federal holidays, and 20 vacation days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
