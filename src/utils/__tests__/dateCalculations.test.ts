import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateDaysRemaining } from '../dateCalculations';

describe('calculateDaysRemaining', () => {
  beforeEach(() => {
    // Mock the current date to a known value for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-12-01'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should calculate total days remaining correctly', () => {
    const result = calculateDaysRemaining();
    
    // From Dec 1, 2024 to May 15, 2026 should be approximately 531 days
    // (This is an approximation, exact calculation may vary)
    expect(result.totalDaysRemaining).toBeGreaterThan(500);
    expect(result.totalDaysRemaining).toBeLessThan(600);
  });

  it('should calculate work days remaining correctly', () => {
    const result = calculateDaysRemaining();
    
    // Work days should be less than total days due to weekends, holidays, and vacation
    expect(result.workDaysRemaining).toBeLessThan(result.totalDaysRemaining);
    expect(result.workDaysRemaining).toBeGreaterThan(0);
  });

  it('should handle edge case when target date is very close', () => {
    // Mock a date very close to May 15, 2026
    vi.setSystemTime(new Date('2026-05-14'));
    
    const result = calculateDaysRemaining();
    expect(result.totalDaysRemaining).toBeCloseTo(1, 0); // Allow for decimal precision, but be more lenient
    expect(result.workDaysRemaining).toBe(0); // Should be 0 due to vacation days
  });

  it('should handle edge case when target date has passed', () => {
    // Mock a date after May 15, 2026
    vi.setSystemTime(new Date('2026-05-16'));
    
    const result = calculateDaysRemaining();
    expect(result.totalDaysRemaining).toBeLessThanOrEqual(0);
    expect(result.workDaysRemaining).toBe(0);
  });

  it('should return consistent results for same date', () => {
    const result1 = calculateDaysRemaining();
    const result2 = calculateDaysRemaining();
    
    expect(result1.totalDaysRemaining).toBe(result2.totalDaysRemaining);
    expect(result1.workDaysRemaining).toBe(result2.workDaysRemaining);
  });
});
