# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev            # Start Vite dev server
npm run build          # TypeScript check + Vite production build
npm run lint           # ESLint on .ts/.tsx files
npm run test           # Run all tests once (Vitest)
npm run test:watch     # Run tests in watch mode
npm run preview        # Preview production build
```

## Architecture

React 19 + TypeScript + Vite single-page countdown timer application. Styled with TailwindCSS, tested with Vitest + React Testing Library.

**`src/App.tsx`** — Single component that displays real-time countdown timers updated every second via `useEffect` interval. Shows total time remaining, work time remaining, two-week periods, and work days in DDD:HH:MM:SS format.

**`src/utils/dateCalculations.ts`** — Core calculation logic with three main functions:
- `calculateTimeRemaining()` — Returns `{ total, work }` TimeRemaining objects (days/hours/minutes/seconds)
- `calculateDaysRemaining()` — Total and work days to target date, subtracting weekends, US federal holidays, and 20 vacation days
- `calculateWorkDaysUntil(targetDate)` — Work days to an arbitrary date

All date math uses Pacific Time via `toLocaleString("en-US", {timeZone: "America/Los_Angeles"})`. Target date and holidays are hardcoded constants in this file.

## Testing

Tests use Vitest with jsdom environment (configured in `vite.config.ts`). Date calculation tests use `vi.useFakeTimers()` for deterministic results. Test setup file at `src/test/setup.ts` adds jest-dom matchers.

- Component tests: `src/App.test.tsx`
- Unit tests: `src/utils/__tests__/dateCalculations.test.ts`
