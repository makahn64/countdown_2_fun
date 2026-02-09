// US Federal Holidays for 2024-2026 (excluding weekends)
const US_HOLIDAYS_2024_2026 = [
  // 2024
  new Date("2024-01-01"), // New Year's Day
  new Date("2024-02-19"), // Presidents' Day
  new Date("2024-05-27"), // Memorial Day
  new Date("2024-07-04"), // Independence Day
  new Date("2024-09-02"), // Labor Day
  new Date("2024-10-14"), // Columbus Day
  new Date("2024-11-11"), // Veterans Day
  new Date("2024-11-28"), // Thanksgiving Day
  new Date("2024-12-25"), // Christmas Day

  // 2025
  new Date("2025-01-01"), // New Year's Day
  new Date("2025-01-20"), // Martin Luther King Jr. Day
  new Date("2025-02-17"), // Presidents' Day
  new Date("2025-05-26"), // Memorial Day
  new Date("2025-06-19"), // Juneteenth
  new Date("2025-07-04"), // Independence Day
  new Date("2025-09-01"), // Labor Day
  new Date("2025-11-27"), // Thanksgiving Day
  new Date("2025-12-25"), // Christmas Day

  // 2026 (up to May 15)
  new Date("2026-01-01"), // New Year's Day
  new Date("2026-02-16"), // Presidents' Day
];

const TARGET_DATE = new Date("2026-05-16T00:00:00-08:00"); // May 15, 2026, 12:00 AM Pacific Time

export interface DaysRemaining {
  totalDaysRemaining: number;
  workDaysRemaining: number;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateDaysRemaining(): DaysRemaining {
  // Get current time in US Pacific timezone
  const now = new Date();
  const pacificTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
  );

  // Calculate total days remaining with decimal precision
  const timeDiff = TARGET_DATE.getTime() - pacificTime.getTime();
  const totalDaysRemaining = timeDiff / (1000 * 3600 * 24);

  // Count actual weekend days in the range
  let weekendDays = 0;
  const cursor = new Date(pacificTime);
  cursor.setHours(0, 0, 0, 0);
  const targetEnd = new Date(TARGET_DATE);
  targetEnd.setHours(0, 0, 0, 0);
  while (cursor <= targetEnd) {
    const day = cursor.getDay();
    if (day === 0 || day === 6) {
      weekendDays++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  // Subtract weekend days and US holidays that fall on weekdays
  let workDaysRemaining = totalDaysRemaining - weekendDays;

  const holidaysInRange = US_HOLIDAYS_2024_2026.filter(
    (holiday) => holiday >= pacificTime && holiday <= TARGET_DATE,
  );
  workDaysRemaining -= holidaysInRange.length;

  // Ensure work days is not negative
  workDaysRemaining = Math.max(0, workDaysRemaining);

  return {
    totalDaysRemaining,
    workDaysRemaining,
  };
}

export function calculateTimeRemaining(): {
  total: TimeRemaining;
  work: TimeRemaining;
} {
  // Get current time in US Pacific timezone
  const now = new Date();
  const pacificTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
  );

  // Calculate total time remaining
  const totalTimeDiff = TARGET_DATE.getTime() - pacificTime.getTime();
  const totalDays = Math.floor(totalTimeDiff / (1000 * 3600 * 24));
  const totalHours = Math.floor(
    (totalTimeDiff % (1000 * 3600 * 24)) / (1000 * 3600),
  );
  const totalMinutes = Math.floor(
    (totalTimeDiff % (1000 * 3600)) / (1000 * 60),
  );
  const totalSeconds = Math.floor((totalTimeDiff % (1000 * 60)) / 1000);

  // Calculate work time remaining (simplified - using work days calculation)
  const { workDaysRemaining } = calculateDaysRemaining();
  const workTimeDiff = workDaysRemaining * 24 * 3600 * 1000; // Convert work days to milliseconds
  const workDays = Math.floor(workTimeDiff / (1000 * 3600 * 24));
  const workHours = Math.floor(
    (workTimeDiff % (1000 * 3600 * 24)) / (1000 * 3600),
  );
  const workMinutes = Math.floor((workTimeDiff % (1000 * 3600)) / (1000 * 60));
  const workSeconds = Math.floor((workTimeDiff % (1000 * 60)) / 1000);

  return {
    total: {
      days: totalDays,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds,
    },
    work: {
      days: workDays,
      hours: workHours,
      minutes: workMinutes,
      seconds: workSeconds,
    },
  };
}
