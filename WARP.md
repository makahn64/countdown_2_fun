# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build and Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Run tests
npm run test           # Run tests once
npm run test:run      # Alias for running tests once
npm run test:watch    # Run tests in watch mode
```

## Project Architecture

This is a React + TypeScript + Vite application that implements a countdown timer to a specific event. The project uses TailwindCSS for styling and Vitest for testing.

### Core Components

1. **Main Application (`src/App.tsx`)**
   - Single-page React component that displays countdown timers
   - Implements real-time updates using React's useEffect hook
   - Shows both total time and work time remaining
   - Uses TailwindCSS for responsive styling

2. **Date Calculations (`src/utils/dateCalculations.ts`)**
   - Core logic for time calculations
   - Handles timezone conversions (Pacific Time)
   - Accounts for:
     - US Federal Holidays (2024-2026)
     - Weekend days
     - Vacation days (20 days)
   - Provides both total and work days remaining calculations

### Key Implementation Details

- Target date is hardcoded to May 15, 2026, 12:00 AM Pacific Time
- Time format: DDD:HH:MM:SS (days:hours:minutes:seconds)
- Updates every second
- All times are calculated in Pacific Time zone
- Work time excludes:
  - Weekends (2 days per week)
  - US Federal Holidays
  - 20 vacation days