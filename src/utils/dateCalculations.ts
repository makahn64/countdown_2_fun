// US Federal Holidays for 2024-2026 (excluding weekends)
const US_HOLIDAYS_2024_2026 = [
  // 2024
  new Date('2024-01-01'), // New Year's Day
  new Date('2024-01-15'), // Martin Luther King Jr. Day
  new Date('2024-02-19'), // Presidents' Day
  new Date('2024-05-27'), // Memorial Day
  new Date('2024-06-19'), // Juneteenth
  new Date('2024-07-04'), // Independence Day
  new Date('2024-09-02'), // Labor Day
  new Date('2024-10-14'), // Columbus Day
  new Date('2024-11-11'), // Veterans Day
  new Date('2024-11-28'), // Thanksgiving Day
  new Date('2024-12-25'), // Christmas Day
  
  // 2025
  new Date('2025-01-01'), // New Year's Day
  new Date('2025-01-20'), // Martin Luther King Jr. Day
  new Date('2025-02-17'), // Presidents' Day
  new Date('2025-05-26'), // Memorial Day
  new Date('2025-06-19'), // Juneteenth
  new Date('2025-07-04'), // Independence Day
  new Date('2025-09-01'), // Labor Day
  new Date('2025-10-13'), // Columbus Day
  new Date('2025-11-11'), // Veterans Day
  new Date('2025-11-27'), // Thanksgiving Day
  new Date('2025-12-25'), // Christmas Day
  
  // 2026 (up to May 15)
  new Date('2026-01-01'), // New Year's Day
  new Date('2026-01-19'), // Martin Luther King Jr. Day
  new Date('2026-02-16'), // Presidents' Day
];

const TARGET_DATE = new Date('2026-05-15T00:00:00-08:00'); // May 15, 2026, 12:00 AM Pacific Time
const VACATION_DAYS = 20;

export interface DaysRemaining {
  totalDaysRemaining: number;
  workDaysRemaining: number;
}

export function calculateDaysRemaining(): DaysRemaining {
  // Get current time in US Pacific timezone
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  
  // Calculate total days remaining with decimal precision
  const timeDiff = TARGET_DATE.getTime() - pacificTime.getTime();
  const totalDaysRemaining = timeDiff / (1000 * 3600 * 24);
  
  // Calculate work days remaining
  let workDaysRemaining = totalDaysRemaining;
  
  // Subtract weekend days (2 per week)
  const weeksRemaining = Math.ceil(totalDaysRemaining / 7);
  const weekendDays = weeksRemaining * 2;
  workDaysRemaining -= weekendDays;
  
  // Subtract US holidays
  const holidaysInRange = US_HOLIDAYS_2024_2026.filter(holiday => 
    holiday >= pacificTime && holiday <= TARGET_DATE
  );
  workDaysRemaining -= holidaysInRange.length;
  
  // Subtract vacation days
  workDaysRemaining -= VACATION_DAYS;
  
  // Ensure work days is not negative
  workDaysRemaining = Math.max(0, workDaysRemaining);
  
  return {
    totalDaysRemaining,
    workDaysRemaining
  };
}
